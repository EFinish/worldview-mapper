/* eslint-disable operator-linebreak */
import InvalidPremiseError from '@/utils/errors/InvalidPremiseError';
import Argument from '@/models/Argument';
import Statement from '@/models/Statement';
import { Premise } from '@/models/interfaces/Premise';
import TruthStatement from '@/models/TruthStatement';
import Proposition from '@/models/Proposition';
import { Note } from './notes/Note';
import { PropositionTypes } from './constants';
import InvalidConclusionError from './errors/InvalidConclusionError';
import ConclusionNote from './notes/ConclusionNote';
import PremiseNote from './notes/PremiseNote';

export default class ArgumentCalculator {
  private argument: Argument;

  private trueStatements: Statement[] = [];

  private falseStatements: Statement[] = [];

  private premisesToProcess: Premise[] = [];

  private premisesToPostProcess: Premise[] = [];

  private errors: Error[] = [];

  private notes: Note[] = [];

  constructor(argument: Argument) {
    this.argument = argument;
    this.processArgument();
  }

  private resetCalc(): void {
    this.trueStatements = [];
    this.falseStatements = [];
    this.premisesToProcess = Object.assign([], this.argument.premises);
    this.errors = [];
  }

  get getTrueStatements() {
    return this.trueStatements;
  }

  get getFalseStatements() {
    return this.falseStatements;
  }

  get getErrors() {
    return this.errors;
  }

  get getNotes() {
    return this.notes;
  }

  async processArgument() {
    this.resetCalc();
    await this.processTruthStatements();
    await this.processProposition();
    await this.processConclusion();
    await this.postProcessPropositions();
  }

  private addInvalidPremiseError(premise: Premise, reason: string): void {
    this.errors.push(new InvalidPremiseError(premise, reason));
  }

  private addPremiseNote(premise: Premise, message: string): void {
    this.notes.push(new PremiseNote(premise, message));
  }

  private addInvalidConclusionError(reason: string): void {
    this.errors.push(new InvalidConclusionError(reason));
  }

  private addConclusionNote(message: string): void {
    this.notes.push(new ConclusionNote(message));
  }

  private isInFalseStatements(statement: Statement): boolean {
    for (let i = 0; i < this.falseStatements.length; i += 1) {
      if (this.falseStatements[i].id === statement.id) {
        return true;
      }
    }

    return false;
  }

  private isInTrueStatements(statement: Statement): boolean {
    for (let i = 0; i < this.trueStatements.length; i += 1) {
      if (this.trueStatements[i].id === statement.id) {
        return true;
      }
    }

    return false;
  }

  private removePremiseFromProcessing(premiseIndexes: number[]): void {
    premiseIndexes.forEach((value) => {
      delete this.premisesToProcess[value];
    });

    this.premisesToProcess.forEach((value, index) => {
      if (value === undefined) {
        this.premisesToProcess.splice(index, 1);
      }
    });
  }

  private addPremiseToPostProcessing(premise: Premise): void {
    this.premisesToPostProcess.push(premise);
  }

  private async processTruthStatements(): Promise<void> {
    const premiseIndexesToRemove: number[] = [];

    this.premisesToProcess.forEach((premise, premiseIndex) => {
      if (premise instanceof TruthStatement) {
        switch (premise.truthValue) {
          case true:
            if (this.isInFalseStatements(premise.statement)) {
              this.addInvalidPremiseError(
                premise,
                `Cannot set statement ${premise.statement.id} to true, already set to false`,
              );
              break;
            } else if (this.isInTrueStatements(premise.statement)) {
              this.addInvalidPremiseError(
                premise,
                `Inefficiency detected: cannot set statement ${premise.statement.id} to true, already set to true`,
              );
              break;
            }
            this.trueStatements.push(premise.statement);
            premiseIndexesToRemove.push(premiseIndex);
            break;
          case false:
            if (this.isInTrueStatements(premise.statement)) {
              this.addInvalidPremiseError(
                premise,
                `Cannot set statement ${premise.statement.id} to false, already set to true`,
              );
              break;
            } else if (this.isInFalseStatements(premise.statement)) {
              this.addInvalidPremiseError(
                premise,
                `Inefficiency detected: cannot set statement ${premise.statement.id} to false, already set to false`,
              );
              break;
            }
            this.falseStatements.push(premise.statement);
            premiseIndexesToRemove.push(premiseIndex);
            break;
          default:
            break;
        }
      }
    });

    this.removePremiseFromProcessing(premiseIndexesToRemove);
  }

  private findPropositionInArgument(
    propositionTypeId: number,
    statementFirstId: number,
    statementFirstTruthValue: boolean,
    statementSecondId: number,
    statementSecondTruthValue: boolean,
  ): Premise | undefined {
    return this.argument.premises.find((premise) => {
      if (premise instanceof Proposition && premise.type.id === propositionTypeId) {
        const truthStatementOne: TruthStatement = premise.truthStatements[0];
        const truthStatementTwo: TruthStatement = premise.truthStatements[1];

        if (
          truthStatementOne.statement.id === statementFirstId &&
          truthStatementOne.truthValue === statementFirstTruthValue &&
          truthStatementTwo.statement.id === statementSecondId &&
          truthStatementTwo.truthValue === statementSecondTruthValue
        ) {
          return true;
        }
      }

      return false;
    });
  }

  private getPropositionsByPropositionTypeId(propositionTypeId: number): Proposition[] {
    const premises: Proposition[] = [];

    this.argument.premises.forEach((premise) => {
      if (premise instanceof Proposition && premise.type.id === propositionTypeId) {
        premises.push(premise);
      }
    });

    return premises;
  }

  private async processProposition(): Promise<void> {
    const premiseIndexesToRemove: number[] = [];

    // eslint-disable-next-line consistent-return
    this.premisesToProcess.forEach((premise, premiseIndex) => {
      if (premise instanceof Proposition) {
        const [truthStatementFirst, truthStatementSecond] = premise.truthStatements;
        const statementFirstTruthProduct: boolean = truthStatementFirst.truthValue
          ? this.isInTrueStatements(truthStatementFirst.statement)
          : this.isInFalseStatements(truthStatementFirst.statement);
        const statementSecondTruthProduct: boolean = truthStatementSecond.truthValue
          ? this.isInTrueStatements(truthStatementSecond.statement)
          : this.isInFalseStatements(truthStatementSecond.statement);

        switch (premise.type.id) {
          case PropositionTypes.IfThen.id:
            // IF x true THEN y true
            switch (truthStatementFirst.truthValue) {
              case true:
                // IF x
                if (this.isInTrueStatements(truthStatementFirst.statement)) {
                  if (truthStatementSecond.truthValue) {
                    // THEN y
                    this.trueStatements.push(truthStatementSecond.statement);
                    break;
                  }
                  // THEN !y
                  this.falseStatements.push(truthStatementSecond.statement);
                  break;
                } else if (
                  truthStatementSecond.truthValue &&
                  this.isInFalseStatements(truthStatementSecond.statement)
                ) {
                  // modus tollens
                  // x -> y ^ !y = !x
                  this.falseStatements.push(truthStatementFirst.statement);
                  this.addPremiseNote(
                    premise,
                    `Modus Tollens: ${truthStatementFirst.statement.id} -> ${truthStatementSecond.statement.id} ^ ! ${truthStatementSecond.statement.id} = ! ${truthStatementFirst.id}`,
                  );
                  break;
                } else if (
                  !truthStatementSecond.truthValue &&
                  this.isInTrueStatements(truthStatementSecond.statement)
                ) {
                  // modus tollens
                  // x -> !y ^ y = !x
                  this.falseStatements.push(truthStatementFirst.statement);
                  this.addPremiseNote(
                    premise,
                    `Modus Tollens: ${truthStatementFirst.statement.id} -> ! ${truthStatementSecond.statement.id} ^ ${truthStatementSecond.statement.id} = ! ${truthStatementFirst.id}`,
                  );
                  break;
                }
                break;
              case false:
                // IF !x
                if (this.isInFalseStatements(truthStatementFirst.statement)) {
                  if (truthStatementSecond.truthValue) {
                    // THEN y
                    this.trueStatements.push(truthStatementSecond.statement);
                    break;
                  }
                  // THEN !y
                  this.falseStatements.push(truthStatementSecond.statement);
                  break;
                } else if (
                  truthStatementSecond.truthValue &&
                  this.isInFalseStatements(truthStatementSecond.statement)
                ) {
                  // modus tollens
                  // !x -> y ^ !y = x
                  this.trueStatements.push(truthStatementFirst.statement);
                  this.addPremiseNote(
                    premise,
                    `Modus Tollens: ! ${truthStatementFirst.statement.id} -> ${truthStatementSecond.statement.id} ^ ! ${truthStatementSecond.statement.id} = ${truthStatementFirst.id}`,
                  );
                  break;
                } else if (
                  !truthStatementSecond.truthValue &&
                  this.isInTrueStatements(truthStatementSecond.statement)
                ) {
                  // modus tollens
                  // !x -> !y ^ y = x
                  this.trueStatements.push(truthStatementFirst.statement);
                  this.addPremiseNote(
                    premise,
                    `Modus Tollens: ! ${truthStatementFirst.statement.id} -> ! ${truthStatementSecond.statement.id} ^ ${truthStatementSecond.statement.id} = ${truthStatementFirst.id}`,
                  );
                  break;
                }
                break;
              default:
                break;
            }
            break;
          // x OR y
          case PropositionTypes.Or.id:
            // if !x and !y create error
            if (!statementFirstTruthProduct && !statementSecondTruthProduct) {
              this.addPremiseToPostProcessing(premise);
            }
            break;
          // x NOR y
          case PropositionTypes.Nor.id:
            // both should be false, if either x or y are true then create error
            if (statementFirstTruthProduct) {
              this.addPremiseToPostProcessing(premise);
            }
            if (statementSecondTruthProduct) {
              this.addPremiseToPostProcessing(premise);
            }
            break;
          // x XOR y
          case PropositionTypes.Xor.id:
            // either x is true or y is true, not both true, not both false
            if (statementFirstTruthProduct && statementSecondTruthProduct) {
              this.addPremiseToPostProcessing(premise);
            }
            if (!statementFirstTruthProduct && !statementSecondTruthProduct) {
              this.addPremiseToPostProcessing(premise);
            }
            break;
          // x XNOR y
          case PropositionTypes.Xnor.id:
            // both true, both false = ok
            if (
              (statementFirstTruthProduct && !statementSecondTruthProduct) ||
              (!statementFirstTruthProduct && statementSecondTruthProduct)
            ) {
              this.addPremiseToPostProcessing(premise);
            }
            break;
          case PropositionTypes.Nand.id:
            // anything but both being true = ok
            if (statementFirstTruthProduct && statementSecondTruthProduct) {
              this.addPremiseToPostProcessing(premise);
            }
            break;
          case PropositionTypes.And.id:
            // must both be true
            if (!statementFirstTruthProduct) {
              this.addPremiseToPostProcessing(premise);
            }
            if (!statementSecondTruthProduct) {
              this.addPremiseToPostProcessing(premise);
            }
            break;
          default:
            this.addInvalidPremiseError(premise, 'False premise: Invalid premise type.');
            break;
        }
        premiseIndexesToRemove.push(premiseIndex);
        return null;
      }
    });
    this.removePremiseFromProcessing(premiseIndexesToRemove);
  }

  private async postProcessPropositions(): Promise<void> {
    this.premisesToPostProcess.forEach((premise) => {
      if (premise instanceof Proposition) {
        const [truthStatementFirst, truthStatementSecond] = premise.truthStatements;
        const statementFirstTruthProduct: boolean = truthStatementFirst.truthValue
          ? this.isInTrueStatements(truthStatementFirst.statement)
          : this.isInFalseStatements(truthStatementFirst.statement);
        const statementSecondTruthProduct: boolean = truthStatementSecond.truthValue
          ? this.isInTrueStatements(truthStatementSecond.statement)
          : this.isInFalseStatements(truthStatementSecond.statement);

        switch (premise.type.id) {
          // x OR y
          case PropositionTypes.Or.id:
            // if !x and !y create error
            if (!statementFirstTruthProduct && !statementSecondTruthProduct) {
              this.addInvalidPremiseError(
                premise,
                `False premise: products both statements ${truthStatementFirst.statement.id} and ${truthStatementSecond.statement.id} are false in an OR. At least one product must be true.`,
              );
            }
            break;
          // x NOR y
          case PropositionTypes.Nor.id:
            // both should be false, if either x or y are true then create error
            if (statementFirstTruthProduct) {
              this.addInvalidPremiseError(
                premise,
                `False premise: product of statement ${truthStatementFirst.statement.id} is true in a NOR. Both should have false products.`,
              );
            }
            if (statementSecondTruthProduct) {
              this.addInvalidPremiseError(
                premise,
                `False premise: product of statement ${truthStatementSecond.statement.id} is true in a NOR. Both should have false products.`,
              );
            }
            break;
          // x XOR y
          case PropositionTypes.Xor.id:
            // either x is true or y is true, not both true, not both false
            if (statementFirstTruthProduct && statementSecondTruthProduct) {
              this.addInvalidPremiseError(
                premise,
                `False premise: both statements ${truthStatementFirst.id} and ${truthStatementSecond.id} are true in XOR. One and only one product must be true.`,
              );
            }
            if (!statementFirstTruthProduct && !statementSecondTruthProduct) {
              this.addInvalidPremiseError(
                premise,
                `False premise: both statements ${truthStatementFirst.id} and ${truthStatementSecond.id} are false in XOR. One and only one product must be true.`,
              );
            }
            break;
          // x XNOR y
          case PropositionTypes.Xnor.id:
            // both true, both false = ok
            if (
              (statementFirstTruthProduct && !statementSecondTruthProduct) ||
              (!statementFirstTruthProduct && statementSecondTruthProduct)
            ) {
              this.addInvalidPremiseError(
                premise,
                `False premise: either ${truthStatementFirst.id} is true and ${truthStatementSecond.id} is false, or vice versa, in XNOR. They must be either both true or both false.`,
              );
            }
            break;
          case PropositionTypes.Nand.id:
            // anything but both being true = ok
            if (statementFirstTruthProduct && statementSecondTruthProduct) {
              this.addInvalidPremiseError(
                premise,
                `False premise: both statements ${truthStatementFirst.id} and ${truthStatementSecond.id} are true in NAND. They cannot both be true.`,
              );
            }
            break;
          case PropositionTypes.And.id:
            // must both be true
            if (!statementFirstTruthProduct) {
              this.addInvalidPremiseError(
                premise,
                `False premise: product of statement ${truthStatementFirst.statement.id} is false in a AND. Both should have true products.`,
              );
            }
            if (!statementSecondTruthProduct) {
              this.addInvalidPremiseError(
                premise,
                `False premise: product of statement ${truthStatementSecond.statement.id} is false in a AND. Both should have true products.`,
              );
            }
            break;
          default:
            this.addInvalidPremiseError(premise, 'False premise: Invalid premise type.');
            break;
        }
        return null;
      }
      return null;
    });
  }

  // (p -> q) ^ (q -> r) = (p -> r)
  private detectHypotheticalSyllogism(
    statementFirstId: number,
    statementFirstTruthValue: boolean,
    statementSecondId: number,
    statementSecondTruthValue: boolean,
  ): boolean {
    const ifThenPropositions: Proposition[] = this.getPropositionsByPropositionTypeId(
      PropositionTypes.IfThen.id,
    );
    let index = 0;
    let trailingTargetTruthStatements: TruthStatement[] = [];
    const getStatementText = (truthStatementTruthValue: boolean, statementId: number) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      `${truthStatementTruthValue ? '' : '!'}${statementId}`;
    const statementFirstText = getStatementText(statementFirstTruthValue, statementFirstId);
    const statementSecondText = getStatementText(statementSecondTruthValue, statementSecondId);

    console.log(
      `FIND HYPOTHETICAL SYLLOGISM: IF ${statementFirstText} THEN ${statementSecondText}`,
    );

    while (index < ifThenPropositions.length) {
      console.log('NEW ROUND');
      const ifThen = ifThenPropositions[index];
      const ifThenTSFirst = ifThen.truthStatements[0];
      const ifThenTSFirstText = getStatementText(
        ifThenTSFirst.truthValue,
        ifThenTSFirst.statement.id,
      );
      const ifThenTSSecond = ifThen.truthStatements[1];
      const ifThenTSSecondText = getStatementText(
        ifThenTSSecond.truthValue,
        ifThenTSSecond.statement.id,
      );

      console.log(`INDEX ${index} - analyzing IF ${ifThenTSFirstText} THEN ${ifThenTSSecondText}`);
      if (
        ifThenTSSecond.statement.id === statementSecondId &&
        ifThenTSSecond.truthValue === statementSecondTruthValue
      ) {
        console.log(
          `FOUND: THEN statement ${ifThenTSSecondText} = conlusion THEN ${statementSecondText}`,
        );
        trailingTargetTruthStatements.push(ifThenTSFirst);
        console.log(
          `ADD ${ifThenTSFirstText} to trailing target statements`,
          trailingTargetTruthStatements,
        );
        ifThenPropositions.splice(index, 1);
        console.log('REMOVE processed if-then from array', ifThenPropositions);
        index = 0;
        console.log(`SET index to ${index}`);
      } else if (
        trailingTargetTruthStatements.find(
          (truthStatements) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            truthStatements.statement.id === ifThenTSSecond.statement.id &&
            truthStatements.truthValue === ifThenTSSecond.truthValue,
        )
      ) {
        console.log(
          `FOUND: THEN ${ifThenTSSecondText} IN trailing target statements`,
          trailingTargetTruthStatements,
        );
        if (
          ifThenTSFirst.statement.id === statementFirstId &&
          ifThenTSFirst.truthValue === statementFirstTruthValue
        ) {
          console.log(
            `FOUND: IF ${ifThenTSFirstText} = conclusion IF ${statementFirstText}`,
            'RETURN TRUE',
          );
          return true;
        }
        const newTrailingTargetArray: TruthStatement[] = trailingTargetTruthStatements.map(
          (truthStatement) => {
            if (truthStatement.id === ifThenTSSecond.statement.id) {
              console.log(
                `REPLACE ${getStatementText(
                  truthStatement.truthValue,
                  truthStatement.statement.id,
                )} in trailing target statements WITH ${ifThenTSFirstText}`,
              );
              return ifThenTSFirst;
            }
            return truthStatement;
          },
        );
        console.log('new trailing target statements', newTrailingTargetArray);
        trailingTargetTruthStatements = newTrailingTargetArray;
        ifThenPropositions.splice(index, 1);
        console.log('REMOVE processed if-then from array', ifThenPropositions);
        index = 0;
        console.log(`SET index to ${index}`);
      } else {
        index += 1;
        console.log(`ADD index + 1 = ${index}`);
      }
    }
    return false;
  }

  // (p -> q) ^ (r -> s) ^ (p V r) = (q V s)
  private detectConstructiveDilemma(
    statementFirstId: number,
    statementFirstTruthValue: boolean,
    statementSecondId: number,
    statementSecondTruthValue: boolean,
  ): boolean {
    if (statementFirstTruthValue !== statementSecondTruthValue) {
      return false;
    }
    // 1. find (p -> q) and (r -> s) to fit conclusion (q V s)
    const ifThenPremises = this.getPropositionsByPropositionTypeId(PropositionTypes.IfThen.id);
    const validIfThenFirsts = ifThenPremises.filter(
      (premise: Proposition) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        premise.truthStatements[1].statement.id === statementFirstId &&
        premise.truthStatements[1].truthValue === statementFirstTruthValue,
    );
    const validIfThenSeconds = ifThenPremises.filter(
      (premise: Proposition) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        premise.truthStatements[1].statement.id === statementSecondId &&
        premise.truthStatements[1].truthValue === statementSecondTruthValue,
    );

    if (validIfThenFirsts.length === 0 || validIfThenSeconds.length === 0) {
      return false;
    }

    // 2. assuming conclusion is (q V s), find a possible (p V r) to fit (p -> q) ^ (r -> s)
    const orPremises = this.getPropositionsByPropositionTypeId(PropositionTypes.Or.id);
    const validOrPremise = orPremises.find((or: Proposition) => {
      // find (p -> q) for an or where (p V r)
      const found = validIfThenFirsts.find((first: Proposition) => {
        if (
          first.truthStatements[0].statement.id === or.truthStatements[0].statement.id &&
          first.truthStatements[0].truthValue === or.truthStatements[0].truthValue
        ) {
          // found p for (p V ?)
          const foundR = validIfThenSeconds.find(
            (second: Proposition) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              second.truthStatements[0].statement.id === or.truthStatements[1].statement.id &&
              second.truthStatements[0].truthValue === or.truthStatements[1].truthValue,
          );
          if (foundR) {
            return true;
          }
        } else if (
          first.truthStatements[0].statement.id === or.truthStatements[1].statement.id &&
          first.truthStatements[0].truthValue === or.truthStatements[1].truthValue
        ) {
          // found r for (? V R)
          const foundP = validIfThenSeconds.find(
            (second: Proposition) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              second.truthStatements[0].statement.id === or.truthStatements[0].statement.id &&
              second.truthStatements[0].truthValue === or.truthStatements[0].truthValue,
          );
          if (foundP) {
            return false;
          }
        }
        return false;
      });
      if (found) {
        return true;
      }
      return false;
    });
    if (validOrPremise) {
      return true;
    }
    return false;
  }

  // (p -> q) ^ (r -> s) ^ (!q V !s) = (!p V !r)
  private detectDestructiveDilemma(
    statementFirstId: number,
    statementFirstTruthValue: boolean,
    statementSecondId: number,
    statementSecondTruthValue: boolean,
  ): boolean {
    if (statementFirstTruthValue !== statementSecondTruthValue) {
      return false;
    }
    // 1. find (p -> q) and (r -> s) to fit conclusion (!p V !r)
    const ifThenPremises = this.getPropositionsByPropositionTypeId(PropositionTypes.IfThen.id);
    const validIfThenFirsts = ifThenPremises.filter(
      (premise: Proposition) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        premise.truthStatements[0].statement.id === statementFirstId &&
        premise.truthStatements[0].truthValue === !statementFirstTruthValue,
    );
    const validIfThenSeconds = ifThenPremises.filter(
      (premise: Proposition) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        premise.truthStatements[0].statement.id === statementSecondId &&
        premise.truthStatements[0].truthValue === !statementSecondTruthValue,
    );

    if (validIfThenFirsts.length === 0 || validIfThenSeconds.length === 0) {
      return false;
    }

    // 2. assuming conclusion is (!p V !r), find a possible (!q V !s) to fit (p -> q) ^ (r -> s)
    const orPremises = this.getPropositionsByPropositionTypeId(PropositionTypes.Or.id);
    const validOrPremise = orPremises.find((or: Proposition) => {
      // find (p -> q) for an or where (!q V !s)
      const found = validIfThenFirsts.find((first: Proposition) => {
        if (
          first.truthStatements[1].statement.id === or.truthStatements[0].statement.id &&
          first.truthStatements[1].truthValue === !or.truthStatements[0].truthValue
        ) {
          // found !q for (!q V ?)
          const foundNotS = validIfThenSeconds.find(
            (second: Proposition) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              second.truthStatements[1].statement.id === or.truthStatements[1].statement.id &&
              second.truthStatements[1].truthValue === !or.truthStatements[1].truthValue,
          );
          if (foundNotS) {
            return true;
          }
        } else if (
          first.truthStatements[1].statement.id === or.truthStatements[1].statement.id &&
          first.truthStatements[1].truthValue === !or.truthStatements[1].truthValue
        ) {
          // found !s for (? V !s)
          const foundNotQ = validIfThenSeconds.find(
            (second: Proposition) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              second.truthStatements[1].statement.id === or.truthStatements[0].statement.id &&
              second.truthStatements[1].truthValue === !or.truthStatements[0].truthValue,
          );
          if (foundNotQ) {
            return true;
          }
        }
        return false;
      });
      if (found) {
        return true;
      }
      return false;
    });
    if (validOrPremise) {
      return true;
    }
    return false;
  }

  // (p -> q) ^ (r -> s) ^ (p V !s) = (q V !r)
  private detectBidirectionalDilemma(
    statementFirstId: number,
    statementFirstTruthValue: boolean,
    statementSecondId: number,
    statementSecondTruthValue: boolean,
  ): boolean {
    if (statementFirstTruthValue === statementSecondTruthValue) {
      return false;
    }

    // 1. find (p -> q) and (r -> s) to fit conclusion (q V !r)
    const ifThenPremises = this.getPropositionsByPropositionTypeId(PropositionTypes.IfThen.id);
    const validIfThenFirsts = ifThenPremises.filter(
      (premise: Proposition) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        premise.truthStatements[1].statement.id === statementFirstId &&
        premise.truthStatements[1].truthValue === statementFirstTruthValue,
    );
    const validIfThenSeconds = ifThenPremises.filter(
      (premise: Proposition) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        premise.truthStatements[0].statement.id === statementSecondId &&
        premise.truthStatements[0].truthValue !== statementSecondTruthValue,
    );

    if (validIfThenFirsts.length === 0 || validIfThenSeconds.length === 0) {
      return false;
    }

    // 2. assuming conclusion is (q V !r), find a possible (p V !s) to fit (p -> q) ^ (r -> s)
    const orPremises = this.getPropositionsByPropositionTypeId(PropositionTypes.Or.id);
    const validOrPremise = orPremises.find((or: Proposition) => {
      // find (p -> q) for an or where (p V !s)
      const found = validIfThenFirsts.find((first: Proposition) => {
        if (
          first.truthStatements[0].statement.id === or.truthStatements[0].statement.id &&
          first.truthStatements[0].truthValue === or.truthStatements[0].truthValue
        ) {
          // found p for (p V ?)
          const foundNotS = validIfThenSeconds.find(
            (second: Proposition) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              second.truthStatements[1].statement.id === or.truthStatements[1].statement.id &&
              second.truthStatements[1].truthValue !== or.truthStatements[1].truthValue,
          );
          if (foundNotS) {
            return true;
          }
        } else if (
          first.truthStatements[0].statement.id === or.truthStatements[1].statement.id &&
          first.truthStatements[0].truthValue !== or.truthStatements[1].truthValue
        ) {
          // found r for (? V !s)
          const foundP = validIfThenSeconds.find(
            (second: Proposition) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              second.truthStatements[0].statement.id === or.truthStatements[0].statement.id &&
              second.truthStatements[0].truthValue === or.truthStatements[0].truthValue,
          );
          if (foundP) {
            return true;
          }
        }
        return false;
      });
      if (found) {
        return true;
      }
      return false;
    });
    if (validOrPremise) {
      return true;
    }
    return false;
  }

  // (p V q) ^ !p = q
  // given statementId should belong to a truthstatement with a true truthValue
  private detectDisjunctiveSyllogism(statementId: number): boolean {
    const xorPremises = this.getPropositionsByPropositionTypeId(PropositionTypes.Xor.id);
    const xorPremisesWithConclusion = xorPremises.filter((premise: Proposition) => {
      if (!premise.truthStatements[0].truthValue || !premise.truthStatements[1].truthValue) {
        return false;
      }
      if (
        premise.truthStatements[0].statement.id === statementId ||
        premise.truthStatements[1].statement.id === statementId
      ) {
        return true;
      }
      return false;
    });
    const validXor = xorPremisesWithConclusion.find((premise: Proposition) => {
      if (
        premise.truthStatements[0].statement.id === statementId &&
        this.isInFalseStatements(premise.truthStatements[1].statement)
      ) {
        return true;
      }
      if (
        premise.truthStatements[1].statement.id === statementId &&
        this.isInFalseStatements(premise.truthStatements[0].statement)
      ) {
        return true;
      }

      return false;
    });

    if (validXor !== undefined) {
      return true;
    }

    return false;
  }

  private async processConclusion(): Promise<void> {
    if (this.argument.conclusion instanceof TruthStatement) {
      await this.processTruthStatementConclusion();
    }
    if (this.argument.conclusion instanceof Proposition) {
      await this.processPropositionConclusion();
    }
  }

  private async processTruthStatementConclusion(): Promise<void> {
    // eslint-disable-next-line prefer-destructuring
    const conclusion: TruthStatement = this.argument.conclusion;
    if (conclusion.truthValue && this.detectDisjunctiveSyllogism(conclusion.statement.id)) {
      this.addConclusionNote('Disjunctive Syllogism detected');
    } else if (conclusion.truthValue && !this.isInTrueStatements(conclusion.statement)) {
      this.addInvalidConclusionError(
        "Conclusion's statement was found to false when it was expected to be true.",
      );
    } else if (!conclusion.truthValue && !this.isInFalseStatements(conclusion.statement)) {
      this.addInvalidConclusionError(
        "Conclusion's statement was found to true when it was expected to be false.",
      );
    }

    if (conclusion.truthValue) {
      this.trueStatements.push(conclusion.statement);
    }
    if (!conclusion.truthValue) {
      this.falseStatements.push(conclusion.statement);
    }
  }

  private async processPropositionConclusion(): Promise<void> {
    // eslint-disable-next-line prefer-destructuring
    const conclusion: Proposition = this.argument.conclusion;

    if (
      this.findPropositionInArgument(
        conclusion.type.id,
        conclusion.truthStatements[0].statement.id,
        conclusion.truthStatements[0].truthValue,
        conclusion.truthStatements[1].statement.id,
        conclusion.truthStatements[1].truthValue,
      ) !== undefined
    ) {
      this.addConclusionNote('Exact condition found in premises.');

      return;
    }

    switch (conclusion.type.id) {
      case PropositionTypes.IfThen.id:
        if (
          this.detectHypotheticalSyllogism(
            conclusion.truthStatements[0].statement.id,
            conclusion.truthStatements[0].truthValue,
            conclusion.truthStatements[1].statement.id,
            conclusion.truthStatements[1].truthValue,
          )
        ) {
          this.addConclusionNote('Hypothetical Syllogism detected');
          break;
        }
        this.addInvalidConclusionError(
          'Invalid conclusion: neither exact condition nor hypothetical syllogism found',
        );
        break;
      case PropositionTypes.Or.id:
        if (
          this.detectConstructiveDilemma(
            conclusion.truthStatements[0].statement.id,
            conclusion.truthStatements[0].truthValue,
            conclusion.truthStatements[1].statement.id,
            conclusion.truthStatements[1].truthValue,
          )
        ) {
          this.addConclusionNote('Constructive Dilemma detected');
          break;
        }
        if (
          this.detectDestructiveDilemma(
            conclusion.truthStatements[0].statement.id,
            conclusion.truthStatements[0].truthValue,
            conclusion.truthStatements[1].statement.id,
            conclusion.truthStatements[1].truthValue,
          )
        ) {
          this.addConclusionNote('Destructive Dilemma detected');
          break;
        }
        if (
          this.detectBidirectionalDilemma(
            conclusion.truthStatements[0].statement.id,
            conclusion.truthStatements[0].truthValue,
            conclusion.truthStatements[1].statement.id,
            conclusion.truthStatements[1].truthValue,
          )
        ) {
          this.addConclusionNote('Bidirectional Dilemma detected');
          break;
        }
        this.addInvalidConclusionError(
          'Invalid conclusion: neither exact condition, nor constructive dilemma, nor destructive dilemma, nor bidirectional dilemma found',
        );
        break;
      default:
        break;
    }
  }
}

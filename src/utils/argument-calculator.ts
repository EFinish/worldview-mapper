/* eslint-disable operator-linebreak */
import { Argument, Statement, Premise } from '@/models';
import { InvalidPremiseError } from '@/utils/errors/InvalidPremiseError';

import constants from '@/utils/constants';

const premiseTypes = constants.PremiseTypes;

export default class ArgumentCalculator {
  private argument: Argument;

  private trueStatements: Statement[] = [];

  private falseStatements: Statement[] = [];

  private premisesToProcess: Premise[] = [];

  private invalidPremises: InvalidPremiseError[] = [];

  private conclusionError!: InvalidPremiseError;

  constructor(argument: Argument) {
    this.argument = argument;
  }

  private resetCalc(): void {
    this.trueStatements = [];
    this.falseStatements = [];
    this.premisesToProcess = Object.assign([], this.argument.premises);
    this.invalidPremises = [];
  }

  get getTrueStatements() {
    return this.trueStatements;
  }

  get getFalseStatements() {
    return this.falseStatements;
  }

  get getConclusionError() {
    return this.conclusionError;
  }

  isArgumentValid(): boolean {
    const invalidPremises = this.findInvalidPremises();

    if (invalidPremises.length > 0) {
      return false;
    }

    return true;
  }

  findInvalidPremises(): InvalidPremiseError[] {
    this.resetCalc();
    this.processTruthValueSettingPremises();
    this.processConditionalPremises();
    this.processConclusion();

    return this.invalidPremises;
  }

  private addInvalidPremise(premise: Premise, reason: string): void {
    this.invalidPremises.push({
      description: reason,
      premise,
    } as InvalidPremiseError);
  }

  private setConclusionError(reason: string): void {
    this.conclusionError = {
      description: reason,
      premise: this.argument.conclusion,
    } as InvalidPremiseError;
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

  private processTruthValueSettingPremises(): void {
    const premiseIndexesToRemove: number[] = [];

    this.premisesToProcess.map((premise, premiseIndex) => {
      const statement = premise.statements[0];

      switch (premise.type.id) {
        case premiseTypes.premiseTypeTrue.id:
          if (this.isInFalseStatements(statement)) {
            this.addInvalidPremise(
              premise,
              `Cannot set statement ${statement.id} to true, already set to false`,
            );
            break;
          } else if (this.isInTrueStatements(statement)) {
            this.addInvalidPremise(
              premise,
              `Inefficiency detected: cannot set statement ${statement.id} to true, already set to true`,
            );
            break;
          }
          this.trueStatements.push(statement);
          premiseIndexesToRemove.push(premiseIndex);
          break;
        case premiseTypes.premiseTypeFalse.id:
          if (this.isInTrueStatements(statement)) {
            this.addInvalidPremise(
              premise,
              `Cannot set statement ${statement.id} to false, already set to true`,
            );
            break;
          } else if (this.isInFalseStatements(statement)) {
            this.addInvalidPremise(
              premise,
              `Inefficiency detected: cannot set statement ${statement.id} to false, already set to false`,
            );
            break;
          }
          this.falseStatements.push(statement);
          premiseIndexesToRemove.push(premiseIndex);
          break;
        default:
          break;
      }

      return null;
    });

    this.removePremiseFromProcessing(premiseIndexesToRemove);
  }

  private findPremise(
    premiseTypeId: number,
    statementFirst: Statement,
    statementSecond: Statement | null,
  ): Premise | undefined {
    return this.argument.premises.find((premise) => {
      if (premise.type.id === premiseTypeId && premise.statements[0].id === statementFirst.id) {
        if (statementSecond === null) {
          return true;
        }
        if (statementSecond && premise.statements[1].id === statementSecond.id) {
          return true;
        }
        return false;
      }

      return false;
    });
  }

  private getPremisesByTypeId(premiseTypeId: number): Premise[] {
    const premises: Premise[] = [];

    this.argument.premises.forEach((premise) => {
      if (premise.type.id === premiseTypeId) {
        premises.push(premise);
      }
    });

    return premises;
  }

  private processConditionalPremises(): void {
    const premiseIndexesToRemove: number[] = [];

    this.premisesToProcess.map((premise, premiseIndex) => {
      const [statementFirst, statementSecond] = premise.statements;
      switch (premise.type.id) {
        // IF x THEN y
        case premiseTypes.premiseTypeIfThen.id:
          // IF x true THEN y true
          if (this.isInTrueStatements(statementFirst)) {
            this.trueStatements.push(statementSecond);
          }
          break;
        // IF x THEN NOT y
        case premiseTypes.premiseTypeIfThenNot.id:
          // IF x true THEN y false
          if (this.isInTrueStatements(statementFirst)) {
            this.falseStatements.push(statementSecond);
          }
          break;
        // x OR y
        case premiseTypes.premiseTypeOr.id:
          // if !x and !y create error
          if (this.isInFalseStatements(statementFirst)) {
            if (this.isInFalseStatements(statementSecond)) {
              this.addInvalidPremise(
                premise,
                `False premise: both statements ${statementFirst.id} and ${statementSecond.id} are false.`,
              );
            }
          }
          break;
        // x NOR y
        case premiseTypes.premiseTypeNor.id:
          // both should be false, if either x or y are true then create error
          if (this.isInTrueStatements(statementFirst) || this.isInTrueStatements(statementSecond)) {
            this.addInvalidPremise(
              premise,
              `False premise: one of either statement ${statementFirst.id} or ${statementSecond.id} is true.`,
            );
          }
          break;
        // x XOR y
        case premiseTypes.premiseTypeXor.id:
          // either x is true or y is true, not both true, not both false
          if (
            this.isInFalseStatements(statementFirst) &&
            this.isInFalseStatements(statementSecond)
          ) {
            this.addInvalidPremise(
              premise,
              `False premise: both statements ${statementFirst.id} and ${statementSecond.id} are true.`,
            );
          } else if (
            this.isInTrueStatements(statementFirst) &&
            this.isInTrueStatements(statementSecond)
          ) {
            this.addInvalidPremise(
              premise,
              `False premise: both statements ${statementFirst.id} and ${statementSecond.id} are false.`,
            );
          } else if (
            !(
              this.isInTrueStatements(statementFirst) && !this.isInTrueStatements(statementSecond)
            ) &&
            !(this.isInTrueStatements(statementSecond) && !this.isInTrueStatements(statementFirst))
          ) {
            this.addInvalidPremise(
              premise,
              `False premise: neither statements ${statementFirst.id} and ${statementSecond.id} are true.`,
            );
          }
          break;
        // x XNOR y
        case premiseTypes.premiseTypeXnor.id:
          // both true, both false = ok
          if (
            (this.isInTrueStatements(statementFirst) &&
              !this.isInTrueStatements(statementSecond)) ||
            (this.isInTrueStatements(statementSecond) && !this.isInTrueStatements(statementFirst))
          ) {
            this.addInvalidPremise(
              premise,
              `False premise: either statements ${statementFirst.id} or ${statementSecond.id} are true and the other is not.`,
            );
          }
          break;
        case premiseTypes.premiseTypeAnd.id:
          // both must be true
          if (
            !this.isInTrueStatements(statementFirst) ||
            !this.isInTrueStatements(statementSecond)
          ) {
            this.addInvalidPremise(
              premise,
              `False premise: either/both statements ${statementFirst.id} or/and ${statementSecond.id} is/are not true`,
            );
          }
          break;
        case premiseTypes.premiseTypeNand.id:
          // anything but both being true = ok
          if (this.isInTrueStatements(statementFirst) && this.isInTrueStatements(statementSecond)) {
            this.addInvalidPremise(
              premise,
              `False premise: both statements ${statementFirst.id} and ${statementSecond.id} are true`,
            );
          }
          break;
        default:
          this.addInvalidPremise(premise, 'False premise: Invalid premise type.');
          break;
      }

      premiseIndexesToRemove.push(premiseIndex);
      return null;
    });

    this.removePremiseFromProcessing(premiseIndexesToRemove);
  }

  private detectHypotheticalSyllogism(
    statementFirst: Statement,
    statementSecond: Statement,
  ): boolean {
    const ifThenPremises = this.getPremisesByTypeId(premiseTypes.premiseTypeIfThen.id);
    let index = 0;
    let trailingTargetStatements: Statement[] = [];
    console.log(`FIND HYPOTHETICAL SYLLOGISM: IF ${statementFirst.id} THEN ${statementSecond.id}`);
    while (index < ifThenPremises.length) {
      console.log('NEW ROUND');
      const ifThen = ifThenPremises[index];

      console.log(
        `INDEX ${index} - analyzing IF ${ifThen.statements[0].id} THEN ${ifThen.statements[1].id}`,
      );
      if (ifThen.statements[1].id === statementSecond.id) {
        console.log(
          `FOUND: THEN statement ${ifThen.statements[1].id} = conlusion THEN ${statementSecond.id}`,
        );
        trailingTargetStatements.push(ifThen.statements[0]);
        console.log(
          `ADD ${ifThen.statements[0].id} to trailing target statements`,
          trailingTargetStatements,
        );
        ifThenPremises.splice(index, 1);
        console.log('REMOVE processed if-then from array', ifThenPremises);
        index = 0;

        console.log(`SET index to ${index}`);
      } else if (
        trailingTargetStatements.find((statement) => statement.id === ifThen.statements[1].id)
      ) {
        console.log(
          `FOUND: THEN ${ifThen.statements[1].id} IN trailing target statements`,
          trailingTargetStatements,
        );
        if (ifThen.statements[0].id === statementFirst.id) {
          console.log(
            `FOUND: IF ${ifThen.statements[0].id} = conclusion IF ${statementFirst.id}`,
            'RETURN TRUE',
          );
          return true;
        }

        const newTrailingTargetArray: Statement[] = trailingTargetStatements.map((statement) => {
          if (statement.id === ifThen.statements[1].id) {
            console.log(
              `REPLACE ${statement.id} in trailing target statements WITH ${ifThen.statements[0].id}`,
            );

            return ifThen.statements[0];
          }

          return statement;
        });
        console.log('new trailing target statements', newTrailingTargetArray);
        trailingTargetStatements = newTrailingTargetArray;
        ifThenPremises.splice(index, 1);
        console.log('REMOVE processed if-then from array', ifThenPremises);
        index = 0;
        console.log(`SET index to ${index}`);
      } else {
        index += 1;
        console.log(`ADD index + 1 = ${index}`);
      }
    }

    console.log(
      `NOT FOUND: conditional chain for IF ${statementFirst.id} THEN ${statementSecond.id}`,
      'RETURN FALSE',
    );
    return false;
  }

  private processConclusion(): void {
    const { conclusion } = this.argument;
    const [statementFirst, statementSecond] = conclusion.statements;

    switch (conclusion.type.id) {
      // TRUTH SETTING
      case premiseTypes.premiseTypeTrue.id:
        if (this.isInFalseStatements(statementFirst)) {
          this.setConclusionError(`Statement ${statementFirst.id} truth value is false`);
        }
        break;
      case premiseTypes.premiseTypeFalse.id:
        if (this.isInTrueStatements(statementFirst)) {
          this.setConclusionError(`Statement ${statementFirst.id} truth value is true`);
        }
        break;
      // CONDITIONALS
      case premiseTypes.premiseTypeIfThen.id:
        if (!this.detectHypotheticalSyllogism(statementFirst, statementSecond)) {
          this.setConclusionError(
            `Syllogism not found for IF ${statementFirst.id} THEN ${statementSecond.id}`,
          );
        }
        break;
      default:
        break;
    }
  }
}

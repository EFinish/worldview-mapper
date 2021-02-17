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
    this.invalidPremises.push(
      {
        description: reason,
        premise,
      } as InvalidPremiseError,
    );
  }

  private setConclusion(reason: string): void{
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
            premiseIndexesToRemove.push(premiseIndex);
          }
          break;
          // IF x THEN NOT y
        case premiseTypes.premiseTypeIfThenNot.id:
          // IF x true THEN y false
          if (this.isInTrueStatements(statementFirst)) {
            this.falseStatements.push(statementSecond);
            premiseIndexesToRemove.push(premiseIndex);
          }
          break;
          // x OR y
        case premiseTypes.premiseTypeOr.id:
          // if !x and !y create error
          if (
            this.isInFalseStatements(statementFirst)
          ) {
            if (this.isInFalseStatements(statementSecond)) {
              this.addInvalidPremise(
                premise,
                `False premise: both statements ${statementFirst.id} and ${statementSecond.id} are false.`,
              );
            }
          }
          premiseIndexesToRemove.push(premiseIndex);
          break;
        // x NOR y
        case premiseTypes.premiseTypeNor.id:
          // both should be false, if either x or y are true then create error
          if (
            this.isInTrueStatements(statementFirst)
            || this.isInTrueStatements(statementSecond)
          ) {
            this.addInvalidPremise(
              premise,
              `False premise: one of either statement ${statementFirst.id} or ${statementSecond.id} is true.`,
            );
          }
          premiseIndexesToRemove.push(premiseIndex);
          break;
        default:
          break;
      }

      return null;
    });

    this.removePremiseFromProcessing(premiseIndexesToRemove);
  }

  private processConclusion(): void {
    const { conclusion } = this.argument;
    const [statementFirst, statementSecond] = conclusion.statements;

    switch (conclusion.type.id) {
      case premiseTypes.premiseTypeTrue.id:
        if (this.isInFalseStatements(statementFirst)) {
          this.setConclusion(
            `Statement ${statementFirst.id} truth value is false`,
          );
        }
        break;
      case premiseTypes.premiseTypeFalse.id:
        if (this.isInTrueStatements(statementFirst)) {
          this.setConclusion(
            `Statement ${statementFirst.id} truth value is true`,
          );
        }
        break;
      default:
        break;
    }
  }
}

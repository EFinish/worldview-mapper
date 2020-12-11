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

  constructor(argument: Argument) {
    this.argument = argument;
  }

  private resetCalc(): void {
    this.trueStatements = [];
    this.falseStatements = [];
    this.premisesToProcess = [];
    this.invalidPremises = [];
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
    this.processTruthValueSettingStatements();

    return this.invalidPremises;
  }

  private addInvalidPremise(premise: Premise, reason: string) {
    this.invalidPremises.push(
      {
        description: reason,
        premise,
      } as InvalidPremiseError,
    );
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

  private processTruthValueSettingStatements(): void {
    this.argument.premises.map((premise) => {
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
          break;
        default:
          break;
      }

      return null;
    });
  }
}

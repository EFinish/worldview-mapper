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

  private incorrectConclusionError: InvalidPremiseError;

  constructor(argument: Argument) {
    this.argument = argument;
  }

  private resetCalc(): void {
    this.trueStatements = [];
    this.falseStatements = [];
    this.premisesToProcess = Object.assign([], this.argument.premises);
    this.invalidPremises = [];
  }

  get trueStatementsStack() {
    return this.trueStatements;
  }

  get falseStatementsStack() {
    return this.falseStatements;
  }

  get incorrectConclusion() {
    return this.incorrectConclusionError;
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

  private setIncorrectConclusion(reason: string): void{
    this.incorrectConclusionError = {
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

  private removePremiseFromProcessing(premise: Premise): void {
    let indexOfPremise: number;

    this.premisesToProcess.find((processPremise, index) => {
      if (processPremise.id === premise.id) {
        indexOfPremise = index;

        return true;
      }

      return false;
    });

    this.premisesToProcess = this.premisesToProcess.splice(0, indexOfPremise);
  }

  private processTruthValueSettingPremises(): void {
    this.premisesToProcess.map((premise) => {
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
          this.removePremiseFromProcessing(premise);
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
          this.removePremiseFromProcessing(premise);
          break;
        default:
          break;
      }

      return null;
    });
  }

  private processConditionalPremises(): void {
    let processing = true;
    while (processing) {
      let processedAPremise = false;

      this.premisesToProcess.map((premise) => {
        const [statementFirst, statementSecond] = premise.statements;
        switch (premise.type.id) {
          // IF THEN
          case premiseTypes.premiseTypeIfThen.id:
            // IF true THEN true
            if (this.isInTrueStatements(statementFirst)) {
              this.falseStatements.push(statementSecond);
              this.removePremiseFromProcessing(premise);
              processedAPremise = true;
            }
            break;
          default:
            break;
        }

        return null;
      });

      if (this.premisesToProcess.length === 0 || processedAPremise === false) {
        processing = false;
      }
    }
  }

  private processConclusion(): void {
    const { conclusion } = this.argument;
    const [statementFirst, statementSecond] = conclusion.statements;

    switch (conclusion.type.id) {
      case premiseTypes.premiseTypeTrue.id:
        if (this.isInFalseStatements(statementFirst)) {
          this.setIncorrectConclusion(
            `Statement ${statementFirst.id} truth value is false`,
          );
        }
        break;
      case premiseTypes.premiseTypeFalse.id:
        if (this.isInTrueStatements(statementFirst)) {
          this.setIncorrectConclusion(
            `Statement ${statementFirst.id} truth value is true`,
          );
        }
        break;
      default:
        break;
    }
  }
}

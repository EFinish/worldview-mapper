<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-group
          description="Choose a type of premise"
          label="Premise type"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-radio
            v-model="premiseType"
            :aria-describedby="ariaDescribedby"
            value="proposition"
          >
            Proposition
          </b-form-radio>
          <b-form-radio
            v-model="premiseType"
            :aria-describedby="ariaDescribedby"
            value="truth_statement"
          >
            Truth Statement
          </b-form-radio>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="premiseType === 'proposition'">
      <b-col>
        <b-form-group
          description="Select a proposition type"
          label="Proposition Type"
          label-for="propositionTypeSelect"
        >
          <b-form-select
            id="propositionTypeSelect"
            v-model="propositionScaffolding.type"
            :options="propositionTypeOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="premiseType === 'proposition' && propositionScaffolding.type !== undefined">
      <b-col>
        <b-form-group
          description="Choose a type of premise for new proposition's first premise"
          label="Proposition 1 premise type"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-radio
            v-model="propositionPremiseFirstType"
            :aria-describedby="ariaDescribedby"
            value="proposition"
          >
            Proposition
          </b-form-radio>
          <b-form-radio
            v-model="propositionPremiseFirstType"
            :aria-describedby="ariaDescribedby"
            value="truth_statement"
          >
            Truth Statement
          </b-form-radio>
        </b-form-group>
      </b-col>
      <b-col v-if="propositionPremiseFirstType === 'truth_statement'">
        <b-form-group
          :description="`Select truth statement 1 new proposition`"
          :label="`Truth Statement 1`"
          :label-for="`propositionTruthStatementOne`"
        >
          <b-form-select
            :id="`propositionTruthStatementOne`"
            v-model="propositionScaffolding.premises[0]"
            :options="propositionTruthStatementOptions"
          />
        </b-form-group>
      </b-col>
      <b-col v-if="propositionPremiseFirstType === 'proposition'">
        <b-form-group
          :description="`Select proposition 1 new proposition`"
          :label="`Proposition 1`"
          :label-for="`propositionPropositionOne`"
        >
          <b-form-select
            :id="`propositionPropositionOne`"
            v-model="propositionScaffolding.premises[0]"
            :options="propositionPropositionOptions"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="premiseType === 'proposition' && propositionScaffolding.type !== undefined">
      <b-col>
        <b-form-group
          description="Choose a type of premise for new proposition's second premise"
          label="Proposition 2 premise type"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-radio
            v-model="propositionPremiseSecondType"
            :aria-describedby="ariaDescribedby"
            value="proposition"
          >
            Proposition
          </b-form-radio>
          <b-form-radio
            v-model="propositionPremiseSecondType"
            :aria-describedby="ariaDescribedby"
            value="truth_statement"
          >
            Truth Statement
          </b-form-radio>
        </b-form-group>
      </b-col>
      <b-col v-if="propositionPremiseSecondType === 'truth_statement'">
        <b-form-group
          :description="`Select truth statement 2 new proposition`"
          :label="`Truth Statement 2`"
          :label-for="`propositionTruthStatementTwo`"
        >
          <b-form-select
            :id="`propositionTruthStatementTwo`"
            v-model="propositionScaffolding.premises[1]"
            :options="propositionTruthStatementOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col v-if="propositionPremiseSecondType === 'proposition'">
        <b-form-group
          :description="`Select proposition 2 new proposition`"
          :label="`Proposition 2`"
          :label-for="`propositionPropositionTwo`"
        >
          <b-form-select
            :id="`propositionPropositionTwo`"
            v-model="propositionScaffolding.premises[1]"
            :options="propositionPropositionOptions"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="premiseType === 'truth_statement'">
      <b-col>
        <b-form-group
          :description="`Select statement for new truth statement`"
          :label="`Statement`"
          :label-for="`truthStatementStatement`"
        >
          <b-form-select
            :id="`truthStatementStatement`"
            v-model="truthStatementScaffolding.statement"
            :options="truthStatementStatementOptions"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          description="Choose a truth value for new truth statement"
          label="Truth Value"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-radio
            v-model="truthStatementScaffolding.truthValue"
            :aria-describedby="ariaDescribedby"
            value="{true}"
          >
            True
          </b-form-radio>
          <b-form-radio
            v-model="truthStatementScaffolding.truthValue"
            :aria-describedby="ariaDescribedby"
            value="{false}"
          >
            False
          </b-form-radio>
        </b-form-group>
      </b-col>
    </b-row>
    <PremiseLabel :premise="potentialPremise" :colored="true" />
    <b-row v-if="showSubmit">
      <b-col>
        <b-button variant="success" v-on:click="submit">Create</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';

import PremiseUtil from '@/utils/premise';
import { PropositionTypesArray } from '@/utils/constants';
import { Premise } from '@/models/interfaces/Premise';
import Statement from '@/models/Statement';
import Proposition from '@/models/Proposition';
import TruthStatement from '@/models/TruthStatement';
import { PropositionType } from '@/models/interfaces/PropositionType';

import PremiseLabel from '@/components/PremiseLabel.vue';

interface SelectOption {
  value: any;
  text: string;
}
interface PropositionScaffolding {
  type?: PropositionType;
  premises: Premise[];
}
interface TruthStatementScaffolding {
  statement?: Statement;
  truthValue: boolean;
}

@Component({
  components: {
    PremiseLabel,
  },
})
export default class CreatePremise extends Vue {
  premiseType = '';

  propositionPremiseFirstType = '';

  propositionPremiseSecondType = '';

  propositionScaffolding: PropositionScaffolding = {
    type: undefined,
    premises: [],
  };

  truthStatementScaffolding: TruthStatementScaffolding = {
    statement: undefined,
    truthValue: true,
  };

  @State('premiseStack')
  premiseStack!: Premise[];

  @State('statementStack')
  statementStack!: Statement[];

  @Action('addTruthStatementToPremiseStack')
  addTruthStatementToPremiseStack!: (
    addTruthStatementToPremiseStack: TruthStatementScaffolding,
  ) => void;

  @Action('addPropositionToPremiseStack')
  addPropositionToPremiseStack!: (addPropositionToPremiseStack: PropositionScaffolding) => void;

  get propositionTypeOptions(): SelectOption[] {
    console.log(this.premiseStack);
    const result: SelectOption[] = [{ value: null, text: 'Please select an option' }];

    PropositionTypesArray.forEach((pt) => {
      result.push({
        value: pt,
        text: pt.label,
      });
    });

    return result;
  }

  get premisePreview(): string {
    return this.getPremisePreview(this.potentialPremise);
  }

  get potentialPremise(): Premise {
    if (this.premiseType === 'truth_statement' && this.truthStatementScaffolding.statement) {
      return new TruthStatement(
        0,
        this.truthStatementScaffolding.statement,
        this.truthStatementScaffolding.truthValue,
      );
    }
    if (this.premiseType === 'proposition' && this.propositionScaffolding.type) {
      return new Proposition(
        0,
        this.propositionScaffolding.type,
        this.propositionScaffolding.premises,
      );
    }

    return {} as Premise;
  }

  getPremisePreview(premise: Premise): string {
    console.log(this.premiseStack);
    return PremiseUtil.getFilledLabel(premise);
  }

  get propositionTruthStatementOptions(): SelectOption[] {
    return this.truthStatementsFromPremiseStack.map((truthStatement: TruthStatement) => ({
      // eslint-disable-next-line indent
      value: truthStatement,
      text: this.getPremisePreview(truthStatement),
    }));
  }

  get propositionPropositionOptions(): SelectOption[] {
    return this.propositionsFromPremiseStack.map((proposition: Proposition) => ({
      // eslint-disable-next-line indent
      value: proposition,
      text: this.getPremisePreview(proposition),
    }));
  }

  get truthStatementsFromPremiseStack(): TruthStatement[] {
    const truthStatements: TruthStatement[] = this.premiseStack.filter(
      (premise) => premise instanceof TruthStatement,
    );

    return truthStatements;
  }

  get propositionsFromPremiseStack(): Proposition[] {
    const propositions: Proposition[] = this.premiseStack.filter(
      (premise) => premise instanceof Proposition,
    );

    return propositions;
  }

  get truthStatementStatementOptions(): SelectOption[] {
    return this.statementStack.map((statement: Statement) => ({
      value: statement,
      text: statement.text,
    }));
  }

  get showSubmit(): boolean {
    if (
      // eslint-disable-next-line operator-linebreak
      this.premiseType === 'proposition' &&
      // eslint-disable-next-line operator-linebreak
      this.propositionScaffolding.type &&
      // eslint-disable-next-line operator-linebreak
      this.propositionScaffolding.premises[0] &&
      this.propositionScaffolding.premises[1]
    ) {
      return true;
    }
    if (
      // eslint-disable-next-line operator-linebreak
      this.premiseType === 'truth_statement' &&
      this.truthStatementScaffolding.statement
    ) {
      return true;
    }
    return false;
  }

  submit(): void {
    if (this.premiseType === 'truth_statement') {
      this.addTruthStatementToPremiseStack(this.truthStatementScaffolding);
    }
    if (this.premiseType === 'proposition') {
      this.addPropositionToPremiseStack(this.propositionScaffolding);
    }
  }
}
</script>

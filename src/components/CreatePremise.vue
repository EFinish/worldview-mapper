<template>
    <b-container>
        <b-row>
            <b-col>
                <b-form-group
                    description="Select a premise type"
                    label="Premise Type"
                    label-for="premiseTypeSelect"
                    >
                    <b-form-select
                    id="premiseTypeSelect"
                    v-model="newPremise.type"
                    :options="options"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <div v-if="newPremise.type.label !== null">
            <b-row v-for="index in newPremise.type.numStatements" :key="index">
                <b-col>
                    <b-form-group
                        :description="`Select statement ${index} new premise`"
                        :label="`statement ${index}`"
                        :label-for="`premiseTypeStatementSelect[${index-1}]`"
                        >
                        <b-form-select
                        :id="`premiseTypeStatementSelect[${index-1}]`"
                        v-model="newPremise.statements[index-1]"
                        :options="premiseStatementOptions"
                        ></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            {{premisePreview}}
        </div>
        <b-row>
            <b-col>
                <b-button variant="success" v-on:click="submit">Create</b-button>
            </b-col>
        </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';

import { Premise, PremiseType, Statement } from '@/models';
import getFilledLabel from '@/utils/premise';

const availablePremiseTypes = {
  PREMISE_IF_THEN: { label: 'IF p THEN q', numStatements: 2 } as PremiseType,
  PREMISE_IF_THEN_NOT: { label: 'IF p THEN NOT q', numStatements: 2 } as PremiseType,
  PREMISE_OR: { label: 'p OR q (OR)', numStatements: 2 } as PremiseType,
  PREMISE_NOR: { label: 'p NOR q (NOR)', numStatements: 2 } as PremiseType,
  PREMISE_XOR: { label: 'EITHER p OR q (XOR)', numStatements: 2 } as PremiseType,
  PREMISE_XNOR: { label: 'EITHER (p AND q) OR (!p AND !q) (XNOR)', numStatements: 2 } as PremiseType,
  PREMISE_AND: { label: 'p AND q (AND)', numStatements: 2 } as PremiseType,
  PREMISE_NAND: { label: 'NOT p AND q (NAND)', numStatements: 2 } as PremiseType,
  PREMISE_TRUE: { label: 'p IS TRUE (assigns truth value)', numStatements: 1 } as PremiseType,
  PREMISE_FALSE: { label: 'p IS FALSE (assigns truth value)', numStatements: 1 } as PremiseType,
};

@Component
export default class CreatePremise extends Vue {
    newPremise: Premise = {
      type: {
        label: null,
        numStatements: null,
      },
      statements: [],
    }

    options = [
      { value: null, text: 'Please select an option' },
      {
        value: availablePremiseTypes.PREMISE_IF_THEN,
        text: availablePremiseTypes.PREMISE_IF_THEN.label,
      },
      {
        value: availablePremiseTypes.PREMISE_IF_THEN_NOT,
        text: availablePremiseTypes.PREMISE_IF_THEN_NOT.label,
      },
      {
        value: availablePremiseTypes.PREMISE_OR,
        text: availablePremiseTypes.PREMISE_OR.label,
      },
      {
        value: availablePremiseTypes.PREMISE_NOR,
        text: availablePremiseTypes.PREMISE_NOR.label,
      },
      {
        value: availablePremiseTypes.PREMISE_XOR,
        text: availablePremiseTypes.PREMISE_XOR.label,
      },
      {
        value: availablePremiseTypes.PREMISE_XNOR,
        text: availablePremiseTypes.PREMISE_XNOR.label,
      },
      {
        value: availablePremiseTypes.PREMISE_AND,
        text: availablePremiseTypes.PREMISE_AND.label,
      },
      {
        value: availablePremiseTypes.PREMISE_NAND,
        text: availablePremiseTypes.PREMISE_NAND.label,
      },
      {
        value: availablePremiseTypes.PREMISE_TRUE,
        text: availablePremiseTypes.PREMISE_TRUE.label,
      },
      {
        value: availablePremiseTypes.PREMISE_FALSE,
        text: availablePremiseTypes.PREMISE_FALSE.label,
      },
    ];

  @State('statementStack') statementStack: any

  get premiseStatementOptions() {
    return this.statementStack.map(
      (statement: Statement) => ({ value: statement, text: statement.text }),
    );
  }

  get premisePreview() {
    return getFilledLabel(this.newPremise);
  }

  @Action('addToPremiseStack')
  addToPremiseStack!: (addToPremiseStack: Premise) => void

  submit() {
    this.addToPremiseStack(this.newPremise);
    this.newPremise = {
      type: {
        label: null,
        numStatements: null,
      },
      statements: [],
    };
  }
}
</script>

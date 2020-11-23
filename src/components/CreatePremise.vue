<template>
    <b-container>
        <b-row>
            <b-col>
                <b-form-group
                    description="Select a premise type"
                    label="Text"
                    label-for="premiseTypeSelect"
                    >
                    <b-form-select
                    id="premiseTypeSelect"
                    v-model="premiseType"
                    :options="options"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <div v-if="premiseType !== null">
            <b-row v-for="index in premiseType.numStatements" :key="index">
                <b-col>
                    <b-form-group
                        :description="`Select statement ${index} new premise`"
                        label="Text"
                        :label-for="`premiseTypeStatementSelect[${index-1}]`"
                        >
                        <b-form-select
                        :id="`premiseTypeStatementSelect[${index-1}]`"
                        v-model="premiseStatements[index-1]"
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

const PREMISE_IF_THEN = { label: 'IF p THEN q', numStatements: 2 };
const PREMISE_IF_THEN_NOT = { label: 'IF p THEN NOT q', numStatements: 2 };
const PREMISE_OR = { label: 'p OR q (OR)', numStatements: 2 };
const PREMISE_NOR = { label: 'p NOR q (NOR)', numStatements: 2 };
const PREMISE_XOR = { label: 'EITHER p OR q (XOR)', numStatements: 2 };
const PREMISE_XNOR = { label: 'EITHER (p AND q) OR (!p AND !q) (XNOR)', numStatements: 2 };
const PREMISE_AND = { label: 'p AND q (AND)', numStatements: 2 };
const PREMISE_NAND = { label: 'NOT p AND q (NAND)', numStatements: 2 };
const PREMISE_TRUE = { label: 'p IS TRUE (assigns truth value)', numStatements: 1 };
const PREMISE_FALSE = { label: 'p IS FALSE (assigns truth value)', numStatements: 1 };

@Component
export default class CreatePremise extends Vue {
    premiseType = null;

    premiseStatements = [];

    options = [
      { value: null, text: 'Please select an option' },
      { value: PREMISE_IF_THEN, text: PREMISE_IF_THEN.label },
      { value: PREMISE_IF_THEN_NOT, text: PREMISE_IF_THEN_NOT.label },
      { value: PREMISE_OR, text: PREMISE_OR.label },
      { value: PREMISE_NOR, text: PREMISE_NOR.label },
      { value: PREMISE_XOR, text: PREMISE_XOR.label },
      { value: PREMISE_XNOR, text: PREMISE_XNOR.label },
      { value: PREMISE_AND, text: PREMISE_AND.label },
      { value: PREMISE_NAND, text: PREMISE_NAND.label },
      { value: PREMISE_TRUE, text: PREMISE_TRUE.label },
      { value: PREMISE_FALSE, text: PREMISE_FALSE.label },
    ];

  @State('statementStack') statementStack: any

  get premiseStatementOptions() {
    return this.statementStack.map((statement: any) => ({ value: statement, text: statement }));
  }

  get premisePreview() {
    if (!this.premiseType || this.premiseStatements.length !== this.premiseType.numStatements) {
      return null;
    }

    return this.premiseType.label.replace('p', this.premiseStatements[0]).replace('q', this.premiseStatements[1]);
  }

  @Action('addToPremiseStack')
  addToPremiseStack!: (addToPremiseStack: string) => void

  submit() {
    this.addToPremiseStack(this.premisePreview);
    this.premiseStatements = [];
    this.premiseType = null;
  }
}
</script>

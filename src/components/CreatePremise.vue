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
import constants from '@/utils/constants';

@Component
export default class CreatePremise extends Vue {
  newPremise: Premise = {
    type: {
      label: null,
      numStatements: null,
    },
    statements: [],
  }

  options = [];

  @State('statementStack') statementStack: any

  mounted() {
    this.options.push({ value: null, text: 'Please select an option' });

    constants.PremiseTypes.forEach((pt) => {
      this.options.push({
        value: pt,
        text: pt.label,
      });
    });
  }

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

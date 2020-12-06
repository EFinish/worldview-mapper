<template>
    <b-container>
        <b-row>
            <b-col>
                <b-form-group
                    :description="`Select premise to add to argument`"
                    label="Argument Premise"
                    :label-for="`premiseSelect`"
                    >
                    <b-form-select
                    :id="`premiseSelect`"
                    v-model="premiseSelect"
                    :options="premiseOptions"
                    ></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-list-group>
              <b-list-group-item v-for="(premise, index) in newArgument.premises" :key="index">
                {{ index + 1 }}.) {{ getFilledLabel(premise) }}
              </b-list-group-item>
              <b-list-group-item v-if="Object.keys(newArgument.conclusion).length > 0">
                C: {{ getFilledLabel(newArgument.conclusion) }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
        <b-row>
            <b-col>
              <b-button-group>
                <b-button
                variant="primary"
                v-on:click="addToArgumentPremises">
                Add Premises
                </b-button>
                <b-button
                variant="primary"
                v-on:click="setConclusion">
                Set Conclusion
                </b-button>
                <b-button variant="success" v-on:click="submit">Create</b-button>
              </b-button-group>
            </b-col>
        </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';

import { Premise, Argument } from '@/models';
import getFilledLabel from '@/utils/premise';

@Component
export default class CreateArgument extends Vue {
  newArgument: Argument = { premises: [], conclusion: {} as Premise };

  premiseSelect: Premise = { type: { label: '', numStatements: 0 }, statements: [] };

  @State('premiseStack') premiseStack: any

  get premiseOptions() {
    return this.premiseStack.map(
      (premise: Premise) => ({ value: premise, text: getFilledLabel(premise) }),
    );
  }

  @Action('addToArgumentStack')
  addToArgumentStack!: (addToArgumentStack: Argument) => void

  getFilledLabel = getFilledLabel;

  submit(): void {
    this.addToArgumentStack(this.newArgument);
    this.newArgument = { premises: [], conclusion: {} as Premise };
  }

  addToArgumentPremises(): void {
    if (this.premiseSelect !== null) {
      this.newArgument.premises.push(this.premiseSelect);
    }
  }

  setConclusion(): void {
    if (this.premiseSelect !== null) {
      this.newArgument.conclusion = this.premiseSelect;
    }
  }
}
</script>

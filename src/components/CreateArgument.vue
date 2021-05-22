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
            v-model="premiseToAdd"
            :options="premiseOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          :description="`Type in a title for the argument`"
          label="Argument Title"
          :label-for="`argumentTitle`"
        >
          <b-form-input id="argumentTitle" v-model="argumentScaffolding.title" trim></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-list-group>
          <b-list-group-item v-for="(premise, index) in argumentScaffolding.premises" :key="index">
            {{ index + 1 }}.) {{ getFilledLabel(premise) }}
          </b-list-group-item>
          <b-list-group-item v-if="argumentScaffolding.conclusion">
            C: {{ getFilledLabel(argumentScaffolding.conclusion) }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button-group>
          <b-button variant="primary" v-on:click="addToArgumentPremises">
            Add Premises
          </b-button>
          <b-button variant="primary" v-on:click="setConclusion">
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

import { Premise } from '@/models/interfaces/Premise';
import PremiseUtil from '@/utils/premise';

interface ArgumentScaffolding {
  premises: Premise[];
  conclusion?: Premise;
  title?: string;
}

interface SelectOption {
  value: any;
  text: string;
}

@Component
export default class CreateArgument extends Vue {
  argumentScaffolding: ArgumentScaffolding = {
    premises: [],
    conclusion: undefined,
    title: undefined,
  };

  premiseToAdd: Premise | null = null;

  @State('premiseStack') premiseStack: Premise[];

  get premiseOptions(): SelectOption[] {
    return this.premiseStack.map((premise: Premise) => ({
      value: premise,
      text: this.getFilledLabel(premise),
    }));
  }

  @Action('addToArgumentStack')
  addToArgumentStack!: (addToArgumentStack: ArgumentScaffolding) => void;

  getFilledLabel = PremiseUtil.getFilledLabel;

  addToArgumentPremises(): void {
    if (this.premiseToAdd !== null) {
      this.argumentScaffolding.premises.push(this.premiseToAdd);
    }
  }

  setConclusion(): void {
    if (this.premiseToAdd !== null) {
      this.argumentScaffolding.conclusion = this.premiseToAdd;
    }
  }

  submit(): void {
    this.addToArgumentStack(this.argumentScaffolding);
    this.argumentScaffolding = {
      premises: [],
      conclusion: undefined,
      title: undefined,
    };
  }
}
</script>

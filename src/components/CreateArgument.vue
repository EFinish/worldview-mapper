<template>
    <b-container>
        <b-row>
            <b-col>
                <b-form-group
                    :description="`Select premise to add to argument`"
                    label="Text"
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
              <b-list-group-item v-for="(premise, index) in argumentPremises" :key="premise">
                {{ index + 1 }}.) {{ premise }}
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
                <b-button variant="success" v-on:click="submit">Create</b-button>
              </b-button-group>
            </b-col>
        </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';

@Component
export default class CreateArgument extends Vue {
  premiseSelect = null;

  argumentPremises = [];

  @State('premiseStack') premiseStack: any

  get premiseOptions() {
    return this.premiseStack.map((premise: any) => ({ value: premise, text: premise }));
  }

  @Action('addToArgumentStack')
  addToArgumentStack!: (addToArgumentStack: Array) => void

  submit() {
    this.addToArgumentStack(this.argumentPremises);
    this.argumentPremises = [];
  }

  addToArgumentPremises() {
    if (this.premiseSelect !== null) {
      this.argumentPremises.push(this.premiseSelect);
    }
  }
}
</script>

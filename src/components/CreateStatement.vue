<template>
    <b-container>
        <b-row>
            <b-col>
                <b-form-group
                    description="Enter the statement text"
                    label="Text"
                    label-for="statementValue"
                    >
                    <b-form-input
                    id="statementValue"
                    v-model="statementValue"
                    trim></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="primary" v-on:click="submit">Create</b-button>
            </b-col>
        </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class CreateStatement extends Vue {
  statementValue = '';

  @Action('addToStatementStack')
  addToStatementStack!: (addToStatementStack: string) => void

  submit() {
    this.addToStatementStack(this.statementValue);
  }
}
</script>

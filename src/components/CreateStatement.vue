<template>
    <b-container>
        <b-row>
            <b-col>
                <b-form-group
                    description="Enter the statement text"
                    label="Statement Text"
                    label-for="statementValue"
                    >
                    <b-form-input
                    id="statementValue"
                    v-model="statementValue.text"
                    trim></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="success" v-on:click="submit">Create</b-button>
            </b-col>
        </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { Statement } from '@/models';

@Component
export default class CreateStatement extends Vue {
  statementValue: Statement = { text: '' };

  @Action('addToStatementStack')
  addToStatementStack!: (addToStatementStack: Statement) => void

  submit() {
    this.addToStatementStack(this.statementValue);
    this.statementValue = { text: '' };
  }
}
</script>

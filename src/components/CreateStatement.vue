<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-group
          description="Enter the statement text"
          label="Statement Text"
          label-for="statementText"
        >
          <b-form-input id="statementText" v-model="statementText" trim></b-form-input>
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

interface Args {
  text: string;
}

@Component
export default class CreateStatement extends Vue {
  statementText = '';

  @Action('addToStatementStack')
  addToStatementStack!: (addToStatementStack: Args) => void;

  submit() {
    const text = this.statementText.slice();

    this.addToStatementStack({ text });
    this.statementText = '';
  }
}
</script>

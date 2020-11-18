<template>
    <b-container>
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
export default class CreateArgument extends Vue {
//   statementValue = '';

  @Action('addToArgumentStack')
  addToArgumentStack!: (addToArgumentStack: string) => void

  submit() {
    this.addToArgumentStack('asd');
    // this.statementValue = '';
  }
}
</script>

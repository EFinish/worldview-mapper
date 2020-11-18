<template>
    <b-container>
        <b-row>
            <b-col>
                <b-button variant="primary" v-on:click="submit">Add To WIP Argument</b-button>
            </b-col>
        </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class CreateProposition extends Vue {
  @Action('addToPropositionStack')
  addToPropositionStack!: (addToPropositionStack: string) => void

  submit() {
    this.addToPropositionStack('asd');
  }
}
</script>

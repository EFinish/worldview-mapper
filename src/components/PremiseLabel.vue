<template>
  <span>
    <span v-if="!colored"> ({{ premise.id }}) {{ getFilledLabel(premise) }} </span>
    <span v-if="colored && isPremiseTruthStatement" v-html="getTruthStatementColored(premise)">
    </span>
    <span v-if="colored && isPremiseProposition" v-html="getPropositionColored(premise)"></span>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Argument from '@/models/Argument';
import InvalidPremiseError from '@/utils/errors/InvalidPremiseError';
import InvalidConclusionError from '@/utils/errors/InvalidConclusionError';

import PremiseUtil from '@/utils/premise';
import { Note } from '@/utils/notes/Note';
import ConclusionNote from '@/utils/notes/ConclusionNote';
import PremiseNote from '@/utils/notes/PremiseNote';
import { Premise } from '@/models/interfaces/Premise';
import TruthStatement from '@/models/TruthStatement';
import Proposition from '@/models/Proposition';

@Component
export default class PremiseLabel extends Vue {
  @Prop() private premise!: Premise;

  @Prop({
    default: () => false,
  })
  private colored: boolean;

  getFilledLabel = PremiseUtil.getFilledLabel;

  // get conclusionErrors() {
  //   return this.$props.errors.filter((error: Error) => error instanceof InvalidConclusionError);
  // }

  // get conclusionNotes() {
  //   return this.$props.notes.filter((note: Note) => note instanceof ConclusionNote);
  // }

  // getPremiseErrorsByPremiseId(premiseId: number) {
  //   return this.$props.errors.filter(
  //     (error: Error) => error instanceof InvalidPremiseError && error.premise.id === premiseId,
  //   );
  // }

  // getPremiseNotesByPremiseId(premiseId: number) {
  //   return this.$props.notes.filter(
  //     (note: Note) => note instanceof PremiseNote && note.premise.id === premiseId,
  //   );
  // }

  getTruthStatementColored(premise: TruthStatement): string {
    console.log(this.premise);

    if (premise.truthValue) {
      console.log('true');
      return `<strong class='text-primary'>${premise.statement.text}</strong> is <strong class='text-success'>TRUE</strong>`;
    }
    console.log('false');
    return `<strong class='text-primary'>${premise.statement.text}</strong> is <strong class='text-danger'>FALSE</strong>`;
  }

  getPropositionColored(premise: Proposition) {
    console.log(this.premise);
    let response = premise.type.label;
    response = premise.truthStatements[0]
      ? response.replace('p', this.getTruthStatementColored(premise.truthStatements[0]))
      : response;
    response = premise.truthStatements[1]
      ? response.replace('q', this.getTruthStatementColored(premise.truthStatements[1]))
      : response;

    return response;
  }

  get isPremiseTruthStatement() {
    return this.premise instanceof TruthStatement;
  }

  get isPremiseProposition() {
    return this.premise instanceof Proposition;
  }
}
</script>

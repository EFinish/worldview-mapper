<template>
  <b-list-group>
    <b-list-group-item>
      <div>{{ argument.title }}</div>
    </b-list-group-item>
    <b-list-group-item v-for="(premise, index) in argument.premises" :key="index">
      <div>{{ index + 1 }}.) ({{ premise.id }}) {{ getFilledLabel(premise) }}</div>
      <b-alert
        v-for="(error, index) in getPremiseErrorsByPremiseId(premise.id)"
        :key="index"
        show
        variant="danger"
      >
        {{ error.message }}
      </b-alert>
      <b-alert
        v-for="(note, index) in getPremiseNotesByPremiseId(premise.id)"
        :key="index"
        show
        variant="primary"
      >
        {{ note.message }}
      </b-alert>
    </b-list-group-item>
    <b-list-group-item>
      C: {{ getFilledLabel(argument.conclusion) }}
      <b-alert v-for="(error, index) in conclusionErrors" :key="index" show variant="danger">
        {{ error.message }}
      </b-alert>
      <b-alert v-for="(note, index) in conclusionNotes" :key="index" show variant="primary">
        {{ note.message }}
      </b-alert>
    </b-list-group-item>
  </b-list-group>
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

@Component
export default class ListArgument extends Vue {
  @Prop() private argument!: Argument;

  @Prop({
    default: () => [] as Error[],
  })
  private errors: Error[];

  @Prop({
    default: () => [] as Note[],
  })
  private notes: Note[];

  getFilledLabel = PremiseUtil.getFilledLabel;

  get conclusionErrors() {
    return this.$props.errors.filter((error: Error) => error instanceof InvalidConclusionError);
  }

  get conclusionNotes() {
    return this.$props.notes.filter((note: Note) => note instanceof ConclusionNote);
  }

  getPremiseErrorsByPremiseId(premiseId: number) {
    return this.$props.errors.filter(
      (error: Error) => error instanceof InvalidPremiseError && error.premise.id === premiseId,
    );
  }

  getPremiseNotesByPremiseId(premiseId: number) {
    return this.$props.notes.filter(
      (note: Note) => note instanceof PremiseNote && note.premise.id === premiseId,
    );
  }
}
</script>

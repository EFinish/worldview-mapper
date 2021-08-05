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
    if (premise.premises[0]) {
      if (premise.premises[0] instanceof TruthStatement) {
        response = response.replace('p', this.getTruthStatementColored(premise.premises[0]));
      } else if (premise.premises[0] instanceof Proposition) {
        response = response.replace('p', `(${this.getPropositionColored(premise.premises[0])})`);
      }
    }
    if (premise.premises[1]) {
      if (premise.premises[1] instanceof TruthStatement) {
        response = response.replace('q', this.getTruthStatementColored(premise.premises[1]));
      } else if (premise.premises[1] instanceof Proposition) {
        response = response.replace('q', `(${this.getPropositionColored(premise.premises[1])})`);
      }
    }

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

<template>
  <b-container>
    <b-row>
      <b-col>
        <h4>#{{ argument.id }} - {{ argument.title }}</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ListArgument :argument="argument" :errors="errors" :notes="notes" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row>
          <b-col><u>Valid</u></b-col>
        </b-row>
        <b-row>
          <b-col>
            <strong>{{ isArgumentValid }}</strong>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row>
          <b-col><u>Truths</u></b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-list-group>
              <b-list-group-item v-for="statement in trueStatements" :key="statement.id">
                {{ statement.text }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <b-row>
          <b-col><u>Falses</u></b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-list-group>
              <b-list-group-item v-for="statement in falseStatements" :key="statement.id">
                {{ statement.text }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Argument from '@/models/Argument';

import ListArgument from '@/components/ListArgument.vue';

import ArgumentCalculator from '@/utils/argument-calculator';
import Statement from '@/models/Statement';
import { Note } from '@/utils/notes/Note';

@Component({
  components: {
    ListArgument,
  },
})
export default class ArgumentMap extends Vue {
  @Prop() private argument!: Argument;

  calculator: ArgumentCalculator = new ArgumentCalculator(this.argument);

  trueStatements: Statement[] = this.calculator.getTrueStatements;

  falseStatements: Statement[] = this.calculator.getFalseStatements;

  errors: Error[] = this.calculator.getErrors;

  notes: Note[] = this.calculator.getNotes;

  get isArgumentValid() {
    return this.errors.length === 0;
  }
}
</script>

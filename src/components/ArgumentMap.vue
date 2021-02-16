<template>
    <b-container>
        <b-row>
            <b-col>
                <h4>#{{ argument.id }} - {{ argument.title }}</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <ListArgument
                  :argument="argument"
                  :errors="errors"
                  :conclusionError="conclusionError" />
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
                  <b-list-group-item v-for="(statement) in statementTrueStack" :key="statement.id">
                    {{ statement.id }}.) {{ statement.text }}
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
                  <b-list-group-item v-for="(statement) in statementFalseStack" :key="statement.id">
                    {{ statement.id }}.) {{ statement.text }}
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
import { Argument } from '@/models';

import ListArgument from '@/components/ListArgument.vue';

import PremiseUtil from '@/utils/premise';
import ArgumentCalculator from '@/utils/argument-calculator';
import { InvalidPremiseError } from '@/utils/errors/InvalidPremiseError';

@Component({
  components: {
    ListArgument,
  },
})
export default class ArgumentMap extends Vue {
    @Prop() private argument!: Argument;

    calculator = new ArgumentCalculator(this.argument);

    errors: InvalidPremiseError[] = this.calculator.findInvalidPremises();

    conclusionError = this.calculator.getConclusionError;

    getFilledLabel = PremiseUtil.getFilledLabel;

    get isArgumentValid() {
      return this.errors.length === 0;
    }

    get isConclusionCorrect() {
      if (this.conclusionError) {
        return false;
      }

      return true;
    }

    get conclusion() {
      return this.conclusionError;
    }

    get statementTrueStack() {
      return this.calculator.getTrueStatements;
    }

    get statementFalseStack() {
      return this.calculator.getFalseStatements;
    }
}
</script>

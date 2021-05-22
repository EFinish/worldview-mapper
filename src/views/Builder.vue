<template>
  <b-container class="home" fluid>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <b-button variant="primary" v-on:click="switchShowStatementStack">
              Show Statements
            </b-button>
            <b-list-group v-if="showStatementStack">
              <b-list-group-item v-for="statement in statementStack" :key="statement.id">
                {{ statement.id }}.) {{ statement.text }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col>
            <b-button variant="primary" v-on:click="switchShowPremiseStack">
              Show Premises
            </b-button>
            <b-list-group v-if="showPremiseStack">
              <b-list-group-item v-for="premise in premiseStack" :key="premise.id">
                {{ premise.id }}.) {{ getFilledLabel(premise) }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col>
            <b-button variant="primary" v-on:click="switchShowArgumentStack">
              Show Arguments
            </b-button>
            <b-list-group v-if="showArgumentStack">
              <b-list-group-item v-for="argument in argumentStack" :key="argument.id">
                <ListArgument :argument="argument" />
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h4>Statements</h4>
            <CreateStatement />
          </b-col>
          <b-col>
            <h4>Premises</h4>
            <CreatePremise />
          </b-col>
          <b-col>
            <h4>Arguments</h4>
            <CreateArgument />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreateStatement from '@/components/CreateStatement.vue';
import CreatePremise from '@/components/CreatePremise.vue';
import CreateArgument from '@/components/CreateArgument.vue';
import ListArgument from '@/components/ListArgument.vue';
import { State } from 'vuex-class';

import PremiseUtil from '@/utils/premise';
import Statement from '@/models/Statement';
import Argument from '@/models/Argument';
import { Premise } from '@/models/interfaces/Premise';

@Component({
  components: {
    CreateStatement,
    CreatePremise,
    CreateArgument,
    ListArgument,
  },
})
export default class Builder extends Vue {
  showStatementStack = true;

  showPremiseStack = true;

  showArgumentStack = true;

  @State('statementStack') statementStack: Statement[] | undefined;

  @State('premiseStack') premiseStack: Premise[] | undefined;

  @State('argumentStack') argumentStack: Argument[] | undefined;

  getFilledLabel = PremiseUtil.getFilledLabel;

  switchShowStatementStack() {
    this.showStatementStack = !this.showStatementStack;
  }

  switchShowPremiseStack() {
    this.showPremiseStack = !this.showPremiseStack;
  }

  switchShowArgumentStack() {
    this.showArgumentStack = !this.showArgumentStack;
  }
}
</script>

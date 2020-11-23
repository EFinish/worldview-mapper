<template>
   <b-container class="home" fluid>
     <b-row>
       <b-col>
         <b-row>
          <b-col>
            <b-button
              variant="primary"
              v-on:click="switchShowStatementStack">
              Show Statements
            </b-button>
            <b-list-group v-if="showStatementStack">
              <b-list-group-item v-for="statement in statementStack" :key="statement">
                {{ statement }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col>
            <b-button
              variant="primary"
              v-on:click="switchShowPremiseStack">
              Show Premises
            </b-button>
            <b-list-group v-if="showPremiseStack">
              <b-list-group-item v-for="premise in premiseStack" :key="premise">
                {{ premise }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col>
            <b-button
              variant="primary"
              v-on:click="switchShowArgumentStack">
              Show Arguments
            </b-button>
            <b-list-group v-if="showArgumentStack">
              <b-list-group-item v-for="argument in argumentStack" :key="argument">
                {{ argument }}
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
import { State } from 'vuex-class';

@Component({
  components: {
    CreateStatement,
    CreatePremise,
    CreateArgument,
  },
})
export default class Home extends Vue {
  showStatementStack = false;

  showPremiseStack = false;

  showArgumentStack = false;

  @State('statementStack') statementStack: any

  @State('premiseStack') premiseStack: any

  @State('argumentStack') argumentStack: any

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

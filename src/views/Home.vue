<template>
   <b-container class="home">
     <b-row>
      <b-col>
        <h4>Statements</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <CreateStatement />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        {{ statementStack }}
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h4>Propositions</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <CreateProposition />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        {{ propositionStack }}
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h4>Arguments</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <CreateArgument />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        {{ argumentStack }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreateStatement from '@/components/CreateStatement.vue';
import CreateProposition from '@/components/CreateProposition.vue';
import CreateArgument from '@/components/CreateArgument.vue';
import { State } from 'vuex-class';

@Component({
  components: {
    CreateStatement,
    CreateProposition,
    CreateArgument,
  },
})
export default class Home extends Vue {
  @State('statementStack') statementStack: any

  @State('propositionStack') propositionStack: any

  @State('argumentStack') argumentStack: any
}
</script>

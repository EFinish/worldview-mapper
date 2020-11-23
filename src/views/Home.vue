<template>
   <b-container class="home" fluid>
     <b-row>
       <b-col md="1">
         <b-row>
          <b-col>
            <strong>Statements</strong>
            {{ statementStack }}
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <strong>Premises</strong>
            {{ premiseStack }}
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <strong>Args</strong>
            {{ argumentStack }}
          </b-col>
        </b-row>
       </b-col>
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
  @State('statementStack') statementStack: any

  @State('premiseStack') premiseStack: any

  @State('argumentStack') argumentStack: any
}
</script>

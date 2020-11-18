<template>
   <b-container class="home">
    <b-row>
      <b-col>
        <CreateStatement />
      </b-col>
    </b-row>
     <b-row>
      <b-col>
        <h4>Statements</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        statements/....
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        {{ statementStack }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreateStatement from '@/components/CreateStatement.vue'; // @ is an alias to /src
import { mapState } from 'vuex';

@Component({
  components: {
    CreateStatement,
  },
  computed: {
    ...mapState({
      statementStack: 'statementStack',
    }),
  },
})
export default class Home extends Vue {}
</script>

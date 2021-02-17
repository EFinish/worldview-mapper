<template>
   <b-container fluid>
     <b-row v-for="argument in argumentStack" :key="argument.id">
        <b-col>
          <ArgumentMap :argument="argument" />
        </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import ArgumentMap from '@/components/ArgumentMap.vue';
import { Argument } from '@/models';

@Component({
  components: {
    ArgumentMap,
  },
})
export default class Map extends Vue {
    @State('argumentStack') argumentStack: Argument[]
}
</script>

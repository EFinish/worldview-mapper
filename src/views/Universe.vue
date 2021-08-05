<template>
  <b-container fluid>
    <b-row>
      <b-col>
        hi
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { State } from 'vuex-class';

// import ArgumentMap from '@/components/ArgumentMap.vue';
// import Argument from '@/models/Argument';

@Component({
  //   components: {
  //     ArgumentMap,
  //   },
})
export default class Universe extends Vue {
  //   @State('argumentStack') argumentStack: Argument[];
}
</script>

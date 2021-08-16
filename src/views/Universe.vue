<template>
  <b-container fluid>
    <b-row>
      <b-col style="height: 1000px;  border: 1px solid red; position: relative;">
        <span v-for="argument in argumentStack" :key="argument.id">
          <ArgumentDraggable :argument="argument" />
        </span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { State } from 'vuex-class';

// import ArgumentMap from '@/components/ArgumentMap.vue';
import ArgumentDraggable from '@/components/draggable/ArgumentDraggable.vue';
import { State } from 'vuex-class';
import Argument from '@/models/Argument';
// import Argument from '@/models/Argument';

@Component({
  components: {
    ArgumentDraggable,
  },
})
export default class Universe extends Vue {
  @State('argumentStack') argumentStack: Argument[];
}
</script>

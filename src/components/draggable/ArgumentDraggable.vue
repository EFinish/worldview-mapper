<template>
  <VueDraggableResizable :w="200" :h="100" @dragging="onDrag" @resizing="onResize" :parent="true">
    <ListArgument :argument="argument" :errors="errors" :notes="notes" />
  </VueDraggableResizable>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueDraggableResizable from 'vue-draggable-resizable';
import ListArgument from '@/components/ListArgument.vue';
import ArgumentCalculator from '@/utils/argument-calculator';
import Statement from '@/models/Statement';
import { Note } from '@/utils/notes/Note';
import Argument from '@/models/Argument';

@Component({
  components: {
    VueDraggableResizable,
    ListArgument,
  },
})
export default class ArgumentDraggable extends Vue {
  @Prop() private argument!: Argument;

  width = 0;

  height = 0;

  x = 0;

  y = 0;

  calculator: ArgumentCalculator = new ArgumentCalculator(this.argument);

  trueStatements: Statement[] = this.calculator.getTrueStatements;

  falseStatements: Statement[] = this.calculator.getFalseStatements;

  errors: Error[] = this.calculator.getErrors;

  notes: Note[] = this.calculator.getNotes;

  onResize(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  onDrag(x, y) {
    this.x = x;
    this.y = y;
  }
}
</script>

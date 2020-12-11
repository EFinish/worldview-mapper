<template>
    <b-container>
        <b-row>
            <b-col>
                <h4>Argument #{{ argument.id }}</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <ListArgument :argument="argument" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>Valid: {{ isArgumentValid }}</b-col>
        </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Argument } from '@/models';

import ListArgument from '@/components/ListArgument.vue';

import PremiseUtil from '@/utils/premise';
import ArgumentCalculator from '@/utils/argument-calculator';

@Component({
  components: {
    ListArgument,
  },
})
export default class ArgumentMap extends Vue {
    @Prop() private argument!: Argument;

    calculator = new ArgumentCalculator(this.argument);

    getFilledLabel = PremiseUtil.getFilledLabel;

    isArgumentValid = this.calculator.isArgumentValid();
}
</script>

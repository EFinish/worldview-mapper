<template>
    <b-container>
        <b-row>
            <b-col>
                <h4>Argument #{{ argument.id }}</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-list-group>
                    <b-list-group-item
                        v-for="(premise, index) in argument.premises"
                        :key="index">
                        {{ index + 1 }}.) {{ getFilledLabel(premise) }}
                    </b-list-group-item>
                    <b-list-group-item>
                        C: {{ getFilledLabel(argument.conclusion) }}
                    </b-list-group-item>
                </b-list-group>
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

import PremiseUtil from '@/utils/premise';
import ArgumentCalculator from '@/utils/argument-calculator';

@Component
export default class ArgumentMap extends Vue {
    @Prop() private argument!: Argument;

    calculator = new ArgumentCalculator(this.argument);

    getFilledLabel = PremiseUtil.getFilledLabel;

    isArgumentValid = this.calculator.isArgumentValid();
}
</script>

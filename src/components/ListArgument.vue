<template>
    <b-list-group>
        <b-list-group-item
            v-for="(premise, index) in argument.premises"
            :key="index">
            <div>{{ index + 1 }}.) ({{ premise.id }}) {{ getFilledLabel(premise) }}</div>
            <div
                v-if="getErrorIfExists(premise)">
                <b-alert show variant="danger">
                {{ getErrorIfExists(premise).description }}
                </b-alert>
            </div>
        </b-list-group-item>
        <b-list-group-item>
            C: {{ getFilledLabel(argument.conclusion) }}
            <div
                v-if="conclusionError">
                <b-alert show variant="danger">
                {{ conclusionError.description }}
                </b-alert>
            </div>
        </b-list-group-item>
    </b-list-group>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Argument, Premise } from '@/models';
import { InvalidPremiseError } from '@/utils/errors/InvalidPremiseError';

import PremiseUtil from '@/utils/premise';

@Component
export default class ListArgument extends Vue {
    @Prop() private argument!: Argument;

    @Prop({
      default: () => [] as InvalidPremiseError[],
    }) private errors!: InvalidPremiseError[];

    @Prop({
      default: () => null,
    }) private conclusionError!: InvalidPremiseError;

    getFilledLabel = PremiseUtil.getFilledLabel;

    getErrorIfExists(premise: Premise) {
      return this.errors.find((error) => error.premise.id === premise.id);
    }
}
</script>

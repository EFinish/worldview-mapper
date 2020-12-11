<template>
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Argument } from '@/models';

import PremiseUtil from '@/utils/premise';

@Component
export default class ListArgument extends Vue {
    @Prop() private argument!: Argument;

    getFilledLabel = PremiseUtil.getFilledLabel;
}
</script>

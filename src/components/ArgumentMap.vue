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
                        :key="premise">
                        {{ index + 1 }}.) {{ getFilledLabel(premise) }}
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>Conclusions:</b-col>
            <b-col>
                {{ argumentConclusions }}
            </b-col>
        </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Argument } from '@/models';

import getFilledLabel from '@/utils/premise';

@Component
export default class ArgumentMap extends Vue {
    conclusion = 'potato';

    @Prop() private argument!: Argument;

    getFilledLabel = getFilledLabel;

    get argumentConclusions() {
      return this.conclusion;
    }
}
</script>

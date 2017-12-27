<template lang="pug">
transition-group(
    name="tr-stagger-fade"
    @before-enter="beforeEnter"
    @enter="enter"
    appear
)
    slot
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Emit } from "vue-property-decorator"

@Component
export default class StaggerFade extends Vue {
    @Prop({ default : 200 })
    staggerTime : number;

    beforeEnter( el : any ) {
        el.style.opacity = 0;
    }

    enter( el : any, done : any ) {
        let delay = ( el.dataset.index )  * this.staggerTime + this.staggerTime;

        setTimeout( () => {
            el.style.opacity = 1;
            setTimeout( done, 200 );
        }, delay ); // 200 is fade time
    }
}
</script>

<style lang="scss">
.tr-stagger-fade-enter-active,
.tr-stagger-fade-leave-active {
    transition : opacity 200ms ease;
}
</style>

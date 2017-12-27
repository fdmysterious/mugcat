<template lang="pug">
div.main-background( ref="wrapper" ) 
    canvas
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import triangles from 'lib/triangles'

@Component
export default class MainBackground extends Vue
{
    @Prop() animate : boolean;

    triangle_instance : any;

    mounted() {
        this.triangle_instance = triangles( <HTMLElement>this.$refs.wrapper );
        this.triangle_instance.set_animate( this.animate );
    }

    @Watch('animate', { immediate : true } )
    onAnimateChange( cur : boolean, prev : boolean ) {
        if(this.triangle_instance) this.triangle_instance.set_animate( cur );
    }
}
</script>

<style lang="scss">
.main-background
{
    // Box //
    position : fixed;
    left     : 0;
    top      : 0;
    width    : 100%;
    height   : 100%;
    z-index  : 0;
    // End of section //

    // Colors //
    bakground : $color-background-main;
    // End of section //

    canvas {
        position : absolute;
        left : 0;
        top : 0;
        width : 100%;
        height : 100%;
    }
}
</style>

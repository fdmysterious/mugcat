<template lang="pug">
header.main-header(role="banner")
    div.main-header_logo
        img( :src="require('assets/img/logo.svg')" )
    main-nav
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"

import mainNav from 'components/main-nav'

@Component({
    components : { mainNav }
})
export default class MainHeader extends Vue
{}
</script>

<style lang="scss">
.main-header {
    // Box //
    @include make-container(
        $size-main-container-fixed + $size-main-container-margin,
        95%,
        0,
        $size-main-container-fixed + 2 * $size-main-container-margin
    );

    display     : flex;
    aligh-items : center;
    z-index : 100;
    // End of section //
    
    & > .main-header_logo {
        text-align : center;
        position : relative;

        display  : inline-block;
        margin   : 1rem;

        img {
            margin   : 0;
            height   : $size-header-height;

            @media( max-width : $size-phablet ) {
                height : $size-header-height-mobile;
            }
        }
    }

    @media( max-width : $size-tablet ) {
        flex-direction : column;
    }
}
</style>

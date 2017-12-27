<template lang="pug">
nav.main-nav(role="navigation")
    transition( name="tr-main-nav" )
        div.main-nav_content( v-show="$route.name != 'home'" )
            nav-link( v-for="item in routes" v-if="item.menuShow" :to="item.path" :icon="item.icon" :text="item.text" :key="item.name" )
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Provide } from "vue-property-decorator"

import { routes } from "../../config/router";

import navLink from "./nav-link.vue"
import staggerFade from "../transitions/stagger-fade.vue"

@Component({
    components : {navLink, staggerFade}
})
export default class mainNav extends Vue
{
    @Provide() routes = routes; //kinda werd line, huh
}
</script>

<style lang="scss">
.main-nav {
    // Box //
    flex-grow     : 1;
    margin-top    : 1rem;
    margin-bottom : 1rem;

    position : relative;
    // End of section //

    & > .main-nav_content {
        display  : flex;
        justify-content : flex-end;
        flex-wrap : wrap;
        
        width : 100%;

        position : absolute;
        top : 40%;

    }

    .nav-link {
        margin-left : 5rem;
    }

    @media( max-width : $size-tablet ) {
        & > .main-nav_content {
            position : relative;
            top : 0;
            left : 0;
            justify-content : space-around;
        }

        .nav-link {
            margin-left   : 0;
            margin-bottom : 1em;
        }
    }
}

.tr-main-nav-enter-active,
.tr-main-nav-leave-active
{
    transition : opacity 200ms ease;
}

.tr-main-nav-enter,
.tr-main-nav-leave-to {
    opacity : 0;
}
</style>

<template lang="pug">
    div.home-wrapper
        div.home-wrapper_content
            stagger-fade( :staggerTime="500" )
                h1( key="title" :data-index="0" ) Bonjour
                p( key="subtitle" :data-index="1" ) Je m'appelle Florian Dupeyron, étudiant de 20 ans. Ce petit bout de web est l'occasion pour moi de vous présenter mes activités numériques.
                div.home-links( key="links" :data-index="2" )
                    nav-link( v-for="item in routes" v-if="item.menuShow" :to="item.path" :icon="item.icon" :text="item.text" :key="item.name" )
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Provide } from 'vue-property-decorator'

import mainWrapper from 'components/main-wrapper.vue'
import staggerFade from 'components/transitions/stagger-fade.vue'

import navLink from "components/main-nav/nav-link.vue"
import { routes } from "../../config/router" // TODO // Absolute path

@Component({
    components : { mainWrapper, staggerFade, navLink }
})
export default class Home extends Vue {
    @Provide() routes = routes;
}
</script>

<style lang="scss">
.home-wrapper {
    // Box //
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    min-height: 100%;
    z-index : 1;
    // End of section //

    p{ text-align : center; }

    font-size : 1.5rem;

    & > .home-wrapper_content {
        // Box //
        position : absolute;
        top : 50%;
        left : 50%;
        transform : translate( -50%, -40% );
        // End of section //
    }

    color : $color-cream;
    h1 {
        text-align : center;
        color : $color-orange;
        font-size : 3rem;
    }

    @media( max-width : $size-phablet ) {
        font-size : 1.2rem;
        & > .home-wrapper_content {
            width : 95%;

            @media( max-width : $size-mobile ) {
                transform : translate( -50%, -35% );
            }
        }
    }

    .nav-link {
        & > .subtitle {
            opacity : 1;
        }
    }

}

.home-links {
    display : flex;
    justify-content : space-around;
    flex-wrap : wrap;

    @media( max-width : $size-phablet ) {
        width : 100%;

        .nav-link {
            margin-left : 1em;
            margin-right : 1em;
            margin-bottom : 2.5em;
        }
    }

    //.nav-link {
    //}
}
</style>

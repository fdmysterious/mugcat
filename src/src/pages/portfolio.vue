<template lang="pug">
main-wrapper
    h1 Portfolio
    nav.portfolio-links
        router-link( v-for="item in items" :key="item.id" :to="`/${$route.meta.lang}/portfolio/${item.id}`" )
            figure
                div.img-wrapper
                    img( :src="`/assets/img/portfolio/${item.img}.png`" alt="ballinatone")
                figcaption {{ item.lang[$route.meta.lang].name }}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Provide } from 'vue-property-decorator'

import mainWrapper from 'components/main-wrapper.vue'

import portfolio_items from "../config/portfolio_items" // TODO // Absolute path

@Component({
    components : { mainWrapper }
})
export default class Portfolio extends Vue {
    get items() {
        let r : any[] = [];
        for( let i in portfolio_items ) {
            let it = portfolio_items[i];
            if( this.$route.meta.lang in it.lang ) {
                r.push( it );
            }
        }
        return r;
    }

    get lang() { return this.$route.meta.lang; }
}
</script>

<style lang="scss">
.portfolio-links
{
    display : flex;
    justify-content : space-around;
    flex-wrap : wrap;

    & > a {
        @include no-outline();

        position : relative;
        margin : 1em;

        text-decoration : none;

        & > figure {
            & > .img-wrapper {
                position : relative;
                height   : 256px;
                width    : 256px;
                overflow : hidden;

                & > img {
                    height : 100%;
                    width  : auto;

                    position : absolute;
                    top : 50%;
                    left : 50%;
                    transform : translate( -50%, -50% );
                }
            }

            & > figcaption {
                margin-top : .5em;
                text-align : center;
                color      : $color-magenta;
                font-size   : 1.2em;
                width : 256px;
                white-space : wrap;
            }
        }
    }
}
</style>

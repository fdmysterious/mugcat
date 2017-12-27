<template>
    <main-wrapper>
        <router-link class="portfolio-prev-link" to="/fr/portfolio">Portfolio</router-link>
        <h1>{{ item.lang[lang].name }}</h1>
        <figure class="full-width">
            <div class="img-wrapper">
                <a :href="`/assets/img/portfolio/${item.img}.png`" target="_blank"><img :src="`/assets/img/portfolio/${item.img}.png`"/></a>
            </div>
            <figcaption>
                <a class="button primary" target="_blank" :href="item.lang[lang].url.demo">Demo</a>
                <a class="button no-border" target="_blank" :href="item.lang[lang].url.source">Source</a>
            </figcaption>
        </figure>
        <h2>En bref</h2>
        <p> {{ item.lang[lang].desc.short }}</p>
        <h2>Détails</h2>
        <div v-html="item.lang[lang].desc.long"></div>
    </main-wrapper>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Provide } from "vue-property-decorator"

import mainWrapper from "../components/main-wrapper.vue"

@Component({ components : { mainWrapper } })
export default class PortfolioItem extends Vue {
    get item() {
        return this.$route.meta.obj;
    }
    get lang() {
        return this.$route.meta.lang;
    }
}
</script>

<style lang="scss">
.portfolio-prev-link {
    display : block;
    text-decoration : none;
    fontsize : 1.2em;
    margin-bottom : 1.2em;

    &::before{
        content : "←";
    }
}
</style>

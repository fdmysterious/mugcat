<template lang="pug">
    div#app
        main-background( :animate="$route.name=='home'" )
        main-header
        transition( name="tr-content" mode="out-in" @after-enter="scrollResolve")
            router-view
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from 'vue-property-decorator'

import mainBackground from './components/main-background.vue'
import mainHeader     from './components/main-header.vue'

import { scroll_handler } from "./config/router";

@Component({
    components : { mainBackground, mainHeader }
})
export default class App extends Vue
{
    scrollResolve() : void {
        scroll_handler.handle();
    }
}
</script>

<style lang="scss">
.tr-content-enter-active,
.tr-content-leave-active {
	transition : transform 200ms ease, opacity   200ms ease
}

.tr-content-enter {
    opacity   : 0;
    transform : translateX( -50px );
}

.tr-content-leave-to {
    opacity : 0;
    transform : translateX( 50px  );
}
</style>

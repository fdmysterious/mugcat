<template lang="pug">
main-wrapper
    h1 Erreur {{ $route.params.error_num }}
    figure.full-width
        div.img-wrapper
            img( :src="`/assets/img/cats/${cat_image}.jpg`" alt="meow" )
    p {{ error_text }}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Provide } from 'vue-property-decorator'

import mainWrapper from '../components/main-wrapper.vue'

import portfolio_items from "../config/portfolio_items"

const error_texts = {
    0   : { en : "Oops ! Something wrong occured during your request.", fr : "Une erreur est survenue lors de votre requête" },
    403 : { en : "Nup, you haven't the rights to go there !", fr : "Vous allez où comme ça ? Vous n'avez pas le droit d'aller ici !" },
    404 : { en : "I'm sorry, but I can't find what you are looking for !", fr : "Impossible de trouver la ressource demandée" },
    500 : { en : "Ouch, something went wrong for us. Maybe retry.", fr : "Erreur interne au serveur. Réessayez peut-être un coup" }
};

const cats_images = [
	"business",
	"cat_computer_1",
	"cosis",
	"grumpy_mug",
	"happy_cat",
	"hipster_cat",
	"internet-cat",
	"keyboard_cat",
	"mgs",
	"nyan"
]


@Component({
	components : { mainWrapper }
})
export default class Portfolio extends Vue {
    get error_text() {
        let etexts = this.$route.params.error_num in error_texts
            ? error_texts[ this.$route.params.error_num ]
            : error_texts[ 0 ]
        ; 

        return etexts["fr"];
    }

    get cat_image() {
        return cats_images[ Math.floor(Math.random() * cats_images.length) ]; 
    }
}
</script>

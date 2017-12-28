<template lang="pug">
    main-wrapper
        h1 À propos
        p Je m'appelle Florian Dupeyron, et j'ai 20 ans. Je suis actuellement étudiant en double cursus de Sciences & Musicologie à la "Sorbonne Université", fusion de Paris Sorbonne et de l'université Pierre et Marie Curie. Depuis le début de mon adolescence je me passionne d'informatique, développant surtout mon interêt pour la programmation. Je pratique également quelques instruments de musique, principalement le piano.
        p Pour l'instant, je développe mes projets personnels, dans une volonté d'étoffer mon portfolio tout en répondant à des besoins personnels d'outils. Le plus abouti à l'heure est <router-link to="/fr/projects/sten">Sten</router-link>, dont je me sers quasi quotidiennement.

        p Après ma double licence, je compte repartir en licence d'informatique. Le but est de valider mes compétences, tout en me laissant un laps de temps supplémentaire pour décider de la suite de mon orientation.

        h2 Parcours
        dl.inline
            dt 2013
            dd Obtention Bac S option Sciences de l'Ingénieur − mention très bien

            dt 2014
            dd Rentrée en Double Cursus de Sciences & Musicologie dans les universités Paris VI et Paris IV

        h2#contact Contact
        dl.inline
            dt Mail
            dd {{ mail }}

            dt Github
            dd <a href="https://github.com/fdmysterious" target="_blank">fdmysterious</a>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Provide } from 'vue-property-decorator'

import mainWrapper from 'components/main-wrapper.vue'

@Component({
    components : { mainWrapper }
})
export default class Home extends Vue {
    @Provide() mail = "florian.dupeyron@mugcat.fr";
}
</script>

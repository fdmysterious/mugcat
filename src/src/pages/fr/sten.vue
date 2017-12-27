<template>
<main-wrapper>
    <h1>Sten</h1>
    <p>
        Sten est un langage de prise de notes hiérarchiques.
        Grandement inspiré du Markdown, ses objectifs principaux
        sont la lisibilité au format texte, la rapidité de prise
        en main et de saisie. De ce fait, son nom est le début du mot Sténographie.
    </p>

    <h2>Principe de base</h2>
    <p>
        L'idée de base est de constituer une représentation linéaire d'un arbre.
        Il y a un nœud racine, premier élément du fichier, puis on vient ajouter des
        enfants en rajoutant un niveau de tabulation, à la manière de YAML. Par exemple :
    </p>
    <code>
        <pre>
Nœud racine
    Premier enfant

    Deuxième enfant
        Premier sous-enfant
        Deuxième sous-enfant
            etc...

    etc...
        </pre>
    </code>
    <p>
        Une telle représentation permet alors une saisie rapide des informations.
    </p>

    <p>
        Il est possible de rajouter des symboles indiquant la nature du nœud, son rôle sémantique :
        <dl class="inline">
            <dt>rien ou -</dt><dd>Indique un nœud standard : un titre, une idée, un terme.</dd>
            <dt><code>&gt;</code></dt><dd>Indique un nœud d'explication de l'idée</dd>
            <dt><code>=&gt;</code></dt><dd>Nœud résumé, conséquence importante</dd>
            <dt><code>*</code></dt><dd>Item de liste non ordonnée</dd>
            <dt><code>)</code></dt><dd>Item de liste ordonnée</dd>
        </dl>
    </p>

    <h2>Enrichissement d'un nœud</h2>
    <p>
        Il est ensuite possible d'enrichir un nœud de différentes
        informations
    </p>
    <h3>Description</h3>
    <p>
        La description est un moyen direct de rattacher une information à un nœud,
        par exemple : un sous-titre, une citation, du code. On trouve deux types
        de balisage :
    </p>
    <code>
        <pre>
Descriptions
    Descrtiption courte
    | Pour ajouter une information à un nœud

    Description courte bis
    | Il est possible d'écrire
    | sur plusieurs lignes.

    Description longue
    |[
        Balisage permettant d'écrire
        sur plusieurs lignes sans avoir à
        remettre le symbole. De plus, conserve
        les niveaux de tabulations dans des
        situations particulières (cf. les tags)
    |]
        </pre>
    </code>
    <h3>Tags</h3>
    <p>
        Les tags donnent au nœud des informations d'affichage. Ils indiquent
        la nature de certains contenus qu'ils contiennent pour ajuster le traitement
        du parser.

        <code>
        <pre>
Node tags
    [q] Citation
    + by Theodore Roosveldt
    | Keep your eyes on the stars, and your feet on the ground

    [c] Code
    | printf( "Hello world ! \n\a" );
            </pre>
        </code>
    <p>

    <h2>Attachments</h2>
    <p>
        Enfin, les attachments sont le moyen d'ajouter des métadonnées aux nœuds :
    </p>
    <dl class="inline">
        <dt>+ u</dt><dd>Rattache une URI au nœud</dd>
        <dt>+ i</dt><dd>Rattache une image au nœud</dd>
        <dt>+ cf</dt><dd>Indique une référence</dd>
        <dt>+ by</dt><dd>Indique un auteur</dd>
        <dt>+ dt</dt><dd>Indique une position temporelle</dd>
        <dt>+ from</dt><dd>Indique la provenance de l'information</dd>
    </dl>

    <p>Vous pouvez voir leur application dans l'exemple qui suit</p>


    <h2>Exemple</h2>
    <code>
        <pre>
Exemple de fichier Sten
+ by Florian Dupeyron
+ u https://mugcat.fr/projects/sten
    Première idée
    | Sous-titre / Description
        [c] Un peu de code
        |[
            #include &lt;iostream&gt;

            int main( int argc, char * argv[] )
            {
                std::cout &lt;&lt; "Hello world !" &lt;&lt; std::endl;
                return 0;
            }
        |]

        Une liste non ordonnée
            * Item 1
            * Item 2
            * Item 3

        Une liste ordonnée
            ) Item 1
            ) Item 2
            ) Item 3
        </pre>
    </code>

    <h2>Manuel</h2>
    <p>
        À l'heure actuelle, je peaufine les éléments de la première version du langage.
        Quand cela sera fait, j'écrirai un manuel exhaustif détaillant son utilisation.
    </p>

    <h2>Parser</h2>
    <p>
        À l'heure actuelle, je prototype un parser python trouvable à <a href="#">cette adresse</a>.
        Le but est d'arriver à tester et ajuster les différentes fonctionnalités du langage. Cet utilitaire
        permet pour l'instant d'exporter le fichier en mind-map freemind.

        Le but est de pouvoir à la fin faire un outil de visualisation en temps réel de la hiérarchie des notes :
        on édite le fichier avec son éditeur de texte favori, et l'arbre affiché est mis à jour à chaque enregistrement.
    </p>
</main-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Provide } from 'vue-property-decorator'

import mainWrapper from 'components/main-wrapper.vue'

@Component({
    components : { mainWrapper }
})
export default class Home extends Vue {
}
</script>

const portfolio_items = [
    {
        id   : "mugcat",
        date : new Date( "12-00-2017" ),
        img  : "mugcat",

        lang : {
            "fr" : {
                name : "mugcat.fr",
                desc : {
                    "short" : "Réalisation de mon site personnel",
                    "long"  : "<p>Site réalisé avec l'aide de <a href='https://vuejs.org' target='_blank'>VueJS</a>, attiré principalement par la structuration en composants et les fonctionnalités apportées (router, transitions entre autres). Le résultat peut-être cependant encore grandement amélioré, notamment au niveau de la gestion des routes/contenu des pages/prérendu qui est pour l'instant complètement manuelle, ainsi que certaines parties du codes un peu bidouillées (gestion du scroll vers l'ancre sélectionnée notamment).</p><p>J'ai pour l'instant choisi vue et non pas React ni Angular pour sa simplicité de mise en place, et le format monofichier .vue qui fait la distinction entre la template, le code et l'apparence. Cela ne m'empêche pas d'apprendre React pour l'avoir dans ma boîte à outils.</p><p>Pour l'animation des triangles en fond, j'utilise <a href='https://github.com/yahiko00/delaunay' target='_blank'>cette implémentation</a> de la triangulation de Delaunay. Un de mes objectifs est de réimplémenter cet algorithme à des fins pédagogiques.</p><p>Il n'y a également pas de tests unitaires dans les sources car pour l'instant le code est très simple, mais c'est au programme ! :p</p>"
                },

                url : {
                    demo   : "https://mugcat.fr/fr",
                    source : "https://github.com/fdmysterious/mugcat/"
                }
            }
        }
    },

    {
        id   : "ballinatone",
        date : new Date( "12-20-2017" ),
        img  : "ballinatone",

        lang : {
            "fr" : {
                name : "Ballinatone, démo simple d'une appli webaudio",
                desc : {
                    "short" : "Exercice autour de l'api webaudio pour l'université, le but étant de présenter le tout de manière originale.",
                    "long"  : "<p>Dans cet exercice, il fallait utiliser l'API webaudio pour montrer qu'on avait compris comment s'en servir. Cherchant une manière originale de présenter le tout, voici ce que j'ai obtenu : on place des balles sonores en appuyant sur <kbd>g</kbd>, et on place ensuite des balles rebondissantes en appuyant sur <kbd>f</kbd>, qui viennent trigger les balles sonores lorsqu'elles passent dessus.</p><p>Différents paramètres sont contrôlables, et tous sont par défaut déterminés de manière aléatoire. Pour la hauteur de la note jouée, différentes échelles musicales sont disponibles pour apporter de l'harmonie à la génération effectuée.</p><p>Il est enfin possible d'enlever un objet en cliquant dessus. Il est possible d'effacer tout l'écran en appuyant sur <kbd>r</kbd>."
                },
                
                url : {
                    demo   : "https://demos.mugcat.fr/ballinatone",
                    source : "https://github.com/fdmysterious/mugcat-demos/tree/master/ballinatone/"
                }
            }
        }
    }
]

export default portfolio_items;

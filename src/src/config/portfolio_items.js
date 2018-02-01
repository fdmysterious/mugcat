const portfolio_items = [
    {
        id   : "mugcat",
        date : new Date( "12-01-2017" ),
        img  : "mugcat",

        lang : {
            "fr" : {
                name : "mugcat.fr",
                desc : {
                    "short" : "Réalisation de mon site personnel",
                    "long"  : "<p>Site réalisé avec <a target='_blank' href='https://vuejs.org'>VueJS</a>, attiré par la structuration en composants et les possibilités de dynamisation. Prenait part tout de même à une démarche expérimentale, visant à déterminer s'il est possible de faire un site web cohérent avec cet outil. Pour l'instant, la réponse est non : code source un peu ambigu par endroit, pas de chargement dynamique des pages pour l'instant (tout le contenu du site est dans le js), quelques fonctionnalités utiles manquantes (scroll vers l'ancre d'une page).</p><p>C'est donc une solution satisfaisante pour un petit site interactif comme celui-ci, mais très loin d'être parfaite.</p>"
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

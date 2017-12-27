import VueRouter from 'vue-router'

import PageHome      from "../pages/fr/home.vue";
import PageAbout     from "../pages/fr/about.vue";
import PageSten      from "../pages/fr/sten.vue";

import PagePortfolio from "../pages/portfolio.vue";
import PagePortfolioItem  from "../pages/portfolio-item.vue";

import PageError from "../pages/error.vue";
import portfolio_items from "./portfolio_items";

const langs = [ "fr" ] // Supported langs

export const routes = [
    { "path" : "/fr"                    , component : PageHome       , name : "home"        , icon : "home"     , text : "Accueil"  , menuShow : false, meta : { title : "Accueil : Much meow !"} },
    { "path" : "/fr/about"              , component : PageAbout      , name : "about"       , icon : "user"     , text : "À propos" , menuShow : true , meta : { title : "À propos de Florian Dupeyron"} },
    { "path" : "/fr/projects/sten"      , component : PageSten       , name : "project-sten", icon : "cogs"     , text : "Sten"     , menuShow : true , meta : { title : "Sten − Outil de prise de notes hiérarchiques"} },
    { "path" : "/fr/portfolio"       , component   : PagePortfolio, name : "portfolio"   , icon : "picture-o", text : "Portfolio", menuShow : true , meta : { title : "Portfolio de Florian Dupeyron", lang:"fr"} },
    { "path" : "/fr/error/:error_num"   , component   : PageError    , meta : { title : "Une erreur est survenue ! :'(" }, menuShow : false },
    { "path" : "/fr/about#contact"      , redirection : true         , name : "contact"     , icon : "envelope" , text : "Contact"  , menuShow : true }
];

function add_portfolio_routes( rts ) {
    for( let idx in portfolio_items ) {
        let obj = portfolio_items[idx];
        if(obj) {
            for( let lang in obj.lang ) {
                rts.push({
                    "path"      : `/${lang}/portfolio/${obj.id}`,
                    "component" : PagePortfolioItem,
                    "menuShow"  : false,
                    "meta"      : { obj, title : obj.lang[lang].name, lang }
                });

                console.debug(`Added path : /${lang}/portfolio/${obj.id}`)
            }
        }
    }

    return rts;
}

function filter_routes( routes ) {
    let r = [];
    for( let i in routes ) {
        if( !routes[i].redirection ) {
            r.push( routes[i] );
        }
    }

    r.push( { path : "*", redirect : "/fr/error/404" } )
    r.push( { path : "/", redirect : "/fr" } )
    return r;
}

const routes_final = filter_routes( add_portfolio_routes( routes ) );


// WARNING ! Awful piece of code that comes here.
// I hate this hacky way of handling the scroll to anchor, got
// to find a better way I hope.
export const scroll_handler = {
    hash    : "",

    resolve : null,
    reject  : null,

    handle() {
        if( scroll_handler.resolve ) {
            console.debug("Resolving scroll");
            
            let resolve = scroll_handler.resolve;
            scroll_handler.resolve = null;
            scroll_handler.reject  = null;

            resolve( scroll_handler.hash && document.querySelector(scroll_handler.hash) ? { selector : scroll_handler.hash } : false );
        }
    }
}

const router = new VueRouter({
    mode   : "history",
    routes : routes_final,

    // https://stackoverflow.com/questions/40341939/how-to-create-anchor-tags-with-vue-router
    // https://router.vuejs.org/en/advanced/scroll-behavior.html
    // https://github.com/vuejs/vue-router/blob/dev/examples/scroll-behavior/app.js
    scrollBehavior( to, from, savedPosition ) {
        return new Promise( function(resolve, reject) {
            if( to.hash && document.querySelector( to.hash ) ) {
                resolve( { selector : to.hash } );
            }

            else {
                scroll_handler.hash    = to.hash;
                scroll_handler.resolve = resolve;
                scroll_handler.reject  = reject;
            }
        });
    }
})

function filter_title( t ) {
    return `${t} − Mugcat`
}

router.beforeEach( ( to, from, next ) => {
    document.title = filter_title( to.meta.title );
    next();
});

console.log( routes );
export default router;

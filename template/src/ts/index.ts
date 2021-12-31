/******************************
 * Mugcat main source file :D *
 ******************************/
// Florian Dupeyron (floolfy)
// August 2018

import Header    from "./components/header";

import triangles from "./lib/triangles";
import * as ajax from "./ajax";

import * as ajaxifier from "./ajaxifier";

var motd = " __  __                       _      __      \n|  \\/  |                     | |    / _|     \n| \\  / |_   _  __ _  ___ __ _| |_  | |_ _ __ \n| |\\/| | | | |/ _` |/ __/ _` | __| |  _| '__|\n| |  | | |_| | (_| | (_| (_| | |_ _| | | |   \n|_|  |_|\\__,_|\\__, |\\___\\__,_|\\__(_)_| |_|   \n               __/ |\n              |___/   By Florian Dupeyron (floolfy)\n";
 
declare global {
    interface Window {
        components : {
            triangles : any,
            header    : any
        }
        ajax       : any
        ajaxifier  : any
    }
}

window.addEventListener( 'load', () => {
    window.components = Object();
    window.ajax       = ajax;
    window.ajaxifier  = ajaxifier;

    // Adding components
    window.components.header = new Header( <HTMLElement>document.getElementsByTagName("header")[0] );

    console.log(motd);

    console.info( "Init triangles background" );
    window.components.triangles = triangles( <HTMLElement>( document.getElementsByClassName("main-background")[0]) );

    console.info( "Init ajaxifier" );
    ajaxifier.init();
})

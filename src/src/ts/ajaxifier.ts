/********************************
 * Various functions to ajaxify *
 * that beautiful website !     *
 ********************************/
// Florian Dupeyron (floolfy)
// September 2018

import * as ajax     from "./ajax";
import * as histhelp from "./histhelp";

// Various status vars //
export let enabled                       = false;
export let wrapper         : HTMLElement =  null;
export let scripts_wrapper : HTMLElement = null;
// End of section //

////////////////////////////////
// TODO // REMOVE THAAAAAAT
////////////////////////////////
//interface HighlightStatic {
//    highlightBlock( block : Element ) : void;
//}
//
//declare var hljs : HighlightStatic; // Fuck that shit
//////////////////////////////////

declare global {
    interface Window {
        page_loaded : () => void
    }
}

// Some utils //
let reg_link_internal = /(https:\/\/mugcat.fr\/)|\/?.*$/;
// End of setion //

function prepareToDie( el : any )
{
    el.classList.add("mod_leave");
    setTimeout( () => { el.remove(); }, 200 );
}

export function load( url : string )
{
    let rr = new ajax.Req();

    rr.callbacks.done = ( resp : any ) => {
        let body    = resp.response.body.getElementsByClassName("dynamic-wrapper")[0];

        if(body) {
            ajaxify( body );

            // Evaluate scripts
            let scripts = body.getElementsByTagName("script");
            for( let i = 0 ; i < scripts.length ; i++ ) {
                console.info("Found dynamic script");
                let sc = <HTMLScriptElement>scripts[i];
                eval( sc.text );
            }

            // Set doc title
            document.title = resp.response.title;

			// FIX // 2021-12-31: use children instead of childNodes to exclude text nodes
			// https://www.typescriptlang.org/docs/handbook/dom-manipulation.html
			let i = wrapper.children.length;
			while(i--) {
				let ch = wrapper.children[i];
				prepareToDie(ch);
			}

			// Detach objects from imported body and insert into current dynamic wrapper
			i = body.children.length;
			while(i > 0) {
				let ch = body.removeChild(body.children[0]);
				<HTMLElement>ch.classList.add("mod_enter");

				wrapper.appendChild(ch);
				setTimeout(function() {
                    <HTMLElement>this.classList.remove("mod_enter");
				}.bind(ch), 200);

				i = body.children.length;
			}

            if( window.page_loaded ) window.page_loaded();
        }

        else { 
            console.error( "Could not find dynamic wrapper :(" );
        }
    };

    rr.html( url );
}

export function init() : void
{
    enabled         = ajax.supported() && histhelp.supported();
    wrapper         = <HTMLElement>( document.getElementsByClassName( "dynamic-wrapper" )[0] );

    if(!wrapper) {
        console.error("Could not find dynamic wrapper");
        enabled = false;
    }

    // Configure history handlers
    if( enabled ) {
        window.addEventListener( 'popstate', () => { load( window.location.toString() ); } );
    }


    // Firstly, ajaxify all body
    ajaxify( document.body );
    if(window.page_loaded) window.page_loaded();
}

export function ajaxify( blck : HTMLElement )
{
    let links = blck.getElementsByTagName( "a" );

    for( let i = 0 ; i < links.length ; i++ ) {
        let a = <HTMLAnchorElement>( links[i] );

        if( (a.hostname == location.hostname) && (a.target !== "_blank") && (!a.hasAttribute("noajax"))) {
            console.debug("Found internal link", a );

            a.onclick = ( ev ) => {
                ev.preventDefault();

                history.pushState( {}, "", a.href );
                load( a.href );
            }
        }
    }
}

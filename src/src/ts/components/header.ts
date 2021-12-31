/****************************************
 * Happy flavor for header manipulation *
 ****************************************/
// Florian Dupeyron (floolfy)
// September 2018

export default class Header
{
    dom = {
        main     : HTMLElement = null,
        main_nav : HTMLElement = null
    };

    unfold_height : number = 0;

    constructor( dom : HTMLElement )
    {
        if(!dom) {
            console.error("No header");
            return;
        }

        this.dom.main     = dom;
        this.dom.main_nav = <HTMLElement>dom.getElementsByClassName("main-nav")[0];

        if(!this.dom.main_nav) {
            console.error("Could not find main nav");
        }

        else {
            this.unfold_height = this.dom.main_nav.innerHeight;
            console.log(" => unfold menu height", this.unfold_height );
        }
    }

    menu_hide() { this.dom.main_nav.classList.add   ("mod_hidden"); }
    menu_show() { this.dom.main_nav.classList.remove("mod_hidden"); }
}

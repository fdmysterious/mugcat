/***************
 * info module *
 ***************
 Author      // Florian Dupeyron (Floolfy)
 Description // Retrieve info about user browser
*/

export namespace view {
    export function width() : number {
        return window.innerWidth;
    }

    export function height() : number {
        return window.innerHeight;
    }

    export function scroll() : number {
        // http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
        let r = NaN;
        //return window.scrollY;

        if( typeof(window.pageYOffset ) == 'number' ) {
            r = window.pageYOffset;
        }

		else if (document.body && document.body.scrollTop ) {
			r = document.body.scrollTop;
		}

		else if( document.documentElement && document.documentElement.scrollTop ) {
			r = document.documentElement.scrollTop;
		}

        return r;
    }
}

/****************
 * AJAX helpers *
 ****************/
// Florian Dupeyron (floolfy)
// September 2018

export class Req
{
    // Callbacks
    public callbacks = {
        done     : ( resp : any    ) => { console.info ( "XHR Done"   , resp ); }, // TODO // Type
        err      : ( ev   : any    ) => { console.error( "XHR Error"  , ev   ); }, // TODO // Type
                                        
        progress : ( prog : number ) => { console.info( "XHR Progress", prog ); }
    };

    private xhr : XMLHttpRequest;

    ////////////////////////

    constructor()
    { 
        // Creating XHR
        this.xhr = new XMLHttpRequest;

        this.xhr.onload     = ( resp : any ) => { this.callbacks.done( resp.target ); }
        this.xhr.onprogress = ( ev   : any ) => {
            if( ev.lengthComputable ) {
                this.callbacks.progress( ev.loaded / ev.total );
            }

            else {
                console.warn("Could not compute xhr progress");
                this.callbacks.progress( NaN );
            }
        }

        this.xhr.onerror    = ( ev : any ) => { this.callbacks.err( ev.target.status ); }
    }

    html( url : string )
    {
        this.xhr.responseType = "document";
        this.xhr.open( "GET", url, true );
        this.xhr.send( null );
    }
};

////////////////////////
// Various utils
////////////////////////

export function supported() : boolean
{
    // TODO // Improve shit

    try {
        if(!XMLHttpRequest) throw false;
    }

    catch( e ) {
        return false;
    }

    return true;
}

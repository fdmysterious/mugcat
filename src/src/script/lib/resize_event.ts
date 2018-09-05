/****************************
 * Optimized resize handler *
 ****************************
 Author      : Florian Dupeyron (Floolfy)
 Description : Optimized resize event handler
*/
 // Note // https://developer.mozilla.org/de/docs/Web/Events/resize
// TODO // More consistent structure with class ?

const resize_event = (function() {
    const handle_time = 66; // Time before calling requestAnimationFrame in ms

    var callbacks : Array< () => void > = [];
    let running   = false;

    let callback_timeout : number;

    function handle() {
        if( running && callback_timeout ) clearTimeout( callback_timeout );
        running = true;
        callback_timeout = setTimeout( () => {
            requestAnimationFrame( run_callbacks );
        }, handle_time );
    }

    function run_callbacks() {
        running = false;
        for( let i = 0 ; i < callbacks.length ; i++ ) {
            callbacks[i]();
        }
    }

    function register( c : () => void ) {
        callbacks.push( c );
    }

    function add( clbk : () => void) : void {
            if(!callbacks.length) window.addEventListener("resize", handle );
            register( clbk )
    }

    add( () => {
        console.debug( "Got new window size : ", { width : window.innerWidth , height : window.innerHeight });
    });
    return { add }
})();

export default resize_event;

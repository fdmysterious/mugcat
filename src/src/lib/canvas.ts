/*************
 * canvas.ts *
 *************
 Author      : Florian Dupeyron (Floolfy)
 Description : Manages canvas 
 */

import resize_event from 'lib/resize_event';

export default class Canvas
{
    // DOM Elements //
    dom : {
        wrapper : HTMLElement,
        canvas  : HTMLCanvasElement
    }

    ctx     : CanvasRenderingContext2D;
    // End of section //

    // State properties //
    size : {
        width  : number,
        height : number
    } = { width : 0, height : 0 }
    // End of section //

    // Callbacks //
    public callbacks : {
        resize : () => void,
        draw   : () => void
    }
    // End of section //

    constructor( wrapper : HTMLElement )
    {
        // Construct DOM //
        this.dom = {
            wrapper,
            canvas : <HTMLCanvasElement>wrapper.getElementsByTagName("canvas")[0]
        };

        this.callbacks = {
            resize : function() {},
            draw   : function() {}
        }
        // End of section //

        // Construct size //
        this.size_update();
        // End of section //

        // get canvas context //
        this.ctx = <CanvasRenderingContext2D>this.dom.canvas.getContext("2d");
        // End of section //

        // registering resize event handler //
        // Note the usage of arrow fkt
        resize_event.add( () => {
            this.size_update();
        });
        // End of section //
    }

    size_update() : void
    {
        this.size = {
            width  : this.dom.wrapper.clientWidth,
            height : this.dom.wrapper.clientHeight
        }

        this.dom.canvas.width = this.size.width  ;
        this.dom.canvas.height = this.size.height;

        this.callbacks.resize.call( this );
    }

    draw( tstamp ) : void
    {
        this.ctx.clearRect( 0, 0, this.size.width, this.size.height );

        this.ctx.save();
        this.callbacks.draw.call( this );
        this.ctx.restore();
    }
}

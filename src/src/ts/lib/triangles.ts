/***********************
 * triangles animation *
 ***********************
 Author      : Florian Dupeyron (Floolfy)
 Description : Triangle background animation generator
*/

import             './delaunay';
import Canvas from './canvas';

interface DelaunayStatic {
  triangulate(vertices: number[][], key?: number): number[];
} // DelaunayStatic

declare var Delaunay: DelaunayStatic;
export default function triangles( wrapper : HTMLElement )
{
    // Constants //
    const points_num   = 30;
    const extra_points = 5;
    const max_vel      = .2;
    // Fin de la section //

    // State //
    let animate = false;
    // End of section //

    let canvas = new Canvas(wrapper);

    // Points //
    let points     : number[][] = [];
    let velocities : number[][] = [];
    // End of section //

    function generate_points()
    {
        console.debug("Generating triangle points !");

        points     = [];
        velocities = [];

        for( let i = 0 ; i < points_num ; i++ ) {
            let p = [
                Math.random() * canvas.size.width,
                Math.random() * canvas.size.height
            ];
            points.push( p );

            let v = [
                Math.random() * 2 * max_vel - max_vel,
                Math.random() * 2 * max_vel - max_vel
            ];
            velocities.push( v );
        }

        for( let i = 0 ; i < extra_points ; i++ ) {
            // left
            points.push([ 0, (canvas.size.height / extra_points) * i ]);

            // Right
            points.push([ canvas.size.width, (canvas.size.height / extra_points) * i ]);

            // Top
            points.push([ (canvas.size.width / extra_points) * i, 0 ]);

            // Down
            points.push([ (canvas.size.width / extra_points) * i, canvas.size.height ]);
        }
    }

    function update_point( idx : number )
    {
        // Moving point //
        points[idx][0] += velocities[idx][0];
        points[idx][1] += velocities[idx][1];
        // End of section //

        // Check if in box //
        if( points[idx][0] < 0 ) {
            points[idx][0] = canvas.size.width;
            points[idx][1] = Math.random() * canvas.size.height;
            velocities[idx][0] = Math.random() * -max_vel;
        }
        else if( points[idx][0] > canvas.size.width ) {
            points[idx][0] = 0;
            points[idx][1] = Math.random() * canvas.size.height;
            velocities[idx][0] = Math.random() * max_vel;
        }

        if(points[idx][1] < 0 ) {
            points[idx][1] = canvas.size.height;
            points[idx][0] = Math.random() * canvas.size.width;
            velocities[idx][1] = Math.random() * -max_vel;
        }

        else if(points[idx][1] > canvas.size.height ) {
            points[idx][1] = 0;
            points[idx][0] = Math.random() * canvas.size.width;
            velocities[idx][1] = Math.random() * max_vel;
        }
        // End of section //
    }

    function draw_point( p : Array<number> )
    {
        canvas.ctx.fillStyle = "rgba(198, 147, 149, 0.5)";

        canvas.ctx.beginPath();
        canvas.ctx.arc( p[0], p[1], 10, 0, 2 * Math.PI );
        canvas.ctx.fill();
    }

    function draw_triangle( pts : Array<Array<number>> )
    {
        canvas.ctx.strokeStyle = "rgba(198, 147, 149, 0.05)";
        canvas.ctx.lineWidth   = 3;

        canvas.ctx.beginPath();
        canvas.ctx.moveTo( pts[0][0], pts[0][1] );
        canvas.ctx.lineTo( pts[1][0], pts[1][1] );
        canvas.ctx.lineTo( pts[2][0], pts[2][1] );
        canvas.ctx.stroke();
    }

    let triangle : number[][] = [];
    function draw()
    {
        for( let i = 0 ; i < points_num ; i++ ) {
            update_point( i );
        }

        try {
            let tgs = Delaunay.triangulate( points );
            for( let i = tgs.length ; i; ) {
                triangle[0] = points[ tgs[i-1] ];
                triangle[1] = points[ tgs[i-2] ];
                triangle[2] = points[ tgs[i-3] ];
                i -= 3;
                draw_triangle( triangle );
            }
        }
        finally{}
    }
    // End of section //

    // Canvas handle stuff & loop //
    canvas.callbacks.resize = () => {
        generate_points();
        requestAnimationFrame( loop );
    }
    // End of section //

    // Main loop stuff //
    canvas.callbacks.draw = () => {
        draw();
    }

    function loop( tstamp : number ) {
        canvas.draw( tstamp );
        if( animate ) requestAnimationFrame( loop ); // added this boolean as this animation consumes much CPU
    }
    generate_points();
    requestAnimationFrame( loop );
    // End of section //

    return {
        set_animate( v : boolean ) {
            console.debug("set animate", v );
            animate = v;
            if(animate) requestAnimationFrame( loop );
        }
    }
}

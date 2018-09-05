const path = require( "path" )
const fs   = require( "fs"   )

function dir_walk( dpath, res ) {
    files = fs.readdirSync( dpath )

    files.forEach( (file) => {
        let fpath = path.join( dpath, file )

        if( fs.statSync(fpath).isDirectory() ) {
            dir_walk( fpath, res )
        }
        
        else {
            res.push( fpath )
        }
    });
}

module.exports = {
    root    : path.resolve( path.join( __dirname, "../") ),
    resolve : to => {
        return path.join( module.exports.root, to )
    },

    build : env => {
        return module.exports.resolve( `dist/${env}` )
    },

    flist : ( path ) => {
        let r = [];
        dir_walk( path, r )
        return r
    },

    pages : () => {
        let src_path = module.exports.resolve("src/pages")
        let files    = module.exports.flist  ( src_path  )
        let r        = {}

        files.forEach( (fpath) => {
            if( path.extname( fpath ) == ".pug" ) {
                let fdest_name = path.basename( fpath, ".pug" ) + ".html"
                let fdest      = module.exports.resolve(
                    path.join(
                        "dist",
                        path.relative( src_path, path.dirname( fpath ) ),
                        fdest_name
                    )
                )

                r[ fdest ] = [ fpath ];
            }
        })

        return r
    },


   pages_out : () => {
        let src_path = module.exports.resolve("src/pages")
        let files    = module.exports.flist  ( src_path  )
        let r        = {}

        files.forEach( (fpath) => {
            if( path.extname( fpath ) == ".pug" ) {
                let fdest_name = path.basename( fpath, ".pug" ) + ".html"
                let fdest      = module.exports.resolve(
                    path.join(
                        "dist",
                        path.relative( src_path, path.dirname( fpath ) ),
                        fdest_name
                    )
                )

                r[ fdest ] = [ fdest ];
            }
        })

        return r
    }
}

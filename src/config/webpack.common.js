/******************************
 * Webpack common config file *
 ******************************

 Author      : Florian Dupeyron (My?terious)
 Description : Common config rules for webpack
*/

const path              = require('path');
const webpack           = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    path       : require( './path.js'  ),
    file_rules : require( './files.js' )
}

// Global config vars //
//const config = require( './config.js' );

module.exports = env => {

    return {
        entry    : config.path.resolve( 'src/main.ts' ),
        output   : {
            path       : config.path.build( env ),
            publicPath : '/',
            filename   : 'assets/js/[name].build.js'
        },

        /////////////////////////////////////////////////////////
        module: {
            //////////////////////////////////////////
            // Règles fichiers
            //////////////////////////////////////////
            rules : config.file_rules( env )
        },

        //////////////////////////////////////////
        // Règles resolve
        //////////////////////////////////////////
        resolve : {
            extensions : [
                ".webpack.js", ".web.js", ".ts", ".js", ".vue"
            ],

            alias : {
                'vue$'       : 'vue/dist/vue.esm.js',
                'assets'     : config.path.resolve("assets/"),
                'config'     : config.path.resolve("src/config/"),

                'pages'      : config.path.resolve("src/pages/"),
                'components' : config.path.resolve("src/components/"),
                'lib'        : config.path.resolve("src/lib/")
            }
        },

        ////////////////////////////////////////////
        //// Options développement
        ////////////////////////////////////////////
        //devServer : {
        //    historyApiFallback : true,
        //    noInfo             : true
        //},

        performance : {
            hints : false
        },

        devtool : '#eval-source-map',

        plugins : [
            new CopyWebpackPlugin([
                { from : config.path.resolve("src/lib/delaunay/index.js"), to : "delaunay.js"          },
                { from : config.path.resolve("assets/img/portfolio")     , to : "assets/img/portfolio" },
                { from : config.path.resolve("assets/img/cats")          , to : "assets/img/cats"      }
            ])
        ]
    }
}

/*********************************
 * Webpack prod env. config file *
 *********************************

 Author      : Florian Dupeyron (My?terious)
 Description : Prod. config rules for webpack
*/

const path    = require("path")
const merge   = require('webpack-merge')
const webpack = require('webpack')

const config = {
    path : require( './path.js' )
}
const config_common = require( './webpack.common.js')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const ExtractTextPlugin  = require('extract-text-webpack-plugin')

const PrerenderSpaPlugin = require('prerender-spa-plugin')

// Routes to render //
// TODO // Automate this stuff
const render_routes = [
    "/",
    "/fr",
    "/fr/about",
    "/fr/projects/sten",
    "/fr/portfolio",
    "/fr/portfolio/ballinatone",

    "/fr/error/404",
    "/fr/error/500"
];
// End of section //

module.exports = merge( config_common('prod'), {
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug   : false
        }),

        new webpack.DefinePlugin({
            'precess.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle  : {
                screw_ie8  : true,
                keep_fnames: false
            },

            compress: {
                screw_ie8  : true
            },
            comments: false
        }),

        new ExtractTextPlugin( 'assets/css/style.css', { allChunks : true } ),

        new HtmlWebpackPlugin({
            template : `html-loader!pug-html-loader!${config.path.resolve("index.pug")}`,
            inject   : 'body',
            chunks   : ['main']
        }),

        new PrerenderSpaPlugin(
            config.path.build( 'prod' ),
            render_routes
        )
    ],

    devtool : '#source-map'
});

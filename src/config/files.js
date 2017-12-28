const config = {
    path : require( "./path.js" )
}

const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )

//////////////////////////////////////////
// Rule generator functions
//////////////////////////////////////////
const generate = {
    scss : {
        loaders : env => {
            const common =  [
                { loader : "css-loader"   },

				{
					loader  : "postcss-loader",
					options : {
						config  : {
							path : config.path.conf( "postcss.config.js" )
						}
					}
				},

                {
                    loader  : "better-sass-loader",
                    options : {
                        includePaths : [
                            config.path.resolve( "" ) // Source path
                        ]
                    }
                },

                {
                    loader  : "sass-resources-loader",
                    options : {
                        resources : [ config.path.resolve( "src/style/libs.scss" ) ]
                    }
                }
            ]

            if(env === "prod") {
                return ExtractTextPlugin.extract({
                    fallback : 'vue-style-loader',
                    use      : common
                })
            }

            else {
                return [{loader : "vue-style-loader"}].concat( common );
            }
        },

        file_rule : env => {
            return {
                test : /\.scss$/,
                use  : generate.scss.loaders( env )
            }
        }
    },
//////////////////////////////////////////
    pug : {
        loaders : env => {
            return [
                { loader : 'raw-loader'      },
                { loader : 'pug-html-loader' }
            ]
        },

        file_rule : env => {
            return {
                test   : '/\.pug$/',
                use    : generate.pug.loaders( env )
            }
        }
    },
//////////////////////////////////////////
    vue : {
        loaders : env => {
            return "vue-loader";
            
        },

        file_rule : env => {
            return {
                test    : /\.vue$/,
                loader  : generate.vue.loaders( env ),
                options : {
                    loaders : {
                        'scss' : generate.scss.loaders()
                    },

                    extractCSS : env === "production"
                }
            }
        }
    },
//////////////////////////////////////////
    js : {
        loaders : env => {
            return "babel-loader"
        },

        file_rule : env => {
            return {
                test    : /\.js$/,
                loader  : generate.js.loaders( env ),
                exclude : /node_modules/
            }
        }
    },
//////////////////////////////////////////
    ts : {
        loaders : env => {
            return "ts-loader"
        },

        file_rule : env => {
            return {
                test    : /\.ts$/,
                loader  : generate.ts.loaders( env ),
                exclude : /node_modules|vue\/src/,
                options : {
                    appendTsSuffixTo : [/\.vue$/]
                }
            }
        }
    },
//////////////////////////////////////////
    asset  : {
        loaders : env => {
            return "file-loader"
        }
    },

    images : {
        file_rule : env => {
            return {
                test   : /\.(png|jpg|gif|svg)$/,
                loader : generate.asset.loaders( env ),
                
                options : {
                    name : 'assets/img/[name].[hash].[ext]'
                }
            }
        }
    },

    fonts : {
        file_rule : env => {
            return {
                test     : /\.(ttf|woff2?|otf|eot)$/,
                loader   : generate.asset.loaders( env ),
                options  : {
                    name : 'assets/font/[name].[ext]'
                }
            }
        }
    }
}

module.exports = env => {
    return [
        generate.js.file_rule( env ),
        generate.ts.file_rule( env ),
        generate.pug.file_rule( env ),
        generate.scss.file_rule( env ),
        generate.vue.file_rule( env ),
        generate.images.file_rule( env ),
        generate.fonts.file_rule( env )
    ]
}

// Config variables

const config = {
    path : require( "./config/path.js" )
}
const path = require("path")

module.exports = function(grunt) {

    grunt.initConfig({
        ///////////////////////////////
        // Style rules
        ///////////////////////////////
        sass: {         
            dist: {      
                options: {
                    style: 'expanded'
                },

                files: {
                   "dist/main.css" : config.path.resolve( "src/style/index.scss" )
                }
            }
        },

        postcss : {
            dist : {
                src  : config.path.resolve( "dist/main.css" ),
            },

            options : {
                processors : [
                    require('autoprefixer')({ browsers : ["> 50%", "Last 2 versions"] }),
					require('postcss-flexibility')(),
                    require('cssnano')()
                ]
            }
        },

        ///////////////////////////////
        // Pug rules
        ///////////////////////////////
        pug : {
            compile : {
                options : {
                    data : {
                        debug : false // TODO // Add debug features ?
                    }
                },

                files : config.path.pages()
            },
        },

        ///////////////////////////////
        // Highlight code
        ///////////////////////////////
        highlight : {
            task : {
                options : {},
                files   : config.path.pages_out()
            }
        },

        ///////////////////////////////
        // TS rules
        ///////////////////////////////
        browserify : {
            buildTypescript : {
                options : {
                    preBundleCB : function( bundle ) {
                        bundle.plugin( 'tsify', {
                            basePath : config.path.resolve( "src/script" ),
                            module   : "none",
                            target   : "es5",
                            allowSyntheticDefaultImports : true,

                            references : [
                                "es2015",
                                "dom"
                            ]
                        });
                    },

                    browserifyOptions : {
                        debug : true
                    }
                },

                files : {
                    "dist/index.js" : config.path.resolve( "src/script/index.ts" )
                }
            }
        },

        ///////////////////////////////
        // Assets
        ///////////////////////////////
        copy : {
            main : {
                expand : true,
                cwd    : config.path.resolve("src/assets"),
                src    : "**",
                dest   : config.path.resolve("dist/assets/")
            }
        },

        ///////////////////////////////
        // Dev server
        ///////////////////////////////
        connect : {
            server: {
                options  : {
                    port : 8080,
                    base : config.path.resolve("dist"),
                    livereload : true
                }
            }
        },

        ///////////////////////////////
        // Watch !
        ///////////////////////////////
        watch: {
            conf : {
                files : [ 'gruntfile.js' ]
            },

            css : {
                files : [ config.path.resolve( 'src/style/**/*.scss' ) ],
                tasks : [ 'sass', 'postcss' ]
            },

            html : {
                files : [ config.path.resolve( 'src/**/*.pug' ) ],
                tasks : [ 'pug' ]
            },

            js : {
                files : [ config.path.resolve( 'src/script/**/*.ts' ) ],
                tasks : [ 'typescript' ]
            },

            livereload : {
                options : { livereload : true },
                files   : [ config.path.resolve("dist/**/*") ]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-highlight'   );

    grunt.registerTask( 'typescript', 'browserify:buildTypescript' );
    grunt.registerTask( 'generate', [ 'copy', 'sass', 'postcss', 'pug', 'highlight', 'typescript' ] )
    grunt.registerTask( 'serve', [ 'generate', 'connect', 'watch' ] );

    grunt.registerTask( 'default' , 'default' );
};

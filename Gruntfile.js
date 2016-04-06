'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically.
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times.
    require('time-grunt')(grunt);

    // Configurable paths.
    var config = {
        assets: 'assets',
        bower: 'assets/bower_components',
        dist: 'public/includes'
    };

    // Define the configuration for all the tasks.
    grunt.initConfig({

        // Project settings.
        pkg: grunt.file.readJSON('package.json'),
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= config.assets %>/scripts/{,*/}*.js'],
                tasks: ['jshint', 'concat']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%= config.assets %>/styles/{,*/}*.less'],
                tasks: ['less', 'newer:concat:css', 'cssmin']
            }
        },

        // Parse Less CSS file
        less: {
            dist: {
                files: {
                    '<%= config.assets %>/styles/vendor/bootstrap.css': '<%= config.bower %>/bootstrap/less/bootstrap.less'
                }
            }
        },

        // Empty folders to start fresh.
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.assets %>/scripts/{,*/}*.js'
            ]
        },

        // Concat tasks.
        concat: {
            vendorcss: {
                src: [
                    '<%= config.assets %>/styles/vendor/bootstrap.css',
                    '<%= config.bower %>/select2/select2.css',
                    '<%= config.bower %>/select2-bootstrap-css/select2-bootstrap.css',
                ],
                dest: '<%= config.dist %>/styles/vendor.css'
            },
            css: {
                src: [
                ],
                exclude: [
                    '<%= config.dist %>/styles/vendor.css',
                ],
                dest: '<%= config.dist %>/styles/app.css'
            },
            vendorjs: {
                src: [
                    '<%= config.bower %>/jquery/dist/jquery.min.js',
                    '<%= config.bower %>/bootstrap/js/dropdown.js',
                    '<%= config.bower %>/bootstrap/js/button.js',
                    '<%= config.bower %>/select2/select2.min.js',
                    '<%= config.bower %>/jquery.payment/lib/jquery.payment.js',
                ],
                dest: '<%= config.dist %>/scripts/vendor.js'
            },
            appjs: {
                src: [
                    '<%= config.assets %>/scripts/{,*/}*.js',
                ],
                exclude: [
                    '<%= config.dist %>/scripts/vendor.js',
                ],
                dest: '<%= config.dist %>/scripts/app.js'
            },
        },

        // Minimize styles. We are going to concat every css file in
        // dist and make it a single file.
        cssmin: {
            dist: {
                files: {
                    '<%= config.dist %>/styles/app.css': [
                        '<%= config.dist %>/styles/app.css'
                    ],
                    '<%= config.dist %>/styles/vendor.css': [
                        '<%= config.dist %>/styles/vendor.css'
                    ]
                }
            }
        },

        // Minimize scripts.
        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/scripts/app.js': [
                        '<%= config.dist %>/scripts/app.js'
                    ],
                    '<%= config.dist %>/scripts/vendor.js': [
                        '<%= config.dist %>/scripts/vendor.js'
                    ]
                }
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            dist: [
                'imagemin',
                'svgmin'
            ]
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.assets %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.assets %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'less:dist',
        'concat',
        'cssmin',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
};

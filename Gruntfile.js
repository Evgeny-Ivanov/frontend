module.exports = function (grunt) {

    grunt.initConfig({
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'java -cp L1.2-1.0-jar-with-dependencies.jar main.Main 8080'
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,

                    cwd: 'templates',/* исходная директория */
                    src: '*.xml',/* имена шаблонов */
                    dest: 'public_html/js/tmpl'/* результирующая директория */
                }],
                options: {
                    template: function (data) {/* формат функции-шаблона */
                        return grunt.template.process(/* присваиваем функцию-шаблон переменной */
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    livereload: true
                }
            }
        },
        concurrent: {
            target: [ 'watch','shell'],
            options: {

                logConcurrentOutput: true /* Вывод процесса */
            }
        },

        // настройка jshint для валидации JS-файлов
        jshint: {
            options: {
                reporter: require('jshint-stylish') // используйте jshint-stylish для наглядного представления ошибок
            },

            // при запуске этой задачи анализируется файл Gruntfile.js и все JS-файлы в src
            build: [
                'Gruntfile.js', 
                'public_html/js/*.js',
                'public_html/js/views/*.js',
                'public_html/js/collections/*.js',
                'public_html/js/models/*.js'
            ]

        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');

    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('default', ['concurrent']);

};
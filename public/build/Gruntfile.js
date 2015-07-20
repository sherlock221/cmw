/**
 * cicada 构建部署
 * @param grunt
 */

module.exports = function(grunt){

    var script = require('grunt-cmd-transport/tasks/lib/script').init(grunt);


    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.initConfig({
        clean: ['tmp/**'],
        transport: {
            options: {
                debug: false,
                include: 'all',
                paths: ['../lib/js/cmd/']
                //alias: aliasInfo
            },

            //提取lib的类库
             lib: {
                options: {
                    //module_id
                    idleading: 'js/cmd/'
                },
                files: [{
                    cwd: '../lib/js/cmd/',
                    src: '**/*',
                    filter: 'isFile',
                    expand: true,
                    dest: 'tmp'
                }]
            }
        },
        concat: {
            options: {
                include: 'all',
                noncmd: true //忽略非cmd模块
            },
            //合并cicada_lib
            cicada_lib: {

                //src: ['tmp/**/*.js'],
                src: ['tmp/cicada/**/*.js'],
                dest: '../dist/template/cicada_lib.js'
            },

            //合并mobile任务
            //包含 dom选择 ＋ 触摸库 + cicada常用类库
            mb_base : {
                src: [
                    'tmp/core/zepto/1.1.6/zepto.js',
                    'tmp/core/hammer/hammer.min.js',
                    'tmp/core/hammer/jquery.hammer.js',
                    'tmp/cicada/**/*.js'
                ],
                dest: '../dist/template/mb_base.js'
            },

            //h5宣传
            "education_effect" :{
                src: [
                    '../education/lib/pre/loader.min.js',
                    '../education/lib/effect/vivus.min.js',
                    '../education/lib/zp/fastclick.min.js',
                    '../education/lib/zp/interact-1.2.4.min.js',
                    '../education/lib/zp/zepto.min.js'
                ],
                dest: '../dist/education/effect.min.js'

            },

            //任务列表
            task_list:{
                src: [
                    'tmp/core/template/artTemplate/template-native.js',
                    '../task/js/task-list.js',
                ],
                dest: '../dist/task/js/task-list.js'
            }

        },
        uglify: {
            mb_base: {
                src: ['../dist/template/mb_base.js'],
                dest: '../dist/template/mb_base.min.js'
            },
            cicada_lib: {
                src: ['../dist/template/cicada_lib.js'],
                dest: '../dist/template/cicada_lib.min.js'
            },

            //任务列表
            task_list:{
                src: [
                    '../dist/task/js/task-list.js'
                ],
                dest: '../dist/task/js/task-list.min.js'
            }


        }
    });

    //grunt.registerTask('default', ['clean', 'transport', 'concat',  'uglify', 'clean']);
    //grunt.registerTask('default', ['clean', 'transport']);

    //仅cicada
    grunt.registerTask('cicada', ['clean', 'transport:lib',"concat:cicada_lib","uglify:cicada_lib"]);

    //mobile 基本类库
    grunt.registerTask('mb_base', ['clean', 'transport:lib',"concat:mb_base","uglify:mb_base"]);

    //任务列表
    grunt.registerTask('task_list', ['clean', 'transport:lib',"concat:task_list","uglify:task_list"]);

    //教育
    grunt.registerTask('education', ["concat:education_effect"]);


};
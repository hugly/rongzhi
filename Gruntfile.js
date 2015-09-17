module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    //清除build
    time: Date.now(),
    //编译less文件
    less: {
      options:{
        cleancss: true,
        Choices: 'gzip',
        paths:'style/',
        ieCompat: true,
        banner:'/*\n@ project:<%=pkg.name%>\n@ date:<%=grunt.template.today("yyyy-mm-dd")%>\n*/'
      },
      build: {
        files: {
          'style/css/reset.min.css': 'style/less/reset.less',
          'style/css/common.css': 'style/less/common.less',
          'style/css/HL.Rec.min.css': 'style/less/HL.Rec.less',
          'style/css/ZH.CW.min.css': 'style/less/ZH.CW.less',
          'style/css/HL.News.min.css': 'style/less/HL.News.less',
          'style/css/HL.Message.min.css': 'style/less/HL.Message.less',
          'style/css/ZH.CW_Survey.min.css': 'style/less/ZH.CW_Survey.less',
          'style/css/ZH.CW_Survey_two.min.css': 'style/less/ZH.CW_Survey_two.less',
          'style/css/ZH.CW.Notice.min.css': 'style/less/ZH.CW.Notice.less',
          'style/css/ZH.CW_Vote.min.css': 'style/less/ZH.CW_Vote.less',
          'style/css/ZH.CW_Vote_two.min.css': 'style/less/ZH.CW_Vote_two.less',
          'style/css/ZH.CW_Vote_three.min.css': 'style/less/ZH.CW_Vote_three.less'


        }
      }
    },
    includereplace: {
        html: {
            src: ['main/*'],
            dest: 'dist/',
            expand: true,
            cwd: 'html'
        }
    },
      //监听端口
    connect: {
      options: {
        expand: true, 
        port: 9527,
        hostname: 'localhost', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
        livereload: 3577  //声明给 watch 监听的端口
      },
      server: {
        options: {                    
          open: true, //自动打开网页 http://
          base: [
            ''  //主目录                  
          ]                
        }
      }
    },

    //监听变化
    watch: {
      livereload:{
        options: {
          expand: true, 
          spawn: false,
          open: true,
          livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
        },
        files: [  //下面文件的改变就会实时刷新网页
          'html/main/*.html',
          'style/{,*/}*.{png,jpg,gif,css,less}',
          'js/{,*/}*.js'
          //'app/images/{,*/}*.{png,jpg}'
        ]
      },
      less: {
        files: '*.less',
        tasks: ['less:build'],
        options:{
          cwd: 'style/less/',
          spawn: false
        }
      },
      html: {
          files:'*.html',
          tasks:['includereplace:<%=action%>'],
          options:{
              cwd: 'html/',
              spawn: false
          }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('default', [ 'less:build','includereplace:html','watch']);
  //,'connect:server'

};

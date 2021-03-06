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
          'style/css/ZH.CW_Rec.min.css': 'style/less/ZH.CW_Rec.less',
          'style/css/ZH.CW.min.css': 'style/less/ZH.CW.less',
          'style/css/HL.News.min.css': 'style/less/HL.News.less',
          'style/css/HL.min.css': 'style/less/HL.less',
          'style/css/HL.Message.min.css': 'style/less/HL.Message.less',
          'style/css/ZH.CW_Survey.min.css': 'style/less/ZH.CW_Survey.less',
          'style/css/ZH.CW_Survey_two.min.css': 'style/less/ZH.CW_Survey_two.less',
          'style/css/ZH.CW.Notice.min.css': 'style/less/ZH.CW.Notice.less',
          'style/css/ZH.CW_Vote.min.css': 'style/less/ZH.CW_Vote.less',
          'style/css/ZH.CW_Vote_two.min.css': 'style/less/ZH.CW_Vote_two.less',
          'style/css/ZH.CW_Vote_three.min.css': 'style/less/ZH.CW_Vote_three.less',
          'style/css/ZH.CW_Rec_two.min.css': 'style/less/ZH.CW_Rec_two.less',
          'style/css/ZH.CW_Debate.min.css': 'style/less/ZH.CW_Debate.less',
          'style/css/ZH.CW_Debate_two.min.css': 'style/less/ZH.CW_Debate_two.less',
          'style/css/wz-list.min.css': 'style/less/wz-list.less',
          'style/css/wz-mymessage.min.css': 'style/less/wz-mymessage.less',
          'style/css/wz-mymessagedetail.min.css': 'style/less/wz-myssagedetail.less',
          'style/css/ZH.CW_Debate_three.min.css': 'style/less/ZH.CW_Debate_three.less',
          'style/css/ZH.CW_Finance.min.css': 'style/less/ZH.CW_Finance.less',
          'style/css/ZH.BM_CTicket.min.css': 'style/less/ZH.BM_CTicket.less',
          'style/css/ZH.BM_Pay.min.css': 'style/less/ZH.BM_Pay.less',
          'style/css/HL.BM_Doctor.min.css': 'style/less/HL.BM_Doctor.less',
          'style/css/wz-allexpert.min.css': 'style/less/wz-allexpert.less',
          'style/css/wz-expertdetail.min.css': 'style/less/wz-expertdetail.less',
          'style/css/lw-info.min.css': 'style/less/lw-info.less',
          'style/css/HL.BM_Huaxi.min.css': 'style/less/HL.BM_Huaxi.less',
          'style/css/HL.BM_Train.min.css': 'style/less/HL.BM_Train.less',
          'style/css/HL.BM_School.min.css': 'style/less/HL.BM_School.less',
          'style/css/ZH.CW_Apply.css': 'style/less/ZH.CW_Apply.less',
          'style/css/ZH.CW_Apply_me.css': 'style/less/ZH.CW_Apply_me.less',
          'style/css/ZH.CW_Apply_return.css': 'style/less/ZH.CW_Apply_return.less',
          'style/css/HL.BM_Government.min.css': 'style/less/HL.BM_Government.less',
          'style/css/lw-leftorright.min.css': 'style/less/lw-leftorright.less',
          'style/css/HL.BM_detailed.min.css': 'style/less/HL.BM_detailed.less',
          'style/css/lw-news.min.css': 'style/less/lw-news.less',
          'style/css/HL.BM_detailed_two.min.css': 'style/less/HL.BM_detailed_two.less',
          'style/css/HL.BM_Government_two.min.css': 'style/less/HL.BM_Government_two.less',
          'style/css/HL.BM_hospital.min.css': 'style/less/HL.BM_hospital.less',
          'style/css/HL.BM_Airplane_two.min.css': 'style/less/HL.BM_Airplane_two.less'

        }
      }
    },
    includereplace: {
        html: {
            src: ['main/hl/*','main/lw/*','main/wz/*','main/zh/*'],
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

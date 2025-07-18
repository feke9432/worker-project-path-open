export const treedata = [
  {
    label: '牛马列表',
    children: [
      {
        label: 'static-1.602.com',
        children: [
          {
            label: '游戏内sdk',
            url: 'D:/git_lib/v2_static',
            file: 'D:/git_lib/v2_static/602/gw/sdk-init.js',
            tips: '1. 360小游戏、页游、支付'
          }
        ]
      },
      {
        label: '页游',
        children: [
          {
            label: 'www.602.com',
            url: 'C:/laragon/www/www.602.com',
            tips: `1.官网，微端内嵌页，开服页 <br><br>
              2.绑定身份证弹框：/phpcms/templates/V3/member <br>
              //static-1.602.com/602/public/public-gw/js/GWic_extend.js <br><br>
              3. 360软管 <br>
                项目位置：/phpcms/templates/V3/game/mini_game_login_360.html<br>
                逻辑js：/v2_static/602/360minigame/static/js/loginPage.js`
          },
          {
            label: 'mg.602.com 子官网',
            url: 'D:/git_lib/v2_602com/mg.602.com',
            tips: '现在已经改为模板模式，模板在 default0 | default1 | default3 目录下'
          },
          {
            label: 'h5.602.com',
            url: 'D:/git_lib/h5.602.com',
            tasks: [
              {
                title: '1. 模拟器二维码支付',
                url: 'https://pubr20220701180911833.pingcode.com/pjm/workitems/fQIoiizC'
              }
            ]
          },
          {
            label: '668wan',
            url: 'D:/git_lib/www.shyaodong.net',
            tips: '1. 一个除了微端下载以外没有任何链接的首页，<br> 2. 微端下载等盼盼出，但大体格式是：<br> //down.602.com/wd/602soft/${当天日期}/${游戏简称}-ml.exe'
          }
        ]
      },
      {
        label: '手游',
        children: [
          {
            label: '小游戏',
            children: [
              {
                label: '微信小游戏',
                url: 'C:/Users/Administrator/Desktop/资料/手游sdk对接文档/微信小游戏/微信小游戏sdk'
              }
            ]
          },
          {
            label: '游戏盒子相关',
            children: [
              {
                label: '盒子 内 html 页面 以及 box.602.com 主页目录',
                url: 'D:/git_lib/v2_static/602/box.602.com'
              },
              {
                label: '盒子主体 vue 项目',
                url: 'D:/git_lib/box_vue',
                tips: '1. 打包后放在目录上一级'
              },
              {
                label: '盒子打包后文件覆盖到上层',
                switch: ['D:/git_lib/box_vue/dist', 'D:/git_lib/v2_static/602/gw/602yxbox']
              }
            ]
          },
          {
            label: 'h5 SDK',
            url: 'D:/git_lib/602_h5_sdk',
            tips: '1. 打包后存放在linkfast.602yx.com <br> 2. 依据git branch 管理不同平台 <br> 3. master ios | Juns => 安卓 | iosEmbeddedPage => ios 内嵌页面',
            children: [
              {
                label: 'ios 打包后覆盖到 linkfast.602yx.com 目录',
                tips: '1. linkfast.602yx.com ',
                switch: ['D:/git_lib/602_h5_sdk/dist', 'D:/git_lib/linkfast.602yx.com/jssdk']
              },
              {
                label: 'android 打包后覆盖到 linkfast.602yx.com 目录',
                tips: '1. linkfast.602yx.com ',
                switch: ['D:/git_lib/602_h5_sdk/dist', 'D:/git_lib/linkfast.602yx.com/ajssdk']
              }
            ]
          },
          {
            label: '页游助手（zs.602.com）',
            url: 'D:/git_lib/v2_602com/zs.602.com'
          }
        ]
      },
      {
        label: '落地页&聚合页',
        children: [
          {
            label: '本地开发',
            url: 'C:/Users/Administrator/Desktop/test_files/luodiye',
            tips: `本地anywhere服务器做测试开发，然后ftp上传服务器，上传后到火山清除缓存 <br>
            1. 落地页底部信息 <br>
              落地页ftp服务器目录：/js+flash/flash+js_1.01/js<br><br>
            2. 新增注册框 <br>
              注册框图片：C:/Users/Administrator/Desktop/注册框(2)<br>
              切图后丢到ftp服务器，目录：/js+flash/flash+js_1.01/images<br> <br>
            <a href="https://console.volcengine.com/cdn/refresh-warmup" target="_blank">跳转清除缓存页面</a>`
          },
          {
            label: '落地页 vue 后台',
            url: 'D:/git_lib/luodiye_vue'
          },
          {
            label: 'vue打包后放到 landing-page.602.com',
            switch: ['D:/git_lib/luodiye_vue/dist', 'D:/git_lib/landing-page.602.com/public/admin']
          }
        ]
      },
      {
        label: '广告后台',
        children: [
          {
            label: '新报表公共样式 ',
            url: 'D:/git_lib/shujujiance_vue/新报表公共样式/newReportStyle',
            tips: '页游推广活动详情 等 <br> router 中切换路由来换页面，需要修改路由配置，否则无法切换页面',
            children: [
              {
                label: '页游推广活动详情 打包后存放目录',
                // fileUrl: 'D:/git_lib/em.602.com/WebRoot/static/vue/report/overview',
                switch: [
                  'D:/git_lib/shujujiance_vue/新报表公共样式/newReportStyle/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/report/overview'
                ]
              },
              {
                label: '卡回传模板',
                switch: [
                  'D:/git_lib/shujujiance_vue/新报表公共样式/newReportStyle/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/cardReturn'
                ]
              },
              {
                label: 'ltv预估',
                switch: [
                  'D:/git_lib/shujujiance_vue/新报表公共样式/newReportStyle/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/report/ltvEstimate'
                ]
              },
              {
                label: 'ltv预估 mobile',
                switch: [
                  'D:/git_lib/shujujiance_vue/新报表公共样式/newReportStyle/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/report/ltvEstimateMobile'
                ]
              },
              {
                label: '苹果产品管理',
                switch: [
                  'D:/git_lib/shujujiance_vue/新报表公共样式/newReportStyle/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/iosproductmanager'
                ]
              },
              {
                label: '素材--落地页展示报表',
                switch: [
                  'D:/git_lib/shujujiance_vue/新报表公共样式/newReportStyle/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/landingPageStatistics'
                ]
              },
              {
                label: '素材--页游素材报表',
                switch: [
                  'D:/git_lib/shujujiance_vue/新报表公共样式/newReportStyle/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/newReportMatar'
                ]
              }
            ]
          },
          {
            label: '推广活动管理',
            url: 'D:/git_lib/shujujiance_vue/推广活动管理/promotion',
            tips: '',
            children: [
              {
                label: '推广活动管理 => 打包',
                switch: [
                  'D:/git_lib/shujujiance_vue/推广活动管理/promotion/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/promote/management'
                ]
              }
            ]
          },

          {
            label: '页游新后台',
            url: 'D:/git_lib/shujujiance_vue/页游报表/web-game-report',
            tips: '需要配置cookie，获取登录态'
          },
          {
            label: '推广素材报表 ',
            url: 'D:/git_lib/shujujiance_vue/广告素材/广告素材报表/materialIndex',
            children: [
              {
                label: 'yy素材报表 打包到位置',
                switch: [
                  'D:/git_lib/shujujiance_vue/广告素材/广告素材报表/materialIndex/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/sourceMaterial'
                ]
              }
            ]
          },
          {
            label: '素材报表 ',
            url: 'D:/git_lib/shujujiance_vue/广告素材/素材报表/list',
            children: [
              {
                label: '媒体素材报表 打包到位置',
                switch: [
                  'D:/git_lib/shujujiance_vue/广告素材/素材报表/list/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/yyMaterial'
                ]
              },
              {
                label: '素材报表 打包到位置',
                switch: [
                  'D:/git_lib/shujujiance_vue/广告素材/素材报表/list/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/materialList'
                ]
              }
            ]
          },
          {
            label: '手游投放素材库 ',
            url: 'D:/git_lib/shujujiance_vue/广告素材/投放素材库/list',
            children: [
              {
                label: 'yy素材报表 打包到位置',
                switch: [
                  'D:/git_lib/shujujiance_vue/广告素材/投放素材库/list/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/putMaterialLibrary'
                ]
              }
            ]
          },
          {
            label: '页游落地页素材库',
            url: 'D:/git_lib/shujujiance_vue/广告素材/落地页视频素材/list',
            children: [
              {
                label: 'yy素材报表 打包到位置',
                switch: [
                  'D:/git_lib/shujujiance_vue/广告素材/落地页视频素材/list/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/landing'
                ]
              }
            ]
          },
          {
            label: '页游视频素材库 ',
            url: 'D:/git_lib/shujujiance_vue/广告素材/落地页素材视频/list',
            children: [
              {
                label: 'yy素材报表 打包到位置',
                switch: [
                  'D:/git_lib/shujujiance_vue/广告素材/落地页素材视频/list/dist',
                  'D:/git_lib/em.602.com/WebRoot/static/vue/landingVideo'
                ]
              }
            ]
          }
        ]
      },
      {
        label: '聊天系统',
        children: [
          {
            label: '前端页面库',
            url: 'D:/git_lib/v2_static/ClientChat',
            tips: '客户，客服两边均使用此页面库，<br> 文件名加1标识测试页面'
          }
        ]
      },
      {
        label: '内部号平台',
        children: [
          {
            label: '前端vue项目',
            url: 'D:/git_lib/internal.602.com/resources/vue',
            tips: ''
          },
          {
            label: 'vue项目打包放到位置',
            switch: [
              'D:/git_lib/internal.602.com/resources/vue/dist',
              'D:/git_lib/internal.602.com/public/admin'
            ]
          }
        ]
      },
      {
        label: '工单后台',
        children: [
          {
            label: '前端页面',
            url: 'D:/git_lib/workordersystem.602.com/work-order-system',
            tips: 'vben admin 框架二次开发，使用 apps/web-antd 目录下的代码'
          },
          {
            label: '服务器',
            url: 'D:/git_lib/workordersystem.602.com/work-order-service',
            tips: '上传至ftp 服务器，目录：/www/wwwroot/work-order-service'
          }
        ]
      }
    ]
  }
]

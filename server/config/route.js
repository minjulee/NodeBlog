var requireDirectory = require('require-directory');
var controller = requireDirectory(module, '../controllers');

module.exports = [
    controller.post.index,
    controller.post.posts,
    {
        method:"GET",
        path:"/",
        handler : function(request, reply){
            reply.view("index", {
                title : "시작페이지"
            });
        }
    },
    {
        method : "GET",
        path: "/test",
        config: controller.test.index
    },
    controller.fileManager.dirInfo,
    controller.fileManager.test,
    /*
         기타 파일 설정
     */
    {
        method: 'GET',
        path: '/img/{path*}',
        config: controller.assets.img
    },
    {
        method: 'GET',
        path: '/css/{path*}',
        config: controller.assets.css
    },
    {
        method: 'GET',
        path: '/js/{path*}',
        config: controller.assets.js
    },
    {
        method: 'GET',
        path: '/angular/{path*}',
        config: controller.assets.angular
    },
    {
        method: "GET",
        path: "/plugin/{path*}",
        config: controller.assets.plugin
    },
    {
        method: 'GET',
        path: '/fonts/{path*}',
        config: controller.assets.fonts
    }
];

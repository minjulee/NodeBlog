var requireDirectory = require('require-directory');
var controller = requireDirectory(module, '../controllers');

module.exports = [
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
    /*
         정적 컨텐츠 파일 라우팅 설정
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
        path: '/fonts/{path*}',
        config: controller.assets.fonts
    },
    /*
        오류 페이지 처리
     */
    {
        method: '*',
        path: '/{path*}', // catch-all path
        handler : function(request, reply){
            reply.view("404", {
                title : "Total Bummer 404 Page"
            }).code(404);
        }
    }
];

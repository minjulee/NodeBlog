var requireDirectory = require('require-directory');
var controller = requireDirectory(module, '../controllers');

module.exports = [
    {
        method:"GET",
        path:"/",
        handler : function(request, reply){
            reply.view("index", {
                title : "����������"
            });
        }
    },
    {
        method : "GET",
        path: "/test",
        config: controller.test.index
    },
    /*
         ���� ������ ���� ����� ����
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
        ���� ������ ó��
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

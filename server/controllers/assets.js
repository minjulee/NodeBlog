/**
 * Created by ABC on 2015-08-28.
 */
/*
    �̹���, ��ũ��Ʈ, ��Ÿ�� ���� ��
 */
var normalPath = "public/src/";
var distPath = "public/dist/";
module.exports = {
    img: {
        handler: { directory: { path: normalPath + "img" } },
        id: 'img'
    },
    css: {
        handler: { directory: { path: distPath + "css" } },
        id: 'css'
    },
    js: {
        handler: { directory: { path: distPath +  "js" } },
        id: 'js'
    },
    fonts: {
        handler: { directory: { path: normalPath + "fonts" } },
        id: 'fonts'
    }
}
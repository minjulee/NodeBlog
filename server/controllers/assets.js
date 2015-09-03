/**
 * Created by ABC on 2015-08-28.
 */
/*
    이미지, 스크립트, 스타일 파일 등
 */
module.exports = {
    img: {
        handler: { directory: { path: "public/img" } },
        id: 'img'
    },
    css: {
        handler: { directory: { path: 'public/css' } },
        id: 'css'
    },
    js: {
        handler: { directory: { path: 'public/js' } },
        id: 'js'
    },
    fonts: {
        handler: { directory: { path: 'public/fonts' } },
        id: 'fonts'
    }
}
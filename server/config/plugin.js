/**
 * Created by ABC on 2015-08-28.
 */
var goodOptions = {
    opsInterval: 5000,
    reporters: [{
        reporter: require('good-console'),
        events: { response: '*', log: '*' }
    }]
};
var server = reqlib("/server");

// load multiple plugins
require("typescript-require")
server.register([
    {
        register: require("good"),
        options: goodOptions
    },
    {
        register: require("hapi-assets"),
        options: settings.asset
    },
    require("hapi-named-routes"),
    require("hapi-cache-buster"),
    require("vision"),
    require("inert")
], function (err) {

    server.views({
        engines: {
            html: require("swig")
        },
        path: "././public/src/views"
    });

    if (err) {
        console.error('Failed to load a plugin:', err);
        throw err;
    }
});
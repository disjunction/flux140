/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'jquery-ui': {
            exports: '$',
            deps: ['jquery', 'bootstrap-dropdown']
        },
    },
    paths: {
        jquery: '../components/jquery/jquery',
        'jquery-ui': 'vendor/jquery-ui/js/jquery-ui-1.10.2.custom',
        backbone: '../components/backbone-amd/backbone',
        underscore: '../components/underscore-amd/underscore',
        'bootstrap-dropdown': '../components/bootstrap/js/bootstrap-dropdown',
        templates: 'templates/compiled',
    }
});


/* Define our globals */
// performance.now is available in Chrome stable, Firefox 15+, and IE10.
if (!window.performance) {
    // Opera, for example
    window.performance = {
        now: function () {return '';}
    };
}
function log(text) {
    console.log(window.performance.now() + ': ' + text);
}
log('Logging initialized.'); // To suppress "never used" linter warning.
// Application namespace.
// Initialization happens lazily later.
window.App = {
    Models: {
        App: null,
        Gallery: null,
    },
    Views: {
        App: null,
        Gallery: null,
    },
    Collections: {
    },
};

require([
    'backbone',
    'routes/application-router',
], function (Backbone, Router) {
    window.App.Router = new Router();
    Backbone.history.start();
});


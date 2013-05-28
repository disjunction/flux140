/*global define,log*/

define([
    'views/imageStack-view',
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function (ImageStackView, $, _, Backbone, JST) {
    'use strict';

    var ImageStackDetailView = ImageStackView.extend({
        template: JST['app/scripts/templates/imageStack-detail.ejs'],
        tagName: 'div',
        className: '',
        events: {
            'click': function () {
                // Navigate to gallery view.
                window.App.Router.navigate(
                    'gallery/' +
                    window.App.Models.App.get('pit') + '/' +
                    window.App.Models.App.get('browser'),
                    {trigger: true});
            }
        },
    });

    return ImageStackDetailView;
});

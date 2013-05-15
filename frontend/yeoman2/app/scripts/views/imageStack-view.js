/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ImageStackView = Backbone.View.extend({
        template: JST['app/scripts/templates/imageStack.ejs'],
        tagName: 'li',
        className: 'span3',
        model: null,
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            // Getting 'ere.
            this.$el.html(
                this.template({
                    'src': this.model.get('images').at(0).get('src')
                })
            );
            return this;
        }
    });

    return ImageStackView;
});

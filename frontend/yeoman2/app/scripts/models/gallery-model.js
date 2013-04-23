/*global define*/

define([
    'underscore',
    'backbone',
    'collections/imageStacks-collection',
], function (_, Backbone, ImageStacksCollection) {
    'use strict';

    var GalleryModel = Backbone.Model.extend({
        defaults: {
            browser: null,
            imageStacks: new ImageStacksCollection()
        }
    });

    return GalleryModel;
});
/*global define,log*/

define([
    'jquery-ui',
    'underscore',
    'backbone',
    'templates',
    'views/time-slider',
    'models/application-model',
], function ($, _, Backbone, JST, TimeSlider, AppModel) {
    'use strict';

    var ApplicationView = Backbone.View.extend({
        el: $('div.navbar'),
        template: JST['app/scripts/templates/application.ejs'],
        model: window.App.Models.App || (window.App.Models.App = new AppModel()),
        events: {
            'click #browsers .dropdown-menu a': function(eventObject) {
                window.App.Models.App.set('browser',
                    eventObject.currentTarget.innerText);
                eventObject.preventDefault();
            }
        },
        _updateNavViews: function () {
            var pit = window.App.Models.App.get('pit');
            $('#navbar-text-pit').val(pit);
            $('#timeSlider').slider('value', pit);
            Backbone.history.navigate(window.App.Views.current.calcUrl(),
                                    {trigger: false, replace: true});
        },
        initialize: function () {
            log('Init: application-view.');

            window.App.Views.timeSliderView = new TimeSlider();

            this.listenTo(window.App.Models.App, 'change:pit', this._updateNavViews);
            $('#navbar-text-pit').keypress(function(e) {
                if (e.which === 13) { // 'Enter' button
                    window.App.Models.App.set('pit', e.currentTarget.value);
                }
            });
            $('#playButton').click(function(e) {
                e.preventDefault();
                setInterval(function() {
                    window.App.Models.App.set('pit',
                        window.App.Models.App.get('pit') + 1);
                }, 1000);
            });

            this.listenToOnce(window.App.Models.Gallery,
                'change:minPit, change:maxPit', function () {
                    $('#timeSlider').slider({
                        min: window.App.Models.Gallery.get('minPit'),
                        max: window.App.Models.Gallery.get('maxPit')
                    });
                }
            );

            this.listenToOnce(window.App.Models.App,
                'change:browsers', function (model, value, options) {
                    $('#browsers .dropdown-menu').html(
                        _.map(value, function (v) {
                            return '<li><a href="#">' + v + '</a></li>';
                        })
                    );
                }
            );

            this.listenTo(window.App.Models.App,
                'change:browser', function(model, value, options) {
                    $('#browsers .dropdown-toggle').html(
                        value + ' <b class="caret"></b>');
                }
            );
        },
        render: function () {
            log('Render: application-view');
            $('div.main').html(this.template());

            window.App.Views.timeSliderView.render();

            return this;
        }
    });

    log('Load: application-view.');

    return ApplicationView;
});


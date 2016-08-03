require.config({
    paths: {
        /* jQuery */
        'jquery': 'vendor/jquery',

        /* Foundation */
        'foundation.core': 'foundation/foundation',
        'foundation.abide': 'foundation/foundation.abide',
        'foundation.accordion': 'foundation/foundation.accordion',
        'foundation.alert': 'foundation/foundation.alert',
        'foundation.clearing': 'foundation/foundation.clearing',
        'foundation.dropdown': 'foundation/foundation.dropdown',
        'foundation.equalizer': 'foundation/foundation.equalizer',
        'foundation.interchange': 'foundation/foundation.interchange',
        'foundation.joyride': 'foundation/foundation.joyride',
        'foundation.magellan': 'foundation/foundation.magellan',
        'foundation.offcanvas': 'foundation/foundation.offcanvas',
        'foundation.orbit': 'foundation/foundation.orbit',
        'foundation.reveal': 'foundation/foundation.reveal',
        'foundation.tab': 'foundation/foundation.tab',
        'foundation.tooltip': 'foundation/foundation.tooltip',
        'foundation.topbar': 'foundation/foundation.topbar',

        /* Vendor Scripts */
        'jquery.cookie': 'vendor/jquery.cookie',
        'fastclick': 'vendor/fastclick',
        'modernizr': 'vendor/modernizr',
        'placeholder': 'vendor/placeholder',
        'knockout': 'vendor/knockout',

        /* Models */
        'tree-viewmodel': 'models/tree-viewmodel'
    },
    shim: {
        /* Foundation */
        'foundation.core': {
            deps: [
            'jquery',
            'modernizr'
            ],
            exports: 'Foundation'
        },
        'foundation.abide': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.accordion': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.alert': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.clearing': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.dropdown': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.equalizer': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.interchange': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.joyride': {
            deps: [
            'foundation.core',
            'foundation.cookie'
            ]
        },
        'foundation.magellan': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.offcanvas': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.orbit': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.reveal': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.tab': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.tooltip': {
            deps: [
            'foundation.core'
            ]
        },
        'foundation.topbar': {
            deps: [
            'foundation.core'
            ]
        },

        /* Vendor Scripts */
        'jquery.cookie': {
            deps: [
            'jquery'
            ]
        },
        'fastclick': {
            exports: 'FastClick'
        },
        'knockout': {
        	exports: 'Knockout'
        },
        'modernizr': {
            exports: 'Modernizr'
        },
        'placeholder': {
            exports: 'Placeholders'
        }
    }
});
require([
    'jquery',
    'app',
    'foundation.interchange',
    'foundation.tooltip'
], function ($, app) {
    $(document).foundation();

    app.init();
});
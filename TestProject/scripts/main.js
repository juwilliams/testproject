require.config({
    paths: {
        /* jQuery */
        'jquery': 'vendor/jquery',

        /* Foundation */
        'foundation': 'vendor/foundation',

        /* Vendor Scripts */        
        'what-input': 'vendor/what-input',
        'knockout': 'vendor/knockout',

        /* Models */
        'tree-viewmodel': 'models/tree-viewmodel',

        /* Personal */
        'qparser': 'qparser'
    },
    shim: {
        "foundation": {
            deps: [
                'jquery'
            ],
            exports: 'Foundation'
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
    'foundation'
], function($, app) {
    $(document).foundation();

    app.init();
});
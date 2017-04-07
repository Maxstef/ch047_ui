(function(global) {
    var map = {
        'app':      'temp',
        'rxjs':     'node_modules/rxjs',
        '@angular': 'node_modules/@angular',
        'lodash':   'node_modules/lodash/lodash.js',
        'moment':   'node_modules/moment/',
        'ng2-bootstrap': 'node_modules/ng2-bootstrap/',
        'moment/locale/uk': 'node_modules/moment/locale/uk.js'
    };

    var packages = {
        'app':  { main: 'main.js',  defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'ng2-bootstrap': {
            format: 'cjs', main: 'bundles/ngx-bootstrap.umd.js', defaultExtension: 'js'
        },
        'moment': {
            main: 'moment.js',
            defaultExtension: 'js'
        }
    };

    var angularPackages = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'forms'
    ];

    angularPackages.forEach(function(pkgName) {
        packages['@angular/' + pkgName] = {
            main: 'bundles/' + pkgName + '.umd.js',
            defaultExtension: 'js'
        };
    });

    var config = {
        map: map,
        packages: packages,
        meta: {
            lodash: { format: 'amd' }
        }
    };

    System.config(config);

})(this);

(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',

      // redux-beacon
      'redux-beacon': 'npm:redux-beacon/dist/redux-beacon.umd.js',
      'redux-beacon/targets/google-analytics': 'npm:redux-beacon/targets/dist/google-analytics.umd.js',
      'redux-beacon/extensions/logger': 'npm:redux-beacon/extensions/dist/logger.umd.js',

      // other libraries
      'rxjs': 'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ngrx-store-logger': 'npm:ngrx-store-logger/dist/index.js',
      '@ngrx/store': 'npm:@ngrx/store/bundles/store.umd.js',
      '@ngrx/router-store': 'npm:@ngrx/router-store/bundles/router-store.umd.js',
      '@ngrx/core': 'npm:@ngrx/core/bundles/core.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);

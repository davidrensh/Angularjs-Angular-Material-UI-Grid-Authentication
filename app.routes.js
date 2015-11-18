(function () {

  'use strict';

// Declare app level module which depends on filters, and services

  angular.module('myMenuApp', [
    'myMenuApp.controllers',
    'ngAnimate',
    'ui.router',
    'ngMaterial',
    'ngAria',

  ]).constant("authUrl", "http://localhost:41439/api/users")
    .config(function ($httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        //Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
.config(function ($mdIconProvider) {
    $mdIconProvider
      // linking to https://github.com/google/material-design-icons/tree/master/sprites/svg-sprite
      // 
      .iconSet('action', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24)
      .iconSet('alert', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-alert.svg', 24)
      .iconSet('av', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-av.svg', 24)
      .iconSet('communication', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-communication.svg', 24)
      .iconSet('content', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-content.svg', 24)
      .iconSet('device', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-device.svg', 24)
      .iconSet('editor', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-editor.svg', 24)
      .iconSet('file', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-file.svg', 24)
      .iconSet('hardware', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-hardware.svg', 24)
      .iconSet('image', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-image.svg', 24)
      .iconSet('maps', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-maps.svg', 24)
      .iconSet('navigation', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-navigation.svg', 24)
      .iconSet('notification', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-notification.svg', 24)
      .iconSet('social', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-social.svg', 24)
      .iconSet('toggle', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-toggle.svg', 24)

      // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
      .iconSet('avatars', 'https://raw.githubusercontent.com/angular/material/master/docs/app/icons/avatar-icons.svg', 24)
      .defaultIconSet('https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24);
})
    .config(function ($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('light-blue', {
          'default': '300'
        })
        .accentPalette('deep-orange', {
          'default': '500'
        });
    })
    .config(['$stateProvider', '$urlRouterProvider', '$logProvider', 
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/login");

        $stateProvider
          .state('home', {
              url: '/',
            authenticate: true,
              views: {
                  '@': {
                      templateUrl: 'home.view.html',
                      controller: 'HomeCtrl as vm'
                  }
              }
          })
          .state('home.gettingstarted', {
              url: '/',
              authenticate: true,
              views: {
                  '@': {
                      templateUrl: 'home.view.html',
                      controller: 'HomeCtrl as vm'
                  }
              }
          })
          .state("login", {
              url: '/login',
              templateUrl: "login.html",
              controller: 'authCtrl',
              authenticate: false
          })
          .state('home.main', {
              url: 'main',
              abstract: true,
              authenticate: true
          })
          .state('home.main.ipas', {
              url: '/ipas',
              authenticate: true,
              views: {

                  'content@home': {
                      templateUrl: 'beers.ipa.view.html'
                  }
              }
          })
                    .state('home.main.scorecard', {
                        url: '/scorecard',
                        //authenticate: true,
                        views: {

                            'content@home': {
                                templateUrl: 'scorecard.html'
                            }
                        }
                    })
                    .state('home.main.outofscope', {
                        url: '/outofscope',
                        authenticate: true,
                        views: {

                            'content@home': {
                                templateUrl: 'outofscope.html'
                            }
                        }
                    })
          .state('home.main.porters', {
              url: '/porters',
              authenticate: true,
              views: {

                  'content@home': {
                      templateUrl: 'beers.porters.view.html'
                  }
              }
          })
           .state('home.main.wheat', {
               url: '/wheat',
               authenticate: true,
               views: {

                   'content@home': {
                       templateUrl: 'beers.wheat.view.html'
                   }
               }
           }
          )
    }])
    //take all whitespace out of string
    .filter('nospace', function () {
      return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
      };
    })
    //replace uppercase to regular case
    .filter('humanizeDoc', function () {
      return function (doc) {
        if (!doc) return;
        if (doc.type === 'directive') {
          return doc.name.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
          });
        }
        
        return doc.label || doc.name;
      };
  });

})();
'use strict';
window.$ = window.jQuery = require('jquery');
window.angular = require('angular');
var ngAnimate = require('angular-animate');
var ngAnimate_inOut = require('angular-ui-router-anim-in-out');
var ngCookies = require('angular-cookies');
var ngResource = require('angular-resource');
var ngMessages = require('angular-messages');
var ngSanitize = require('angular-sanitize');
var ngTouch = require('angular-touch');
var uiRouter = require('angular-ui-router');


window.app = angular.module('myApp', [
    'ui.router',
    'ngCookies',
  ])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
    
  $stateProvider
    .state('main_public', {
      url: '/',
      authenticate: false,
      templateUrl: 'views/main_public.html',
      controller: 'MainPublicCtrl'
    })

    .state('main_public.create', {  
      url: 'create',
      authenticate: false,
      templateUrl: 'views/createAdmin.html',
      controller: 'AdminCtrl',
      controllerAs: 'admin'
    })

    .state('main_public.signin', {
      url: 'signin',
      authenticate: false,
      templateUrl: 'views/signinAdmin.html',
      controller: 'AdminCtrl',
      controllerAs: 'admin'
    })

    .state('main_private', {
        url: '/',
        authenticate: true,
        templateUrl: 'views/main_private.html',
        controller: 'MainPrivateCtrl'
    })

    .state('main_private.reports', {
      url: 'reports',
      authenticate: true,
      templateUrl: 'views/reports.html',
      controller: 'ReportsCrtl'
    })

    .state('main_private.jobs', {
      url: '/',
      authenticate: true,
      templateUrl: 'views/jobs.html',
      controller: 'JobsCrtl'
    })

    .state('main_private.properties', {
      url: '/',
      authenticate: true,
      templateUrl: 'views/properties.html',
      controller: 'PropertiesCtrl'
    })

    .state('main_private.workers', {
      url: '/',
      authenticate: true,
      templateUrl: 'views/workers.html',
      controller: 'WorkersCtrl'
    })        
});

require('./factories');
require('./controllers');
require('./directives');


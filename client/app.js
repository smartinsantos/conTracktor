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
    'ui.router'
  ])

.config(function($stateProvider, $urlRouterProvider) {
    
  $urlRouterProvider.otherwise('/');
    
  $stateProvider
      .state('home', {
          url: '/',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
      })
        
});

require('./factories');
require('./controllers');
require('./directives');


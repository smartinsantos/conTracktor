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
    'ngAnimate',
    'ngMessages'
  ]);

app.value('manager',{value:false});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
    
  $stateProvider
    .state('main_public', {
      url: '/',
      authenticate: false,
      templateUrl: 'views/main_public.html',
      controller: 'MainPublicCtrl',
      redirectTo: 'main_public.signin'
    })

    // .state('main_public.create', {  
    //   url: 'create',
    //   authenticate: false,
    //   templateUrl: 'views/createAdmin.html',
    // })

    .state('main_public.signin', {
      url: 'signin',
      authenticate: false,
      templateUrl: 'views/signinAdmin.html',
    })

    .state('main_private', {
        url: '/private/',
        authenticate: true,
        templateUrl: 'views/main_private.html',
        controller: 'MainPrivateCtrl',
        params:{sessionId:null}
    })

    .state('main_private.managers', {
        url: 'managers/',
        authenticate: true,
        templateUrl: 'views/managers.html',
        controller: 'AdminCtrl',
        params:{sessionId:null}
        
    })

    .state('main_private.managers_edit', {
        url: 'managers/{id}/edit/',
        authenticate: true,
        templateUrl: 'views/managers_edit.html',
        controller: 'AdminEditCtrl',
        params:{sessionId:null}
    })

    .state('main_private.manager_profile', {
        url: 'profile/{id}/edit/',
        authenticate: true,
        templateUrl: 'views/manager_profile.html',
        controller: 'AdminEditCtrl',
        params:{sessionId:null}
    })

    .state('main_private.reports', {
      url: 'areports/',
      authenticate: true,
      templateUrl: 'views/reports.html',
      controller: 'ReportsCtrl',
      params:{sessionId:null, currentStateData:null}
    })

    // .state('main_private.reports_manager', {
    //   url: 'meports/',
    //   authenticate: true,
    //   templateUrl: 'views/reports_manager.html',
    //   controller: 'ReportsCtrl',
    //   params:{sessionId:null, currentStateData:null}
    // })

    .state('main_private.jobs', {
      url: 'ajobs/',
      authenticate: true,
      templateUrl: 'views/jobs.html',
      controller: 'JobsCtrl',
      params:{sessionId:null}
    })

    .state('main_private.jobs_review', {
      url: 'ajobs/review/',
      authenticate: true,
      templateUrl: 'views/jobs_review.html',
      controller: 'JobsCtrl',
      params:{sessionId:null}
    })

    .state('main_private.jobs_create', {
      url: 'ajobs/create/',
      authenticate: true,
      templateUrl: 'views/jobs_create.html',
      controller: 'JobsCtrl',
      params:{sessionId:null}
    })

    .state('main_private.jobs_completed', {
      url: 'ajobs/completed/',
      authenticate: true,
      templateUrl: 'views/jobs_completed.html',
      controller: 'JobsCtrl',
      params:{sessionId:null, currentStateData:null}
    })


    .state('main_private.jobs_edit', {
      url: 'ajobs/{id}/edit/',
      authenticate: true,
      templateUrl: 'views/jobs_edit.html',
      controller: 'JobsEditCtrl',
      params: {sessionId:null}
    })

    .state('main_private.jobs_manager', {
      url: 'mjobs/',
      authenticate: true,
      templateUrl: 'views/jobs_manager.html',
      controller: 'JobsManagerCtrl',
      params:{sessionId:null}
    })
    //TODO
    .state('main_private.jobs_manager_completed', {
      url: 'mjobsc/',
      authenticate: true,
      templateUrl: 'views/jobs_manager_completed.html',
      controller: 'JobsManagerCtrl',
      params:{sessionId:null}
    })

    .state('main_private.jobs_manager_create', {
      url: 'mjobs/create/',
      authenticate: true,
      templateUrl: 'views/jobs_manager_create.html',
      controller: 'JobsManagerCtrl',
      params:{sessionId:null}
    })

    .state('main_private.jobs_manager_edit', {
      url: 'mjobs/{id}/edit/',
      authenticate: true,
      templateUrl: 'views/jobs_manager_edit.html',
      controller: 'JobsManagerEditCtrl',
      params:{sessionId:null}
    })

    .state('main_private.properties', {
      url: 'props/',
      authenticate: true,
      templateUrl: 'views/properties.html',
      controller: 'PropertiesCtrl',
      params:{sessionId:null}
    })

    .state('main_private.properties_edit', {
      url: 'props/{id}/edit/',
      authenticate: true,
      templateUrl: 'views/properties_edit.html',
      controller: 'PropertiesEditCtrl',
      params:{sessionId:null}
    })

    .state('main_private.workers', {
      url: 'worker/',
      authenticate: true,
      templateUrl: 'views/workers.html',
      controller: 'WorkersCtrl',
      params:{sessionId:null}
    })

    .state('main_private.workers_edit', {
      url: 'work/{id}/edit/',
      authenticate: true,
      templateUrl: 'views/workers_edit.html',
      controller: 'WorkersEditCtrl',
      params:{sessionId:null}
    })

});


app.run(['$rootScope', '$state','$stateParams', function($rootScope, $state, $stateParams) {
    //allows to redirect to sub state on load
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params)
      }
    });
    
    //allows to go to previous state
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
        // to be used for back button //won't work when page is reloaded.
        $rootScope.previousState_name = fromState.name;
        $rootScope.previousState_params = fromParams;
    });
    //back button function called from back button's ng-click="back()"
    $rootScope.back = function() {
        $state.go($rootScope.previousState_name,$rootScope.previousState_params);
    };
}]);


require('./directives');
require('./factories');
require('./controllers');


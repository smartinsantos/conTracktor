app.controller('MainPublicCtrl', ['$scope','$state','Auth', function($scope,$state,Auth) {
  
  // Redirect to appropriate main page
  // If logged in, go to main controller
  if (Auth.isLoggedIn()) {
    $state.go('main_private');
  // Else, go to the public landing page
  } else {
    $state.go('main_public.signin');
  }

}]);

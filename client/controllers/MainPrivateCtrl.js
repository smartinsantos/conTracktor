app.controller('MainPrivateCtrl', ['$scope','$state','Admin','Auth', function($scope,$state,Admin,Auth) {
  
  console.log('MainPrivateCtrl Loaded...');

  if (Auth.isLoggedIn()) {
    $state.go('main_private.dash');
  // Else, go to the public landing page
  } else {
    $state.go('main_public.signin');
  }

  $scope.adminSignOut = function () {
    Admin.signOut();
  };

}]);

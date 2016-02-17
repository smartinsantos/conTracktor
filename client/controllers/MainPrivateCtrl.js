app.controller('MainPrivateCtrl', ['$scope','$state','Admin','Auth','manager', function($scope,$state,Admin,Auth,manager) {
  console.log('MainPrivateCtrl Loaded...');
  console.log($state.params.id)
  if(Auth.isManager()){
  //if admin is manager we set the global value to true
    manager.value = true;
  };
  //variable shared across the app to identify managers from admins and to have a persistent ID of the user
  $scope.manager = manager.value
  
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

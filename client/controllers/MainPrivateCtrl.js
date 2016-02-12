app.controller('MainPrivateCtrl', ['$scope','$state','Admin', function($scope,$state,Admin) {
  
  console.log('MainPrivateCtrl Loaded...');

  $state.go('main_private.dash')

  $scope.adminSignOut = function () {
    Admin.signOut();
  };

}]);

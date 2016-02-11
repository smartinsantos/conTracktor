app.controller('MainPrivateCtrl', ['$scope','$state','Admin', function($scope,$state,Admin) {
  
  console.log('MainPrivateCtrl Loaded...');

  $scope.adminSignOut = function () {
    Admin.signOut();
  };

}]);

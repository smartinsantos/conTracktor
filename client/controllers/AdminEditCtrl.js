app.controller('AdminEditCtrl', ['$scope','Admin','$state', function($scope, Admin,$state) {
  
  console.log('AdminEditCtrl Loaded....')

  // Object for adding workers
  $scope.admin = {};

  $scope.backToManagers = function(){
    $state.go('main_private.managers');
  }

  $scope.getAdmin = function(){
  var adminId = $state.params.id;
    Admin.getOne(adminId)
    .then(function(res){
      $scope.admin = res.data;
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    }); 
  }

  $scope.editAdmin = function () {
    var adminInfo = $scope.admin;
    Workers.edit(adminInfo)
    .then(function(res){
      $state.go('main_private.managers');
    })
    .catch(function(err){
    console.log('error ocurred: ', err);
    })
  }

  $scope.getAdmin();
 
}]);

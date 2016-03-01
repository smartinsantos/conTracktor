app.controller('AdminCtrl', ['$scope','$state','Admin', function($scope,$state, Admin) {
  
  console.log('AdminCtrl Loaded....')
  //data of admin
  $scope.admin = {};
  $scope.admin.admin = false;
  //all admins
  $scope.admins = {};

  $scope.createAdmin = function () {
    var newAdmin = $scope.admin;
    Admin.create(newAdmin)
    .then(function(admin){
      //Work around to fix modal bug were still fading app after toggle
      $scope.backToAdmins();
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    });
  };

  $scope.getAdmins = function() {
    Admin.getAll()
    .then(function(admins){
      $scope.admins = admins;
    })
  };

$scope.backToAdmins = function() {
    //work around fading after toogle modal
    $('div.modal').removeClass('fade').addClass('hidden');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $state.reload('main_private.managers')
  };


  $scope.getAdmins();  
}]);

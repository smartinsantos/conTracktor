app.controller('AdminCtrl', ['$scope','Admin', function($scope, Admin) {
  
  console.log('AdminCtrl Loaded....')
  //data of admin
  $scope.admin = {};
  $scope.admin.admin = false;
  //all admins
  $scope.admins = '';

  $scope.createAdmin = function () {
    var newAdmin = $scope.admin;
    Admin.create(newAdmin)
    .then(function(admin){
      console.log('admin created: ', admin)
      //Work around to fix modal bug were still fading app after toggle
      $('div.modal').removeClass('fade').addClass('hidden');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      $scope.getAdmins(); 
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

  $scope.getAdmins();  
}]);

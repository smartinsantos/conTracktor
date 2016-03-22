app.controller('AdminCtrl', ['$scope','$state','Admin','Toastr', function($scope,$state, Admin, Toastr) {
  
  // console.log('AdminCtrl Loaded....')
  //data of admin
  $scope.admin = {};
  $scope.admin.admin = false;
  $scope.admin.access_disable = false;
  console.log($scope.admins)

  $scope.createAdmin = function () {
    var newAdmin = $scope.admin;
    Admin.create(newAdmin)
    .then(function(admin){
      //Work around to fix modal bug were still fading app after toggle
     if(admin===undefined){
      throw 'Error Ocurred - email has to be unique - check token!'
     }else{
      Toastr.success('Created!')
      $scope.getAdmins();      
      $scope.backToAdmins();
     }
    })
    .catch(function(err){
      Toastr.error(err)
      console.log('error ocurred: ', err);
    });
  };

  $scope.backToAdmins = function() {
    //work around fading after toogle modal
    $('div.modal').removeClass('fade').addClass('hidden');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $state.reload('main_private.managers')
  };
  
}]);

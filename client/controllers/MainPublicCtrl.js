app.controller('MainPublicCtrl', ['$scope','$state','Auth','Admin', function($scope,$state,Auth,Admin) {
  
  // Redirect to appropriate main page
  // If logged in, go to main controller
  if (Auth.isLoggedIn()) {
    $state.go('main_private');
  // Else, go to the public landing page
  } else {
    $state.go('main_public.signin');
  }

  $scope.admin = {};
  $scope.admin.admin = false;
  //all admins
  $scope.admins = '';

  $scope.createAdmin = function () {
    var newAdmin = $scope.admin;
    newAdmin.admin = true;
    Admin.create(newAdmin)
    .then(function(admin){
      console.log('admin created: ', admin)
      Admin.signIn(newAdmin);
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    });
  };

  $scope.signInAdmin = function () {
    var adminData = {};
    adminData.email = $scope.admin.email;
    adminData.password = $scope.admin.password;
    //send JSON object to server via factory call
    Admin.signIn(adminData)
    .then(function(res){
    })
    .catch(function (err) {
      console.log('Error with signin:', err);
    });
  };

}]);

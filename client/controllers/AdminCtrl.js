app.controller('AdminCtrl', ['$scope','Admin', function($scope, Admin) {
  
  console.log('AdminCtrl Loaded....')

  $scope.admin = {
    first: '',
    last: '',
    email: '',
    password: '',
    token:''
  };

  $scope.createAdmin = function () {
    var newAdmin = $scope.admin;
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
      console.log(res)
    })
    .catch(function (err) {
      console.log('Error with signin:', err);
    });
  };
  

}]);

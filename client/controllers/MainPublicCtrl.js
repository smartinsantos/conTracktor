app.controller('MainPublicCtrl', ['$scope','$state','Auth','Admin','$timeout', function($scope,$state,Auth,Admin,$timeout) {
  console.log('MainPublicCtrl loaded...')
  // Redirect to appropriate main page
  // If logged in, go to main controller
  if (Auth.isLoggedIn()) {
    $state.go('main_private');
  }; 

  $scope.admin = {};
  $scope.admin.admin = false;


  $scope.createAdmin = function () {
    var newAdmin = $scope.admin;
    newAdmin.admin = true;
    Admin.create(newAdmin)
    .then(function(admin){
      // Admin.signIn(newAdmin);
      $scope.signInAdmin();
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
    .then(function(response){
      //get the session Id and send it to the state
      var sessionId = Auth.sessionId();
      $timeout(() => {
        $state.go('main_private', {sessionId:sessionId}, { reload: true });
      }, 100);
    })
    .catch(function (err) {
      console.log('Error with signin:', err);
    });
  };

}]);

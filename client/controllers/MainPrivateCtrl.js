app.controller('MainPrivateCtrl', ['$scope','$state','Admin','Workers','Properties', 'Auth','manager', function($scope,$state,Admin,Workers,Properties,Auth,manager) {
  // console.log('MainPrivateCtrl Loaded...');
  //If parameter is not passed in garantees sessionId 
  $scope.sessionId = $state.params.sessionId || Auth.sessionId();

  // console.log('sessionId: ', $scope.sessionId);

  if(Auth.isManager()){
  //if admin is manager we set the global value to true
    manager.value = true;
  };
  //variable shared across the app to identify managers from admins and to have a persistent ID of the user
  $scope.manager = manager.value
  
  if (Auth.isLoggedIn()) {
    
    //get all properties 
      $scope.properties = [];

      $scope.getProperties = function() {
        Properties.getAll()
        .then(function(properties){
          $scope.properties = properties;
        })
      };

    //get all workers
      $scope.workers = [];

        $scope.getWorkers = function() {
          Workers.getAll()
          .then(function(workers){
            $scope.workers = workers;
          })
        };

      //load workers, properties
      $scope.getWorkers();
      $scope.getProperties();

    if($scope.manager===true){
      $state.go('main_private.jobs_manager', {'sessionId':$scope.sessionId});
    }else{
      
      //get all managers
      $scope.admins = [];

      $scope.getAdmins = function() {
        Admin.getAll()
        .then(function(admins){
          $scope.admins = admins;
        })
      };

      $scope.getAdmins();

      $state.go('main_private.jobs');
    }
  // Else, go to the public landing page
  } else {
    $state.go('main_public.signin');
  }

  $scope.adminSignOut = function () {
    Admin.signOut();
  };

}]);

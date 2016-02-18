app.controller('JobsCtrl', ['$scope','Jobs','Properties','Admin', function($scope, Jobs,Properties,Admin) {
  
  console.log('JobsCtrl Loaded....')

  $scope.jobs = {};
  $scope.job = '';
 
//get all managers
  $scope.admins = '';

  $scope.getAdmins = function() {
    Admin.getAll()
    .then(function(admins){
      $scope.admins = admins;
    })
  };

  $scope.getAdmins();

 //get all properties 
  $scope.properties = '';

  $scope.getProperties = function() {
    Properties.getAll()
    .then(function(properties){
      $scope.properties = properties;
    })
  };

  $scope.getProperties();

  $scope.createJob = function(){
    console.log('creating Job')
    console.log($scope.job);
  };

  $scope.getJobs = function(){
    console.log('getting Jobs');
  };

  $scope.getJobs();


}]);

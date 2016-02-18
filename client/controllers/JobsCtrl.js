app.controller('JobsCtrl', ['$scope','$state','Jobs','Properties','Admin', function($scope,$state, Jobs,Properties,Admin) {
  
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

  $scope.getJobs = function() {
    Jobs.getAll()
    .then(function(jobs){
      $scope.jobs = jobs;
    })
  };

  $scope.createJob = function () {
    var newJob = $scope.job;
    Jobs.create(newJob)
    .then(function(res){
      $('#jobModal').modal('toggle');
      $scope.getJobs();
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    });
  };


  $scope.getJobs();


}]);

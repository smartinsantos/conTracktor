app.controller('JobsCtrl', ['$scope','$state','Jobs','Properties','Admin','Workers', function($scope,$state, Jobs,Properties,Admin,Workers) {
  
  console.log('JobsCtrl Loaded....')


 
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

//get all workers
  $scope.workers = '';

    $scope.getWorkers = function() {
      Workers.getAll()
      .then(function(workers){
        $scope.workers = workers;
      })
    };

  $scope.getWorkers();


//CREATE JOBS
  $scope.jobs = {};
  $scope.job = '';

  $scope.createJob = function () {
    var newJob = $scope.job;
    Jobs.create(newJob)
    .then(function(res){
    
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    });
  };


//ADD SERVICES
$scope.services = [{id: 'service1'}];
  
  $scope.addNewService = function() {
    var newService = $scope.services.length+1;
    $scope.services.push({'id':'service'+newService});
  };
    
  $scope.removeChoice = function() {
    var lastService = $scope.services.length-1;
    $scope.services.splice(lastService);
  };




//refresh Jobs on Load on load
  $scope.getJobs();


}]);

app.controller('JobsCtrl', ['$scope','$state','Jobs','Properties','Admin','Workers','manager', function($scope,$state, Jobs,Properties,Admin,Workers,manager) {
  
  console.log('JobsCtrl Loaded....')
 
 $scope.filter = {};

//get all managers
  $scope.admins = [];

  $scope.getAdmins = function() {
    Admin.getAll()
    .then(function(admins){
      $scope.admins = admins;
    })
  };


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

  //load admins, properties
  $scope.getAdmins();
  $scope.getProperties();
  $scope.getWorkers();    
 
//CREATE JOBS
  $scope.jobs = [];
  $scope.job = {};

  $scope.getJobs = function() {
    Jobs.getAll()
    .then(function(jobs){
      $scope.jobs = jobs;
    })
  };

  $scope.getJobsIncompleted = function() {
    Jobs.getIncompleted()
    .then(function(jobs){
      $scope.jobs = jobs;
    })
  };

  $scope.getJobsCompleted = function() {
    Jobs.getCompleted()
    .then(function(jobs){
      $scope.jobs = jobs;
    })
  };

  $scope.createJob = function (option) {

    if($scope.job.services.length > 0){
      $scope.calculateTotalServicePrice();
    };
    if($scope.job.costs.length > 0 ){
      $scope.calculateTotalCost();
    };
    var newJob = $scope.job;
    Jobs.create(newJob)
    .then(function(res){
      //if created clean scope choose addother or goback
      if(res){
         $scope.job = {};   
        if(option === 'goBack'){
          //go to jobs
          $state.go('main_private.jobs');
        }else{
          //reload current and refresh scope
          $state.reload('main_private.jobs_create');
        }
      }else{
        // TODO display error message on dom
      }      
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    });
  };


//ADD-REMOVE SERVICES
$scope.job.services = [];
  
  $scope.addNewService = function() {
    var newService = $scope.job.services.length+1;
    $scope.job.services.push({});
  };
    
  $scope.removeService = function() {
    var lastService = $scope.job.services.length-1;
    $scope.job.services.splice(lastService);
  };

  $scope.calculateTotalServicePrice= function(){
    $scope.job.totalPrice = 0;
    $scope.job.services.forEach(function(e){
      $scope.job.totalPrice += e.price; 
    }); 
  };

//ADD-REMOVE COSTS
$scope.job.costs = [];
  
  $scope.addNewCost = function() {
    var newCost = $scope.job.costs.length+1;
    $scope.job.costs.push({});
  };
    
  $scope.removeCost = function() {
    var lastCost = $scope.job.costs.length-1;
    $scope.job.costs.splice(lastCost);
  };

  $scope.calculateTotalCost= function(){
    $scope.job.totalCost = 0;
    $scope.job.costs.forEach(function(e){
      $scope.job.totalCost += e.value; 
    }) 
  };

console.log($state.current)
//refresh Jobs on Load on load
  if ($state.current.name === 'main_private.jobs'){
    $scope.getJobsIncompleted();
  }else if ($state.current.name === 'main_private.jobs_completed'){
    $scope.getJobsCompleted();
  }

}]);

app.controller('JobsManagerCtrl', ['$scope','$state','Jobs','Properties','Workers','manager','Auth', function($scope,$state,Jobs,Properties,Workers,manager,Auth) {
  
  console.log('JobsManagerCtrl Loaded....')
  $scope.sessionId = $state.params.sessionId || Auth.sessionId();
 //filter object for job 'search'
  $scope.filter = {};

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

  //load properties, workers
  $scope.getProperties();
  $scope.getWorkers();    
 
//CREATE JOBS
  $scope.jobs = [];
  $scope.job = {};
  $scope.job.manager = $scope.sessionId;

  $scope.getManagerJobs = function() {
    Jobs.getAllManagerJobs($scope.sessionId)
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
        $scope.job.manager = $scope.sessionId;
        if(option === 'goBack'){
          //go to jobs
          $state.go('main_private.jobs_manager');
        }else{
          console.log('reloading state')
          //reload current and refresh scope
          $state.reload('main_private.jobs_manager_create');
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

//work around to clear the filter when worker does not exist
  $scope.clearFilter = function(){
    if($scope.filter.services.worker._id===''){
      delete($scope.filter.services);
    };
  };

  $scope.backToJobs = function(){
    $state.go('main_private.jobs_manager');
  };
//refresh Jobs on Load on load
  $scope.getManagerJobs();

}]);

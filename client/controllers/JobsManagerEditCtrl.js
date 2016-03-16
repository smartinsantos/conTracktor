app.controller('JobsManagerEditCtrl', ['$scope','$state','Jobs','Workers','Properties','Auth', function($scope,$state,Jobs,Workers,Properties,Auth) {
  
  // console.log('JobsManagerEditCtrl Loaded....')
  $scope.job = {};
//set manager 
  $scope.sessionId = $state.params.sessionId || Auth.sessionId();
  $scope.getJob = function(){
    Jobs.getOne($state.params.id)
    .then(function(job){
      $scope.job = job;
    })
  };

  $scope.getJob()

  $scope.editJob = function(){
    var jobInfo = $scope.job;
    Jobs.edit(jobInfo)
    .then(function(res){
      $state.go('main_private.jobs_manager');
    })
    .catch(function(err){
    console.log('error ocurred: ', err);
    })
  };

  $scope.deleteJob = function(){
    var jobId = $scope.sessionId;
    Jobs.deleteJob(jobId)
    .then(function(res){
      //Work around to fix modal bug were still fading app after toggle
      $('div.modal').removeClass('fade').addClass('hidden');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      $state.go('main_private.jobs');
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    }); 

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

//load admins, properties, workers on creating a job
  $scope.getProperties();
  $scope.getWorkers();    


//ADD-REMOVE SERVICES  

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
  $scope.addNewCost = function() {
    var newCost = $scope.job.costs.length+1;
    $scope.job.costs.push({});
  };
    
  $scope.removeCost = function() {
    var lastCost = $scope.job.costs.length-1;
    $scope.job.costs.splice(lastCost);
  };

  $scope.calculateTotalCost = function(){
    $scope.job.totalCost = 0;
    $scope.job.costs.forEach(function(e){
      $scope.job.totalCost += e.value; 
    }) 
  };

  $scope.backToJobs = function(){
    $state.go('main_private.jobs_manager');
  };


}]);

app.controller('JobsCtrl', ['$scope','$state','Jobs','Properties','Admin','Workers','manager', function($scope,$state, Jobs,Properties,Admin,Workers,manager) {
  
  console.log('JobsCtrl Loaded....')

 //filter object for job 'search'
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

  $scope.getJobsCompletedByDate = function(startDate,endDate) {
    Jobs.getCompletedByDate(startDate,endDate)
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

//send messages to workers from twilio service

$scope.sendServiceToWorker = function (job, service){
  // console.log('this is the service to be sent: ', service)
  // console.log('this is the propertie to be sent: ', job.propertie)
  var messageInfo = {};
      messageInfo.message = {};
      messageInfo.job = job;
      messageInfo.service = service;
  //message object to be sent 
  //date formating for better readability 
  var date = new Date(service.date_assigned)
  date = date.toString();
  date = date.slice(0,10) 
  //if there is a worker assigned to the service
  messageInfo.message.to = service.worker.phone;
  messageInfo.message.body = '';
    messageInfo.message.body += '   '+' TYPE: ' + service.item + '   '; 
    messageInfo.message.body += ' ADDRESS: ' + job.propertie.address.street + ' ' + job.propertie.address.city + ', ' + job.propertie.address.zip + + '   '
    messageInfo.message.body += ' PROPERTY: ' + job.propertie.name + '   ';
    messageInfo.message.body += ' UNIT: ' + job.unit + '   ';    
    messageInfo.message.body += ' DATE: ' + date + '   '; 
    if(service.description) {
      messageInfo.message.body += ' DESCRIPTION: ' + service.description + '   '; 
    };

  Workers.sendMessage(messageInfo)
  .then(function(resp){
    if(resp){
      //update notification data on db
      service.notification_sent = true;
      Jobs.edit(job);      
    }else{
      service.notification_sent = false;
    };
  });
};

//work around to clear the filter when worker does not exist
$scope.clearFilter = function(){
  if($scope.filter.services.worker._id===''){
    delete($scope.filter.services);
  };
};

//refresh Jobs on Load on load
  if ($state.current.name === 'main_private.jobs'){
    $scope.getJobsIncompleted();
  }else if($state.current.name === 'main_private.jobs_completed'){
    //default values for dates on state load
    $scope.endDate = new Date();
    $scope.startDate = new Date();
    $scope.startDate.setMonth($scope.startDate.getMonth() - 1);
  };

}]);

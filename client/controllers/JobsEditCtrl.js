app.controller('JobsEditCtrl', ['$scope','$state','Jobs','Admin','Properties','Workers', function($scope,$state,Jobs,Admin,Properties,Workers) {
  
  console.log('JobsEditCtrl Loaded....')

//get all managers
  $scope.admins = [];
  $scope.job = {};

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
      $state.go('main_private.jobs');
    })
    .catch(function(err){
    console.log('error ocurred: ', err);
    })
  };

  $scope.deleteJob = function(){
    var jobId = $state.params.id;
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

//load admins, properties, workers on creating a job
  $scope.getAdmins();
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

  $scope.calculateTotalCost= function(){
    $scope.job.totalCost = 0;
    $scope.job.costs.forEach(function(e){
      $scope.job.totalCost += e.value; 
    }) 
  };

//UPLOAD FILES
  $scope.getAwsUrl = function() {
    console.log('getting Url....')
    fileInfo = {};
    fileInfo.name = $scope.file.name;
    fileInfo.size = $scope.file.size;
    fileInfo.type = $scope.file.type;

    Jobs.getAwsUrl(fileInfo)
    .then(function(response){
     console.log('response.data: ', response.data)
      
      if (typeof response.data.signedRequest === 'undefined' || typeof response.data.url === 'undefined') {
        // This shouldnt happen
        console.log('SignedRequest or URL was undefined');
        return;
      }

      // In order for this to work, we must use the ol' fashion XMLHttpRequest object
      var xhr = new XMLHttpRequest();

      xhr.open('PUT', response.data.signedRequest);
      xhr.onload = function (e) {
        var amazonResult = e.response;
        if (xhr.status === 200) {
          var url = response.data.url
          // $scope.add(url);
        } else if (xhr.status === 403) {
          // Something was changed in the signed url, its not what the server signed
          // Amazon rejected the upload
        }
        // $scope.__log('Saved!');
        // $scope.closeAccordion();
      };

      xhr.onerror = function () {
        console.log('Error uploading file');
      };
      xhr.send($scope.file);
    })

  }


}]);

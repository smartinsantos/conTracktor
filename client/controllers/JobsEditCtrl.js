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

  $scope.uploadToS3 = function() {
    //sends a post to the server to get the signedUrl to upload file on client side 
    fileInfo = {};
    fileInfo.name = $scope.file.name;
    fileInfo.size = $scope.file.size;
    fileInfo.type = $scope.file.type;

    Jobs.getAwsUrl(fileInfo)
    .then(function(response){
      //response is an object with the signed url and url path to the file      
      if (typeof response.data.signedRequest === 'undefined' || typeof response.data.url === 'undefined') {
        // This shouldnt happen
        console.log('SignedRequest or URL was undefined');
        throw 'Failed to create signedRequest with AWS S3'
      }
      $scope.loading = true;
      $.ajax({
        url: response.data.signedRequest,
        type: 'PUT',
        data: $scope.file,
        processData: false,
        contentType: $scope.file.type,
      })
      .success(function(res){
        console.log('file ' + $scope.file.name + ' uploaded.');
        $scope.job.attachments.push({fileName:$scope.file.name, url:response.data.url})
        Jobs.edit($scope.job)
        .then(function(res){
          $scope.loading = false; 
        });
      });
    });
  };

  $scope.deleteAttachment = function (attachment){
    var idx = $scope.job.attachments.indexOf(attachment);
    $scope.job.attachments.splice(idx, 1);
      $.ajax({
        url: attachment.url,
        type: 'DELETE',
        // data: $scope.file,
        // processData: false,
        // contentType: $scope.file.type,
      })
      .success(function(res){
        console.log('job deleted from amazon!')
        Jobs.edit($scope.job)
        .then(function(res){
          console.log('job deleted')
        })
      });
  };

}]);

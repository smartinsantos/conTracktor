app.controller('WorkersCtrl', ['$scope','Workers','$state','Toastr', function($scope, Workers,$state,Toastr) {
  
  console.log('WorkersCtrl Loaded....')
  // Object for adding workers
  $scope.worker = {};

  //We are going to save all the workers here on load
  $scope.workers = [];

  $scope.getWorkers = function() {
    Workers.getAll()
    .then(function(workers){
      $scope.workers = workers;
    })
  };

  $scope.createWorker = function () {
    var newWorker = $scope.worker;
    Workers.create(newWorker)
    .then(function(res){
      console.log(res);
      if(res === undefined){
        throw 'Error Ocurred';
      }else{ 
        Toastr.success('Worker Created')
        $scope.backToWorkers();
      }
    })
    .catch(function(err){
      Toastr.error(err);
      console.log('error ocurred: ', err);
    });
  };

//removes worker from the scope
  $scope.backToWorkers = function() {
    //work around fading after toogle modal          $scope.worker = {};
    $('div.modal').removeClass('fade').addClass('hidden');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $state.reload('main_private.workers')
  };

  $scope.getWorkers();

}]);

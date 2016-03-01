app.controller('WorkersCtrl', ['$scope','Workers','$state', function($scope, Workers,$state) {
  
  console.log('WorkersCtrl Loaded....')
  // Object for adding workers
  $scope.worker = {};

  //We are going to save all the workers here on load
  $scope.workers = '';

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
      $scope.worker = {};
      $('#workerModal').modal('toggle');
      $scope.getWorkers();
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    });
  };

//removes worker from the scope
  $scope.backToWorkers = function() {
    //work around fading after toogle modal
    $('div.modal').removeClass('fade').addClass('hidden');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $state.reload('main_private.workers')
  };

  $scope.getWorkers();

}]);

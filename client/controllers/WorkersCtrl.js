app.controller('WorkersCtrl', ['$scope','Workers', function($scope, Workers) {
  
  console.log('WorkersCtrl Loaded....')
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

      $('#workerModal').modal('toggle');
      $scope.getWorkers();
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    });
  };

  $scope.log = function(val){
    console.log(val);
  }

  $scope.getWorkers();




}]);

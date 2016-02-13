app.controller('WorkersEditCtrl', ['$scope','Workers','$state', function($scope, Workers,$state) {
  
  console.log('WorkersEditCtrl Loaded....')
  // Object for adding workers
  $scope.worker = {};

  $scope.backToWorkers = function(){
    $state.go('main_private.workers');
  }

  $scope.getWorker = function(){
  var workerId = $state.params.id;
    Workers.getOne(workerId)
    .then(function(res){
      $scope.worker = res.data;
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    }); 
  }

  $scope.editWorker = function () {
    var workerInfo = $scope.worker;
    Workers.edit(workerInfo)
    .then(function(res){
      $state.go('main_private.workers');

    })
    .catch(function(err){
    console.log('error ocurred: ', err);
    })
  }

  $scope.getWorker();


}]);

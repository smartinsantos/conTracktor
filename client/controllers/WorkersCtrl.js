app.controller('WorkersCtrl', ['$scope','Workers', function($scope, Workers) {
  
  console.log('WorkersCtrl Loaded....')

  $scope.worker = {
    first: '',
    last: '',
    email: '',
    phone: '',
    address: {
      street: '',
      street2:'',
      city:'',
      state:'',
      zip: '',
    }
  };

  //We are going to save all the workers here on load
  $scope.workers = '';

  $scope.getWorkers = function() {
    Workers.getAll()
    .then(function(workers){
      $scope.workers = workers;
    })
  }();

  $scope.createWorker = function () {
    var newWorker = $scope.worker;
    Workers.create(newWorker)
    .then(function(res){
      $('#workerModal').modal('toggle');
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    });
  };






}]);

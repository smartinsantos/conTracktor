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

  $scope.createWorker = function () {
    var newWorker = $scope.worker;
    Workers.create(newWorker)
    .then(function(res){
      console.log('worker created: ', res)
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    });
  };


}]);

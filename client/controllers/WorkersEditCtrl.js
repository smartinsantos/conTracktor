app.controller('WorkersEditCtrl', ['$scope','Workers','$state','Toastr', function($scope, Workers,$state,Toastr) {
  
  // console.log('WorkersEditCtrl Loaded....')

  $scope.worker = {};

  $scope.getWorker = function(){
  var workerId = $state.params.id;
    Workers.getOne(workerId)
    .then(function(res){
      $scope.worker = res.data;
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    }); 
  };

  $scope.editWorker = function () {
    var workerInfo = $scope.worker;
    Workers.edit(workerInfo)
    .then(function(res){
      if(res===undefined){
        throw 'Error Ocurred';
      }else{
        Toastr.success('Saved!');
        $state.go('main_private.workers');
      }
    })
    .catch(function(err){
      Toastr.error(err);
    console.log('error ocurred: ', err);
    });
  };

  $scope.deleteWorker = function(){
    var workerId = $state.params.id;
    Workers.deleteWorker(workerId)
    .then(function(res){
      if(res===undefined){
        throw 'Error Ocurred';
      }else{
        Toastr.success('Deleted')
        $scope.getWorkers();
        //Work around to fix modal bug were still fading app after toggle
        $('div.modal').removeClass('fade').addClass('hidden');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $state.go('main_private.workers');                
      }
    })
    .catch(function(err){
      Toastr.error(err)
      console.log('error ocurred: ', err);
    }); 
  };

  $scope.backToWorkers = function(){
    $state.go('main_private.workers');
  };

  $scope.getWorker();

}]);

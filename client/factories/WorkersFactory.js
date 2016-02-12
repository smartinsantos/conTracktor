app.factory('Workers', ['$http', '$state', '$timeout', function($http, $state, $timeout) {
  

  var create = function (newWorker){
    return $http.post('/workers/', newWorker);
  };
 
  var edit = function(workerInfo){
    // return $http.put('/workers/:id', workerInfo);
  }



  return {
  create:create,

  };
}]);

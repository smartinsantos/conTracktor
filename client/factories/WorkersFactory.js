app.factory('Workers', ['$http', '$state', '$timeout', function($http, $state, $timeout) {
  

  var getAll = function(){
    return $http.get('/workers/')  
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('error getting workers:', err);
      return err;
    })
  };

  var create = function (newWorker){
    return $http.post('/workers/', newWorker);
  };
 
  var edit = function(workerInfo){
    // return $http.put('/workers/:id', workerInfo);
  };



  return {
  create:create,
  getAll:getAll
  };
}]);

app.factory('Workers', ['$http', '$state', '$timeout', function($http, $state, $timeout) {
  

  var getAll = function(){
    return $http.get('/workers/')  
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('getWorkers workers:', err);
      return err;
    })
  };

  var getOne = function(workerId){
    return $http.get('/workers/' + workerId)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('getWorker err: ', err);
    });
  };

  var create = function (newWorker){
    return $http.post('/workers/', newWorker)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('createWorker err: ', err);
    });
  };
 
  var edit = function(workerInfo){
    var workerId = workerInfo._id;
    return $http.put('/workers/'+ workerId, workerInfo)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('editWorker err: ', err);
    });
  };

  var deleteWorker = function(workerId){
    return $http.delete('/workers/'+ workerId)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('deleteWorker err: ', err);
    });
  };

  return {
  create:create,
  getAll:getAll,
  getOne:getOne,
  edit:edit,
  deleteWorker:deleteWorker
  };
}]);

app.factory('Properties', ['$http', '$state', '$timeout', function($http, $state, $timeout) {
  
var getAll = function(){
    return $http.get('/properties/')  
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('getProperties err:', err);
      return err;
    })
  };

  var getOne = function(workerId){
    return $http.get('/properties/' + workerId)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('getPropertie err: ', err);
    });
  }

  var create = function (newWorker){
    return $http.post('/properties/', newWorker)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('createPropertie err: ', err);
    });
  };
 
  var edit = function(workerInfo){
    var workerId = workerInfo._id;
    return $http.put('/properties/'+ workerId, workerInfo)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('editPropertie err: ', err);
    });
  };

  var deletePropertie = function(workerId){
    return $http.delete('/properties/'+ workerId)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('deletePropertie err: ', err);
    });
  };

  return {
  create:create,
  getAll:getAll,
  getOne:getOne,
  edit:edit,
  deletePropertie:deletePropertie
  };

}]);

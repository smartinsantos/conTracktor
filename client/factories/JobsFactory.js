app.factory('Jobs', ['$http', '$state', '$timeout', function($http, $state, $timeout) {
  
var getAll = function(){
    return $http.get('/jobs/')  
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('getJobs err:', err);
      return err;
    })
  };

  var getOne = function(jobId){
    return $http.get('/jobs/' + jobId)
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('getJobs err: ', err);
    });
  }

  var getIncompleted = function(){
    return $http.get('/jobs/incompleted')
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('getJobs incompleted err: ', err);
    });
  };

  var getCompleted = function(){
    return $http.get('/jobs/completed')
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('getJobs completed err: ', err);
    });

  }

  var create = function (newJob){
    return $http.post('/jobs/', newJob)
    .then(function(res){
      return res;
    })
    .catch(function(err){
      console.log('createJob err: ', err);
    });
  };
 
  var edit = function(jobInfo){
    var jobId = jobInfo._id;
    return $http.put('/jobs/'+ jobId, jobInfo)
    .then(function(res){
      return res;
    })
    .catch(function(err){
      console.log('editJob err: ', err);
    });
  };

  var deleteJob = function(jobId){
    return $http.delete('/jobs/'+ jobId)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('deleteJob err: ', err);
    });
  };

  return {
  create:create,
  getAll:getAll,
  getOne:getOne,
  getIncompleted:getIncompleted,
  getCompleted:getCompleted,
  edit:edit,
  deleteJob:deleteJob
  };

}]);

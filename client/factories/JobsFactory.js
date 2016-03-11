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

  //Gets all jobs from one particular manager  
  var getAllManagerJobs = function(managerId){
    return $http.get('/jobs/manager/' + managerId)  
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

//********************TODO
  var getAllByServiceDate = function(startDate,endDate){
    //Transform Dates to 
    var startDate = startDate.toJSON()
    var endDate = endDate.toJSON()
    var dateQuery = jQuery.param({startDate:startDate,endDate:endDate});

    return $http.get('/jobs/services/date/' + dateQuery)
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('getJobs completed err: ', err);
    });
  };
//********************

  var getCompletedByDate = function(startDate,endDate){
    //Transform Dates to 
    var startDate = startDate.toJSON()
    var endDate = endDate.toJSON()
    var dateQuery = jQuery.param({startDate:startDate,endDate:endDate});

    return $http.get('/jobs/completed/date/' + dateQuery)
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('getJobs completed err: ', err);
    });
  };

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

  var getAwsUrl = function(fileInfo){

    return $http.post('/jobs/signedUrlAWS',fileInfo)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('signedUrlAWS err: ', err);
    });
  };

  var deleteAwsBucket = function(fileInfo){
    console.log('deleteAwsBucket....', fileInfo)

    return $http.post('/jobs/deleteAws', fileInfo)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('deleteAws err: ', err);
    });
  };

  return {
  create:create,
  getAll:getAll,
  getAllManagerJobs:getAllManagerJobs,
  getOne:getOne,
  getIncompleted:getIncompleted,
  getAllByServiceDate:getAllByServiceDate,
  getCompletedByDate:getCompletedByDate,
  edit:edit,
  deleteJob:deleteJob,
  getAwsUrl:getAwsUrl,
  deleteAwsBucket:deleteAwsBucket
  };

}]);

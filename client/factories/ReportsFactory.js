app.factory('Reports', ['$http', '$state', '$timeout', function($http, $state, $timeout) {
  

  var getAll = function(adminId){
    return $http.get('/reports/admin/' + adminId)  
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('getJobs err:', err);
      return err;
    })
  };

    var getOne = function(reportId){
    return $http.get('/reports/' + reportId)
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('getJobs err: ', err);
    });
  }
  
  var create = function (newReport){
    return $http.post('/reports/', newReport)
    .then(function(res){
      return res;
    })
    .catch(function(err){
      console.log('createReport err: ', err);
    });
  };
 
  var edit = function(reportInfo){
    var reportId = reportInfo._id;
    return $http.put('/jobs/'+ reportId, reportInfo)
    .then(function(res){
      return res;
    })
    .catch(function(err){
      console.log('editReport err: ', err);
    });
  };

  var deleteReport = function(reportId){
    return $http.delete('/reports/'+ reportId)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('deleteReport err: ', err);
    });
  };


  return {
    getAll:getAll,
    getOne:getOne,
    create:create,
    edit:edit,
    deleteReport:deleteReport
  };

}]);

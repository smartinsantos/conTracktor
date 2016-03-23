app.controller('ReportsCtrl', ['$scope','$state','Reports','Jobs','Admin','Workers','Properties','Auth','Toastr','Reports', function($scope,$state,Reports,Jobs,Admin,Workers,Properties,Auth,Toastr,Reports) {
  //gets admin id for the session
  $scope.sessionId = $state.params.sessionId || Auth.sessionId();  // console.log('ReportsCtrl Loaded....') 
  $scope.priceCounter = 0;
  
//default values for dates on state load
   if(!$state.params.currentStateData){
    $scope.report = {};
    $scope.report.date = {}; 
    $scope.report.jobs = [];
    $scope.report.date.end = new Date();
    $scope.report.date.start = new Date();
    $scope.report.date.start.setDate($scope.report.date.start.getDate() - 7); 
   }else{
    $scope.report = $state.params.currentStateData;
   }

   if($state.current.name === 'main_private.reports_manager'){
      $scope.sessionId = $state.params.sessionId || Auth.sessionId();
      $scope.report.reportType = 'manager';
      $scope.report.manager = $scope.sessionId;
   }

//reports saved in DB
 $scope.savedReports = [];
 $scope.loadReport = {};

 $scope.getAllReports = function(){
  Reports.getAll($scope.sessionId)
  .then(function(res){
    if(res){    
      $scope.savedReports = res;
      console.log('reports: ',res);
    }else{
      throw 'Error Getting Reports'
    }
  })
  .catch(function(err){
    console.log(err);
  })
 };

 $scope.getAllReports();

  $scope.loadReport = function(reportId){
    Reports.getOne(reportId)
    .then(function(res){
      if(res){    
        $scope.loadReport = res;
        console.log('report: ', res);
      }else{
        throw 'Error Getting Report'
      }
    })
    .catch(function(err){
      console.log(err);
    })
   };


//filter object for job 'search'
  $scope.filter = {};
 
// 
  $scope.generateReport = function (){
    $scope.clearReport();
    var startDate = $scope.report.date.start;
    var endDate = $scope.report.date.end;
  //formating date to be compared on ng-if html
    $scope.startDateCompare = startDate.toISOString();
    $scope.endDateCompare = endDate.toISOString();

    Jobs.getAllByServiceDate(startDate,endDate)
    .then(function(jobs){

      if($scope.report.reportType ==='manager'){
        jobs.forEach(function(job){
          if(job.manager._id === $scope.report.manager){
            $scope.report.jobs.push(job);
          }
        });
      }else if($scope.report.reportType ==='worker'){

        jobs.forEach(function(job){
          for(var i=0;i< job.services.length;i++){
            if(job.services[i].worker._id === $scope.report.worker && job.services[i].date_assigned>=$scope.startDateCompare && job.services[i].date_assigned<=$scope.endDateCompare){
              $scope.report.jobs.push(job);
              break;
            }
          };
        });
      }else if($scope.report.reportType ==='property'){
        jobs.forEach(function(job){
          if(job.propertie._id === $scope.report.propertie){
            $scope.report.jobs.push(job);
          }
        });
      }          
    }).catch(function(err){
      console.log('Err getting report data: ', err)
    })
  }

  $scope.completeJob = function(job){
    var jobInfo = job;
    jobInfo.ready_review = true;
    jobInfo.date_completed = new Date();
    Jobs.edit(jobInfo)
    .then(function(res){
      if(res){
        Toastr.success('Saved')
      }else{
        throw 'Error Ocurred Completing'
      }
    })
    .catch(function(err){
      Toastr.error(err);
      console.log('Error completing job', err)
    })
  }

//clear report jobs on report change
  $scope.clearReport = function(){
    $scope.report.jobs =[];
    if($scope.report.reportType === 'manager'){
      $scope.report.worker = '';
      $scope.report.propertie = '';
    }else if($scope.report.reportType === 'worker'){
      $scope.report.manager = '';
      $scope.report.propertie = '';
    }else if($scope.report.reportType === 'property'){
      $scope.report.manager = '';
      $scope.report.worker = '';
    }
  };

// prints html contents
$scope.printHTML = function(content) {
     
  var printContents = $('#printableArea').html();

  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      var popupWin = window.open('', '_blank', 'width=1200,height=680,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWin.window.focus();
      popupWin.document.write('<!DOCTYPE html><html><head>' +
          '<link rel="stylesheet" type="text/css" href="main.css"/>' +
          '</head><body onload="window.print()" onfocus="window.close()"><div>' + printContents + '</div></html>');
      popupWin.onfocus=function(){ popupWin.document.close();}
  } else {
      var popupWin = window.open('', '_blank', 'width=1200,height=680');
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="main.css" /></head><body onload="window.print()">' + printContents + '</html>');
      popupWin.document.close();
  }
  popupWin.document.close();
  return true;
}

//listener of state starting exit to save current state data
$scope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){
  $state.params.currentStateData = $scope.report;
})


}]);

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

 $scope.getAllReports = function(){
  Reports.getAll($scope.sessionId)
  .then(function(res){
    if(res){    
      $scope.savedReports = res;
    }else{
      throw 'Error Getting Reports'
    }
  })
  .catch(function(err){
    console.log(err);
  })
 };

 $scope.getAllReports();

  $scope.loadSavedReport = function(reportId){
    Reports.getOne(reportId)
    .then(function(res){
      if(res){
        $scope.clearReport();    
        $scope.report = res;
        $scope.report.date.start = new Date($scope.report.date.start);
        $scope.report.date.end = new Date($scope.report.date.end);
        $('#collapseOne').collapse('hide');
      }else{
        throw 'Error Getting Report'
      }
    })
    .catch(function(err){
      console.log(err);
    })
   };

  $scope.saveReport = function(){
    var newReport = $scope.report;
    //if report is new    
    if(!$scope.report.name){
      $('#saveReportModal').modal('show');
    }else if (!newReport.edited){//if report is not in db
      newReport.owner = $scope.sessionId;
      newReport.edited = new Date();
      Reports.create(newReport)
      .then(function(res){
        if(res){
          $('#saveReportModal').modal('hide');
          $scope.savedReports.push(res.data);
          Toastr.success('Report Created')
        }else{
          throw 'Error Check Report Name'
        }
      })
      .catch(function(err){
        console.log(err);
        Toastr.error('Err')
      });
    }else{ //if report is already on db 
      newReport.edited = new Date();
      Reports.edit(newReport)
      .then(function(res){
        if(res){
          Toastr.success('Report Saved')
          $scope.getAllReports();
        }else{
          throw 'Error Saving Report'
        }
      })
      .catch(function(err){
        console.log(err);
        Toastr.error('Err')
      });
    }      
  };

  $scope.deleteReport = function(reportId){
    Reports.deleteReport(reportId)
    .then(function(res){
      if(res){
        Toastr.success('Report Deleted')
        $scope.getAllReports();
      }else{
        throw 'Error Deleting Report'
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
    delete $scope.report._id 
    $scope.report.jobs =[];
    $scope.report.name = null;
    $scope.report.edited = null;
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

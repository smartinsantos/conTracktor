app.controller('ReportsCtrl', ['$scope','$state','Reports','Jobs','Admin','Workers','Properties', function($scope,$state,Reports,Jobs,Admin,Workers,Properties) {
  
  // console.log('ReportsCtrl Loaded....')
  $scope.priceCounter = 0;
  
//default values for dates on state load
  $scope.report = {};
  $scope.report.date = {}; 
  $scope.report.date.end = new Date();
  $scope.report.date.start = new Date();
  $scope.report.date.start.setDate($scope.report.date.start.getDate() - 7);


//jobs retrieved on report criteria 
  $scope.report.jobs =[]; 

   //filter object for job 'search'
  $scope.filter = {};

//get all managers
  $scope.admins = [];

  $scope.getAdmins = function() {
    Admin.getAll()
    .then(function(admins){
      $scope.admins = admins;
    })
  };


//get all properties 
  $scope.properties = [];

  $scope.getProperties = function() {
    Properties.getAll()
    .then(function(properties){
      $scope.properties = properties;
    })
  };


//get all workers
  $scope.workers = [];

    $scope.getWorkers = function() {
      Workers.getAll()
      .then(function(workers){
        $scope.workers = workers;
      })
    };

  //load admins, properties
  $scope.getAdmins();
  $scope.getProperties();
  $scope.getWorkers();    

 
// 
  $scope.generateReport = function (){
    var startDate = $scope.report.date.start;
    var endDate = $scope.report.date.end;
  //formating date to be compared on ng-if html
    $scope.startDateCompare = startDate.toISOString();
    $scope.endDateCompare = endDate.toISOString();

    $scope.report.jobs = [];

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

  $scope.$watch('report.reportType', function(value) {
         $scope.clearReport();
   });

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


}]);

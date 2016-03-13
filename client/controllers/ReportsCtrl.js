app.controller('ReportsCtrl', ['$scope','$state','Reports','Jobs','Admin','Workers','Properties', function($scope,$state,Reports,Jobs,Admin,Workers,Properties) {
  
  console.log('ReportsCtrl Loaded....')
  $scope.priceCounter = 0;
  
//default values for dates on state load
  $scope.report = {};
  $scope.report.date = {}; 
  $scope.report.date.end = new Date();
  $scope.report.date.start = new Date();
  $scope.report.date.start.setMonth($scope.report.date.start.getMonth() - 1);


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
    console.log($scope.report.jobs)
    
    }).catch(function(err){
      console.log('Err getting report data: ', err)
    })
  }

//clear report jobs on report change
  $scope.clearReport = function(){  
    $scope.report.jobs =[]; 
  };

  $scope.$watch('report.reportType', function(value) {
         $scope.clearReport();
   });

//**************************TODO
  $scope.demoFromHTML = function() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    
    pdf.cellInitialize();
    pdf.setFontSize(10);
    $.each( $('tr'), function (i, row){
        $.each( $(row).find("td, th"), function(j, cell){
            var txt = $(cell).text().trim() || " ";
            var width = (j==4) ? 40 : 70; //make with column smaller
            pdf.cell(10, 50, width, 30, txt, i);
        });
    });
    
    pdf.save('sample-file.pdf');
}
//********************

}]);

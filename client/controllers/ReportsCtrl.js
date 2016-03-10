app.controller('ReportsCtrl', ['$scope','$state','Reports','Jobs','Admin','Workers','Properties', function($scope,$state,Reports,Jobs,Admin,Workers,Properties) {
  
  console.log('ReportsCtrl Loaded....')

  $scope.report;

  //default values for dates on state load
  $scope.endDate = new Date();
  $scope.startDate = new Date();
  $scope.startDate.setMonth($scope.startDate.getMonth() - 1);

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

 
//CREATE JOBS
  $scope.jobs = [];
  $scope.job = {};

  $scope.getJobs = function(startDate,endDate) {
    Jobs.getAll()
    .then(function(jobs){
      $scope.jobs = jobs;
    })
  };

//**************************TODO
  function demoFromHTML() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    
    pdf.cellInitialize();
    pdf.setFontSize(10);
    $.each( $('#customers tr'), function (i, row){
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

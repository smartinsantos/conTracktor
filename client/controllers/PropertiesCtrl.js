app.controller('PropertiesCtrl', ['$scope','Properties','$state', function($scope, Properties,$state) {
  
  console.log('PropertiesCtrl Loaded....')

    // Object for adding property
  $scope.property = {};

  //We are going to save all the properties here on load
  $scope.properties = '';

  $scope.getProperties = function() {
    Properties.getAll()
    .then(function(properties){
      $scope.properties = properties;
    })
  };

  $scope.createProperty = function () {
    var newProperty = $scope.property;
    Properties.create(newProperty)
    .then(function(res){
      $scope.property = '';
      $('#propertyModal').modal('toggle');
      $scope.getProperties();
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    });
  };

  $scope.getProperties();


}]);

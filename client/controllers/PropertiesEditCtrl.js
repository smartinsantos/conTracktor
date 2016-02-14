app.controller('PropertiesEditCtrl', ['$scope','Properties','$state', function($scope, Properties,$state) {
  
  console.log('PropertiesEditCtrl Loaded....')


// Object for adding Property
  $scope.property = {};

  $scope.backToProperties = function(){
    $state.go('main_private.props');
  }

  $scope.getProperty = function(){
  var propertyId = $state.params.id;
    Properties.getOne(propertyId)
    .then(function(res){
      $scope.property = res.data;
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    }); 
  }

  $scope.editProperty = function () {
    var propertieInfo = $scope.property;
    Properties.edit(propertieInfo)
    .then(function(res){
      $state.go('main_private.properties');

    })
    .catch(function(err){
    console.log('error ocurred: ', err);
    })
  }

  $scope.deleteProperty = function(){
    var propertyId = $state.params.id;
    Properties.deletePropertie(propertyId)
    .then(function(res){
      //Work around to fix modal bug were still fading app after toggle
      $('div.modal').removeClass('fade').addClass('hidden');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      $state.go('main_private.properties');
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    }); 


  }

  $scope.getProperty();

}]);

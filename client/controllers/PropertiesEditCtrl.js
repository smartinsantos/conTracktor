app.controller('PropertiesEditCtrl', ['$scope','Properties','$state','Toastr', function($scope, Properties,$state,Toastr) {
  
  // console.log('PropertiesEditCtrl Loaded....')


// Object for adding Property
  $scope.property = {};

  $scope.backToProperties = function(){
    $state.go('main_private.properties');
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
      if(res===undefined){
        throw 'Error Ocurred'
      }else{
        Toastr.success('Saved!');
      }
    })
    .catch(function(err){
      Toastr.error(err);
    console.log('error ocurred: ', err);
    })
  }

  $scope.deleteProperty = function(){
    var propertyId = $state.params.id;
    Properties.deletePropertie(propertyId)
    .then(function(res){
      if(res===undefined){
        throw 'Error Ocurred'
      }else{
      Toastr.success('Deleted!');
      //Work around to fix modal bug were still fading app after toggle
      $('div.modal').removeClass('fade').addClass('hidden');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      $state.go('main_private.properties');        
      }
    })
    .catch(function(err){
      Toastr.error(err);
      console.log('error ocurred: ', err);
    }); 
  }

  $scope.addNewContact = function() {
    var newContact = $scope.property.contacts.length+1;
    $scope.property.contacts.push({});
  };
    
  $scope.removeContact = function() {
    var lastContact = $scope.property.contacts.length-1;
    $scope.property.contacts.splice(lastContact);
  };

  $scope.getProperty();

}]);

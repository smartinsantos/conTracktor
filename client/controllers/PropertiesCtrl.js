app.controller('PropertiesCtrl', ['$scope','Properties','$state','Toastr', function($scope, Properties,$state,Toastr) {
  
  // console.log('PropertiesCtrl Loaded....')

    // Object for adding property
  $scope.property = {};
  $scope.property.contacts = [];

  //We are going to save all the properties here on load
  $scope.properties = [];

  $scope.getProperties = function() {
    Properties.getAll()
    .then(function(properties){
      $scope.properties = properties;
    })
  };

  $scope.createProp = function () {
    var newProperty = $scope.property;
    Properties.create(newProperty)
    .then(function(res){
      if(res===undefined){
        throw 'Error Ocurred';
      }else{
        Toastr.success('Created!');
        $scope.backToProperties();
      }
    })
    .catch(function(err){
      Toastr.error(err);
      console.log('error ocurred: ', err);
    });
  };

  
  $scope.addNewContact = function() {
    var newContact = $scope.property.contacts.length+1;
    $scope.property.contacts.push({});
  };
    
  $scope.removeContact = function() {
    var lastContact = $scope.property.contacts.length-1;
    $scope.property.contacts.splice(lastContact);
  };

  //removes properties from the scope
  $scope.backToProperties = function() {
    //work around fading after toogle modal          $scope.worker = {};
    $('div.modal').removeClass('fade').addClass('hidden');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $state.reload('main_private.properties')
  };

  $scope.getProperties();

}]);

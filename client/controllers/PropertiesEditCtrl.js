app.controller('PropertiesEditCtrl', ['$scope','Properties','$state', function($scope, Properties,$state) {
  
  console.log('PropertiesEditCtrl Loaded....')


// Object for adding workers
  // $scope.propertie = {};

  // $scope.backToProperties = function(){
  //   $state.go('main_private.props');
  // }

  // $scope.getPropertie = function(){
  // var propertieId = $state.params.id;
  //   Workers.getOne(propertieId)
  //   .then(function(res){
  //     $scope.propertie = res.data;
  //   })
  //   .catch(function(err){
  //     console.log('error ocurred: ', err);
  //   }); 
  // }

  // $scope.editWorker = function () {
  //   var propertieInfo = $scope.propertie;
  //   Workers.edit(propertieInfo)
  //   .then(function(res){
  //     $state.go('main_private.properties');

  //   })
  //   .catch(function(err){
  //   console.log('error ocurred: ', err);
  //   })
  // }

  // $scope.deletePropertie = function(){
  //   var propertieId = $state.params.id;
  //   Workers.deletePropertie(propertieId)
  //   .then(function(res){
  //     //Work around to fix modal bug were still fading app after toggle
  //     $('div.modal').removeClass('fade').addClass('hidden');
  //     $('body').removeClass('modal-open');
  //     $('.modal-backdrop').remove();
  //     $state.go('main_private.workers');
  //   })
  //   .catch(function(err){
  //     console.log('error ocurred: ', err);
  //   }); 


  // }

  // $scope.getPropertie();

}]);

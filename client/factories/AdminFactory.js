app.factory('Admin', ['$http', '$state', '$timeout','manager', function($http, $state, $timeout,manager) {
  
  var create = function (newAdmin){
    return $http.post('/admin/create', newAdmin);
  };
  
  var signIn = function (adminData){
    return $http.post('/admin/signin', adminData)
    .then(function (response) {
      $timeout(() => {
        $state.go('main_private', null, { reload: true });
      }, 100);
    });
  };


  var signOut = function(){
    console.log('Logging Out...')
  return $http.post('/admin/signout')
    .then(function(response){
      manager.value = false;
      $state.go('main_public');
    })
    .catch(function(err){  
      console.log('logOut err ', err);
    });

  };

  return {
    create:create,
    signIn:signIn,
    signOut:signOut
  };
}]);

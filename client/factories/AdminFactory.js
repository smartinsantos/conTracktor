app.factory('Admin', ['$http', '$state', '$timeout', function($http, $state, $timeout) {
  
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
  return $http.post('/api/users/signout')
    .then(function(response){
      $state.go('main.public');
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

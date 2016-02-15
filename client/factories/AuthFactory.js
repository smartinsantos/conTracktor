app.factory('Auth', ['$state', '$cookies', function($state, $cookies) {
  
  //lets app know if cookie is set and user is logged in
  var isLoggedIn = function () {
    var cookie = $cookies.get('isLoggedIn');
    return cookie === 'true';
  };
  var isManager = function () {
    var cookie = $cookies.get('isManager');
    return cookie === 'true';
  };

  return {
    isLoggedIn: isLoggedIn,
    isManager:isManager
  };

}]);

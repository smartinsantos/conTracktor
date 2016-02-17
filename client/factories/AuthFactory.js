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

  var sessionId = function () {
    var id = $cookies.get('sessionId');
    //hacky fix to get the proper id j:"id" is sent by the server
    var id = id.slice(3,id.length-1)
    return id;
  };


  return {
    isLoggedIn: isLoggedIn,
    isManager:isManager,
    sessionId:sessionId
  };

}]);

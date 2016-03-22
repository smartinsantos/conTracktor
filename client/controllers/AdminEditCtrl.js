app.controller('AdminEditCtrl', ['$scope','Admin','$state','Toastr', function($scope, Admin,$state,Toastr) {
  
  // console.log('AdminEditCtrl Loaded....')

  // Object for adding workers
  $scope.admin = {};
  $scope.admin.changePassOld = null;
  $scope.admin.changePassNew = null;
  $scope.admin.changepassNew2 = null;


  $scope.backToManagers = function(){
    $state.go('main_private.managers');
  }

  $scope.backToJobs = function(){
    $state.go('main_private.jobs');
  }

  $scope.getAdmin = function(){
  var adminId = $state.params.id;
    Admin.getOne(adminId)
    .then(function(res){
      $scope.admin = res.data;
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    }); 
  };

  $scope.editAdmin = function () {
    var adminInfo = $scope.admin;
    Admin.edit(adminInfo)
    .then(function(res){
       if(res===undefined){
        throw 'Error Ocurred'
       }else{
        Toastr.success('Edited!')
        $scope.getAdmins();
        $state.go('main_private.managers');      
       }
    })
    .catch(function(err){
      Toastr.error(err)
    })
  };

  $scope.userDisable = function (access) {
    var adminInfo = $scope.admin;
    if(adminInfo.admin){
      Toastr.error('Can not revoke access of Administrator First Demote')
    }else{
      adminInfo.access_disable = access; 
      Admin.edit(adminInfo)
      .then(function(res){
        if (res===undefined){
          throw 'Error Changing Access'
        }else {        
          $scope.getAdmins();
          Toastr.success('Access Changed');
          $('div.modal').removeClass('fade').addClass('hidden');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          $state.go('main_private.managers');
        }
      })
      .catch(function(err){
        Toastr.error(err);
        console.log('error ocurred: ', err);
      })      
    }
  }

  $scope.deleteAdmin = function(){
    var adminId = $state.params.id;
    Admin.deleteAdmin(adminId)
    .then(function(res){
      if(res===undefined){
        throw err;
      }else{
        Toastr.success('Deleted!');
        $scope.getAdmins();
        //Work around to fix modal bug were still fading app after toggle
        $('div.modal').removeClass('fade').addClass('hidden');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $state.go('main_private.managers');        
      }
    })
    .catch(function(err){
      console.log('error ocurred: ', err);
    });
  };

  $scope.managerChangePassword = function(){
    var passwordInfo = {
      _id: $scope.admin._id,
      oldPass: $scope.admin.changePassOld,
      newPass: $scope.admin.changePassNew
    }

    Admin.changePassword(passwordInfo)
    .then(function(res){
      if(res===undefined){
        throw 'Error Ocurred';
      }else{      
        $('#changePassword').modal('toggle');
        $state.go('main_private.manager_profile');
        Toastr.success('Password Changed');
      }
    })
    .catch(function(err){
      Toastr.error(err);
      console.log('error ocurred changing password: ', err);
    })
  }; 

  $scope.getAdmin();
 
}]);

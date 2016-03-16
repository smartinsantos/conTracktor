//format date directory to be able to display in mm/dd/yyyy format 
app.directive("formatDate", function() {
  return {
      require: 'ngModel',
      link: function(scope, elem, attr, modelCtrl) {
          modelCtrl.$formatters.push(function(modelValue) {
              if (modelValue){
                  return new Date(modelValue);
              }
              else {
                  return null;
              }
          });
      }
  };
});

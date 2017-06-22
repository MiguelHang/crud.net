( () => {
  app.controller('CrearCtrl', crearCtrl)
  crearCtrl.$inject = ['$scope', '$state', '$q', '$sce', 'CodigoDes']


  function crearCtrl($scope, $state, $q, $sce, CodigoDes){
    
    $scope.codigo = CodigoDes

    $scope.guardar = () => {
      CodigoDes.setData($scope.codigo)
      CodigoDes.create()
    }
  }
})();
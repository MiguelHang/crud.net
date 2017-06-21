( () => {
	app.controller('HomeCtrl', homeCtrl)
	homeCtrl.$inject = ['$scope', '$state', 'HomeServices', '$q', '$sce', 'Codigos']


	function homeCtrl($scope, $state, HomeServices, $q, $sce, Codigos){
	$scope.codigos = Codigos
	$scope.view = false
	$scope.page = 5

	$scope.eliminar = (id, index) => {
		console.log(id)
		console.log(index)
		Codigos.splice(index, 1)
		HomeServices.deleteCodigo(id)
	}

	$scope.avPage = () => {
		$scope.page = $scope.page + 5 
	}

	$scope.rePage = () => {
		$scope.page = $scope.page - 5
	}
}
})();

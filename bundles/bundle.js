'use strict';
let app = angular.module('appSPG', ['ui.router', 'ui.bootstrap'])

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'app/modules/home/home.html',
		controller:   'HomeCtrl',
		resolve: {
			Codigos: ['HomeServices', (HomeServices) => {
            return HomeServices.getCodigos()
          }]
		}
	})
	.state('home.playlist', {
		url: 'playlist/',
		templateUrl: 'app/modules/playlist/playlist.html',
		controller: 'PlaylistCtrl'
	})
	$locationProvider.html5Mode(true)
}]);

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

( () => {
	app.service('HomeServices', homeServices)
	homeServices.$inject = ['$http']

	function homeServices($http, settings) {
		let url = 'http://localhost:33614/api/suscripciones/codigodescuento/'

		this.getCodigos = () => {
			let urlCodigos = url +'damecodigosdescuento'
			return $http.get(urlCodigos).then( response => {
				return response.data
			})
		}
		this.postCodigo = param => {
			let urlPost = url + ''
			return $http.post(urlPost).then( response => {
				return response.data
			})
		}
		this.deleteCodigo = params => {
			let urlDelete = url + 'delete/' + params
			return $http.delete(urlDelete).then( response =>{
				return response.data
			})
		}

	}
})();
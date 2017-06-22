'use strict';
let app = angular.module('appCrud', ['ui.router', 'ui.bootstrap'])

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'app/modules/home/home.html',
		controller: 'HomeCtrl',
		resolve: {
			Codigos: ['HomeServices', (HomeServices) => {
            return HomeServices.getCodigos()
          }]
		}
	})
	.state('crear', {
		url: '/crear',
		templateUrl: 'app/modules/crear/crear.html',
		controller: 'CrearCtrl'
	})

	$locationProvider.html5Mode(true)
}]);

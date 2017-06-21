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

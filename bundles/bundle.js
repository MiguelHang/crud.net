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

( () =>{
  app.factory('CodigoDes', codigoDes)
  codigoDes.$inject = ['$state', 'HomeServices']
  function codigoDes($state, HomeServices){
    let codigoDes = {
      codigo: '',
      idProducto: '',
      caducidad: '',
      tipoDescuento: '',
      descuento: '',
      usosPosibles: '',
      usosBloqueados: '',
      usosConsumidos: ''
    }

    codigoDes.setData = (codigoDesData) => {
      codigoDes.codigo = codigoDesData.codigo
      codigoDes.idProducto = codigoDesData.idProducto
      codigoDes.caducidad = codigoDesData.caducidad
      codigoDes.tipoDescuento = codigoDesData.tipoDescuento
      codigoDes.descuento = codigoDesData.descuento
      codigoDes.usosPosibles = codigoDesData.usosPosibles
      codigoDes.usosBloqueados = codigoDesData.usosBloqueados
      codigoDes.usosConsumidos = codigoDesData.usosConsumidos
    }

    codigoDes.clearData = () => {
      codigoDes.codigo = ''
      codigoDes.idProducto = ''
      codigoDes.caducidad = ''
      codigoDes.tipoDescuento = ''
      codigoDes.descuento = ''
      codigoDes.usosPosibles = ''
      codigoDes.usosBloqueados = ''
      codigoDes.usosConsumidos = ''
    }

    codigoDes.create = () => {
        let params = { 
              codigo: codigoDes.codigo, 
              idProducto: codigoDes.idProducto, 
              caducidad: new Date(codigoDes.caducidad),
              tipoDescuento: codigoDes.tipoDescuento, 
              descuento: codigoDes.descuento, 
              usosPosibles: codigoDes.usosPosibles, 
              usosBloqueados: codigoDes.usosBloqueados, 
              usosConsumidos: codigoDes.usosConsumidos 
        }

        HomeServices.postCodigo(params).then(
          success => {
            console.log('Codigo creado')
            $state.go('home')
          }, 
          error => {
            console.log('error al crear')
          }
        )
    }

    // discard.modify = () => {
    //     let params = { 
    //       modifyDiscard:{
    //           id: discard.id,
    //           localId: discard.localId,
    //           warehouseId: discard.warehouseId,
    //           date: new Date(discard.date).toUTC(),
    //           typeElement: discard.typeElement,
    //           elementId: discard.elementId,
    //           quantity: discard.quantity,
    //           measureUnit: discard.measureUnit,
    //           observations: discard.observations,
    //           block: discard.block             
    //         }
    //     }

    //     DiscardsServices.put(params).then(
    //       success => {
    //         swal({
    //           title: gettextCatalog.getString('Descarte modificado'),
    //           type: 'success'
    //         },
    //         () => {
    //           $state.go('layout.discards')
    //         })
    //       }, 
    //       error => {
    //         swal(gettextCatalog.getString('Ha ocurrido un error'), gettextCatalog.getString(error.data.message), 'error')
    //       }
    //     )
    // }

    // discard.delete = (id, block) => {
    //   let params = {discardId: id, block: block}
    //   DiscardsServices.delete(params).then(success => {
    //     swal({
    //       title: gettextCatalog.getString('Descarte eliminado'),
    //       type: 'success'
    //     },
    //     () => {
    //       $state.reload()
    //     })
    //   }, error => {
    //     swal(gettextCatalog.getString('Ha ocurrido un error'), error.data.message, 'error')
    //   })
    // }

    return codigoDes
  }
})();
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

	$scope.crearCodigo = () => {
		$state.go('crear')
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
			let urlPost = url + 'creacodigosdescuento'
			return $http.post(urlPost, param).then( response => {
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
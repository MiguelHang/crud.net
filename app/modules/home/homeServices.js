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
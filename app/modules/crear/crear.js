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
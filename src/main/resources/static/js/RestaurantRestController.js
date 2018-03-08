var RestControllerModule = (function () {

  var getOrders = function (callback) {
      axios.get('/orders')
          .then(function (response) {
              callback.onSuccess(response["data"]);
          })
          .catch(function (err) {
              callback.onFailed(err);
          });
  }

  var updateOrder = function (order, callback) {

	axios.put('/orders/'+order.tableNumber,order)
		.then(function(){
			callback.onSuccess();
		})
            .catch(function(err){
                callback.onFailed(err);
		});
  };

  var deleteOrder = function (orderId, callback) {
    axios.delete('/orders/'+orderId)
            .then(function(){
                callback.onSuccess();
            })
				.catch(function(err){
					callback.onFailed(err);
            });
	};

  var createOrder = function (order, callback) {
	//Create ORDER
  };

  var getOrderById = function (orderId,callback){
  	  axios.get('/orders/'+orderId)
          .then(function (response) {
              callback.onSuccess(response["data"]);
          })
          .catch(function (err) {
              callback.onFailed(err);
          });
  }

  return {
    getOrders: getOrders,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    createOrder: createOrder
  };

})();
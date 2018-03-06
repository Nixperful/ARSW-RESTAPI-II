var RestControllerModule = (function () {

  var getOrders = function (callback) {
      axios.get('/orders')
          .then(function (response) {
              callback.onSuccess(response);
          })
          .catch(function (err) {
              callback.onFailure(err);
          });
  }

  var updateOrder = function (order, callback) {
    // todo implement
  };

  var deleteOrder = function (orderId, callback) {
    // todo implement
  };

  var createOrder = function (order, callback) {
    // todo implement
  };

  return {
    getOrders: getOrders,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    createOrder: createOrder
  };

})();
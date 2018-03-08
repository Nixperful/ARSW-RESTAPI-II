var OrdersControllerModule = (function () {
    var ordenes;
    var ordenActual;
  
  var showOrdersByTable = function () {

    var callback = {

        onSuccess: function(ordersList){
			orderNumber=1;
            list = ordersList;
            document.getElementById('tableMenu').innerHTML = "";
            for (order in list) {
                var ordersTable = document.getElementById('tableMenu');
                var ord = document.createElement('table');
                ord.style.width = '100%';
                ord.style.backgroundColor = "#345";
                ord.style.textAlign = "center";
                ord.style.margin = "auto";
                ord.style.border = "1px solid black";
                ord.style.borderCollapse = "collapse";

                orderNumber = orderNumber + 1;
                var tags = document.createElement('p');
                var bold = document.createElement('b');
                var number = document.createTextNode("Order # " + orderNumber.toString());
                tags.style.color = "#B22222";
                bold.appendChild(number);
                tags.appendChild(bold);


                var tabl = document.createElement('p');
                var numberTable = "" + list[order].tableNumber;
                var tble = document.createTextNode("Table # " + numberTable);
                tabl.appendChild(tble);


                var tr = document.createElement('tr');
                var th1 = document.createElement('th');
                th1.style.backgroundColor = "#3a82d2";
                var c1 = document.createTextNode("Product");
                th1.appendChild(c1);
                th2 = document.createElement('th');
                th2.style.backgroundColor = "#3a82d2";
                var c2 = document.createTextNode("Quantity");
                th2.appendChild(c2);
                tr.appendChild(th1);
                tr.appendChild(th2);
                ord.appendChild(tr);
                var tbdy = document.createElement('tbody');
                for (producto in list[order].orderAmountsMap) {
                    var tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.appendChild(document.createTextNode(producto));
                    tr.appendChild(td);

                    var td = document.createElement('td');
                    td.appendChild(document.createTextNode(list[order].orderAmountsMap[producto]));
                    tr.appendChild(td);
                    tbdy.appendChild(tr);
                }
                ord.appendChild(tbdy);

                ordersTable.appendChild(tags);
                ordersTable.appendChild(tabl);
                ordersTable.appendChild(ord);
            }

        },
        onFailed: function(err){
            console.log(err);
            alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
        }
    }
    RestControllerModule.getOrders(callback)
  };



  var updateOrder = function () {
	var actualOrder=document.getElementById('tables').value;
    var callback = {
        onSuccess: function(){
        },
        onFailed: function(err){
            console.log(err);
            alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
        }
    }
    RestControllerModule.updateOrder(order,callback)
  };

  var deleteOrderItem = function (itemName) {
    // todo implement
  };

  var addItemToOrder = function (orderId, item) {

	var callback = {

        onSuccess: function(){
			var product = item[0];
			var quantity = item[1];
			var orden= document.getElementById('tableOrder');
			var tr = document.createElement('tr');

            var td = document.createElement('td');
            td.appendChild(document.createTextNode(product));
            tr.appendChild(td);

            var td = document.createElement('td');
            td.appendChild(document.createTextNode(quantity));
            tr.appendChild(td);            
            orden.appendChild(tr);
		},
		onFailed: function(err){
			console.log(err);
			alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
		}		
	}
	RestControllerModule.updateOrder(order,callback)
};

	var onLoad = function () {

		var callback = {
            onSuccess: function (orderList) {
                ordenes = orderList;
                document.getElementById('tableOrder').innerHTML = "";
                var tabla = document.getElementById('tableOrder');
                var top = document.createElement('tr');
                var p = document.createElement('th');
                p.style = "background-color: #3a82d2;  color: white ; ";
                var c1 = document.createTextNode("Product");
                p.appendChild(c1);
                var q = document.createElement('th');
                q.style = "background-color: #3a82d2;  color: white ; ";
                var c2 = document.createTextNode("Quantity");
                q.appendChild(c2);
                var r = document.createElement('th');
                r.style = "background-color: #cdd560 ";
                var s = document.createElement('th');
                s.style = "background-color: #915700 ";
                top.appendChild(p);
                top.appendChild(q);
                top.appendChild(r);
                top.appendChild(s);
                
                var orden = document.getElementById('tableOrder');
                for (product in ordenActual.orderAmountsMap) {
                    var tr = document.createElement('tr');
                    var td1 = document.createElement('td');
                    var input1 = document.createElement('input');
                    input1.type = "text";
                    input1.name = "item";
                    input1.value = product;
                    td1.appendChild(input1);
                    var td2 = document.createElement('td');
                    var input2 = document.createElement('input');
                    input2.type = "number";
                    input2.name = "quantity";
                    input2.max = "9999";
                    input2.min = "1";
                    input2.style = "width:50%; margin-top:10%";
                    input2.value = ordenActual.orderAmountsMap[product];
                    td2.appendChild(input2);
                    var td3 = document.createElement('td');
                    var upt = document.createElement('a');
                    upt.class = "btn btn- lg btn- primary";
                    upt.role = "button"
                    upt.appendChild(Update);
                    td3.appendChild(upt);
                    var td4 = document.createElement('td');
                    var del = document.createElement('a');
                    del.class = "btn btn-secondary my-2";
                    del.role = "button"
                    del.appendChild(Delete);
                    td4.appendChild(del);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                }
                tabla.appendChild(top);
                tabla.appendChild(tr);
			},
			onFailed: function(err){
			console.log(err);
			alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
		    }
	    }
	    RestControllerModule.getOrders(callback)
    };

    var changeOrder = function () {
        var table = document.getElementById("tables").value;
        var callback = {
            onSuccess: function (order) {
                console.log("You change the order");
                ordenActual = order;
            },
            onFailed: function (err) {
                console.log(err);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
            }
        }
        RestControllerModule.getElementById(table,callback)
    };



	  return {
		showOrdersByTable: showOrdersByTable,
		updateOrder: updateOrder,
		deleteOrderItem: deleteOrderItem,
        addItemToOrder: addItemToOrder,
        onLoad: onLoad,
        changeOrder: changeOrder
	};

})();
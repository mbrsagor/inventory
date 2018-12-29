app.controller('sellController', function($scope, $http){
    $scope.pageTitle = "Product sell page";

    // show data template
    $http.get('api/sell').then(function(response){
        $scope.sellList = [];
        for(var i=0; i<response.data.length; i++){
            var addSell={};
            addSell.id = response.data[i].id
            addSell.customarName = response.data[i].customarName
            addSell.address = response.data[i].address
            addSell.phone_numbe = response.data[i].phone_numbe
            addSell.due = response.data[i].due
            addSell.payment_date = response.data[i].payment_date
            addSell.paid = response.data[i].paid
            addSell.products = response.data[i].products.product_name
            addSell.payment_type = response.data[i].payment_type.payment
            addSell.quantity = response.data[i].quantity
            addSell.price = response.data[i].price
            addSell.date = response.data[i].date

            $scope.sellList.push(addSell)
        }
    })


     // payment type select add form
     $http.get('api/payment').then(function(response){
        $scope.salesTypeList = [];
        for(var i=0; i< response.data.length; i++){
            var addItem     = {};
            addItem.id      = response.data[i].id
            addItem.payment = response.data[i].payment
            addItem.date = response.data[i].date
            $scope.salesTypeList.push(addItem);
        }
    });

    // products
    $http.get('api/products').then(function(response){
        $scope.productList = [];
        for(var i=0; i< response.data.length; i++){
            var addItem = {};
            addItem.id           = response.data[i].id
            addItem.product_name = response.data[i].product_name
            addItem.category_name= response.data[i].category_name.name
            addItem.price        = response.data[i].price
            addItem.image        = response.data[i].image
            addItem.description  = response.data[i].description
            addItem.brand_name   = response.data[i].brand_name
            addItem.create_at    = response.data[i].create_at
            $scope.productList.push(addItem);
        }
    });



    // Add sell product
    $scope.sellProduct = function(){
        $http({
            method  : 'post',
            url     : 'api/add-sell',
            data    : {
                customarName : $scope.customarName,
                address      : $scope.address,
                phone_numbe  : $scope.phone_numbe,
                due          : $scope.due,
                paid         : $scope.paid,
                products     : $scope.products,
                payment_type : $scope.payment_type,
                quantity     : $scope.quantity,
                price        : $scope.price,
            },
            headers : { 'Content-Type': 'application/json' }   
        }).then(function success (response){
            $scope.sellList.push(response.data);
            toastr.success('Product sell successfully');
        })
    }

    // current item edit click model
    $scope.currentItem = function(sell){
        $scope.id   = sell.id
        $scope.edit = sell
    }

    // Detials page
    $scope.detialsSell = function(id){
        console.log("View page");
    }

    // update Sales product
    $scope.updateSellProduct = function(id){
        $http({
            method  : 'put',
            url     : 'api/sell/'+id,
            data    : {
                customarName : $scope.edit.customarName,
                address      : $scope.edit.address,
                phone_numbe  : $scope.edit.phone_numbe,
                due          : $scope.edit.due,
                paid         : $scope.edit.paid,
                products     : $scope.edit.products,
                payment_type : $scope.edit.payment_type,
                quantity     : $scope.edit.quantity,
                price        : $scope.edit.price,
            },
            headers : { 'Content-Type': 'application/json' }
        }).then(function success(response){
            toastr.success('Sell has been updated');
        })
    }

    // Delete sales product
    $scope.deleteItem = function(id){
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
        swal({
            title: "Are you sure?",
            text: "You will be Delete",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
          },
          function(isConfirm) {
            if (isConfirm) {
                $http({
                    method  : 'delete',
                    url     : 'api/delete-sell/'+id,
                    headers : { 'Content-Type': 'application/json' }
                }).then(function success (response){
                    $scope.sellList.splice(response.id, 1);
                    toastr.success('Sell customar deleted');
                });
            } else {
              swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
          });
    }
})
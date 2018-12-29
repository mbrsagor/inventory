app.controller('stockinController', function($scope, $http){
    $scope.pageTitle = "Product Stock";

    // Show product stock-In template
    $http.get('stock/api/stockin').then(function(response){
        $scope.StockInList = [];
        for (var i = 0; i < response.data.length; i++) {
            var stockIn  = {};
            stockIn.id         = response.data[i].id
            stockIn.quantity   = response.data[i].quantity
            stockIn.warranty   = response.data[i].warranty
            stockIn.price      = response.data[i].price
            stockIn.wholesale  = response.data[i].wholesale
            stockIn.barcode    = response.data[i].barcode
            stockIn.invoice    = response.data[i].invoice
            stockIn.product    = response.data[i].product.product_name
            stockIn.date       = response.data[i].date
            stockIn.stock_in   = response.data[i].stock_in
            stockIn.stock_out  = response.data[i].stock_out
            stockIn.category   = response.data[i].category.name
            stockIn.agent      = response.data[i].agent.company_name
            stockIn.pay_status = response.data[i].pay_status.payment
            $scope.StockInList.push(stockIn)
            // console.log(StockInList = 'quantity'.length)
        }
    });

     // Show product in drop down menu
     $http.get('api/products').then(function(response){
        $scope.productList = [];
        for(var i=0; i< response.data.length; i++){
            var addItem = {};
            addItem.id           = response.data[i].id
            addItem.product_name = response.data[i].product_name
            addItem.category_name= response.data[i].category_name
            addItem.price        = response.data[i].price
            addItem.image        = response.data[i].image
            addItem.description  = response.data[i].description
            addItem.brand_name   = response.data[i].brand_name
            addItem.create_at    = response.data[i].create_at
            $scope.productList.push(addItem);
        }
    });

     // Show category in drop down menu
     $http.get('api/category').then(function(response){
        $scope.categoryList = [];
        for (var i = 0; i < response.data.length; i++) {
            var addItem  = {};
            addItem.id   = response.data[i].id
            addItem.name = response.data[i].name
            addItem.date = response.data[i].date
            $scope.categoryList.push(addItem)
        }
    });

     // Show pay status in drop down menu
     $http.get('api/payment').then(function(response){
        $scope.payStatus = [];
        for(var i=0; i< response.data.length; i++){
            var addItem     = {};
            addItem.id      = response.data[i].id
            addItem.payment = response.data[i].payment
            addItem.date = response.data[i].date
            $scope.payStatus.push(addItem);
        }
    });

    // Show agent/vendor in drop down menu
    $http.get('agents/api/vendor').then(function(response){
        $scope.vendorList = [];
        for(var i=0; i< response.data.length; i++){
            var addVender     = {};
            addVender.id = response.data[i].id
            addVender.agent_name = response.data[i].agent_name
            addVender.address = response.data[i].address
            addVender.phone_number = response.data[i].phone_number
            addVender.email_address = response.data[i].email_address
            addVender.company_name = response.data[i].company_name
            addVender.nid_card = response.data[i].nid_card
            addVender.profile_pic = response.data[i].profile_pic
            $scope.vendorList.push(addVender);
        }
    });


    // Add stock-In product
    $scope.StockIn = function(){
        $http({
            method  : 'post',
            url     : 'stock/api/add-stockin',
            data    :{
                product : $scope.product,
                category : $scope.category,
                agent : $scope.agent,
                pay_status : $scope.pay_status,
                quantity : $scope.quantity,
                warranty : $scope.warranty,
                stock_in : $scope.stock_in,
                stock_out : $scope.stock_out,
                price : $scope.price,
                deu_amount : $scope.deu_amount,
                wholesale : $scope.wholesale,
                barcode : $scope.barcode,
                invoice : $scope.invoice,
            },
            headers: { 'Content-Type': 'application/json' } 
        }).then(function success(response){
            $scope.StockInList.push(response.data);
            toastr.success('Product stock added successfully!');
        })
    }

    // Update popup box
    $scope.currentItem = function(stockin){
        $scope.id      = stockin.id;
        $scope.edit    = stockin;
        console.log(stockin)
    }

    // update stock-In
    $scope.UpdateStockIn = function(id){
        $http({
            method  : 'put',
            url     : 'stock/api/stockin/'+id,
            data    :{
                product : $scope.edit.product,
                category : $scope.edit.category,
                agent : $scope.edit.agent,
                pay_status : $scope.edit.pay_status,
                quantity : $scope.edit.quantity,
                warranty : $scope.edit.warranty,
                price : $scope.edit.price,
                stock_in : $scope.stock_in,
                stock_out : $scope.stock_out,
                deu_amount : $scope.edit.deu_amount,
                wholesale : $scope.edit.wholesale,
                barcode : $scope.edit.barcode,
                invoice : $scope.edit.invoice,
            },
            headers: { 'Content-Type': 'application/json' } 
        }).then(function success(response){
            toastr.success('Stock has been updated');
        })
    }


    // Delete stock-In
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
                    url     : 'stock/api/delete-stockin/'+id,
                    headers : { 'Content-Type': 'application/json' }
                }).then(function success(response){
                    $scope.StockInList.splice(response.data, 1);
                    toastr.success('Stock has been deleted');
                })
            } else {
              swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
          });
    }
})
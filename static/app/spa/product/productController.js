app.controller('productController', function($scope, $http){
    $scope.pageTitle = "Product page";

    // Show product in template
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

    // Show category option value
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

    // Add New product
    $scope.addNewProduct = function(){
        $http({
            method   : 'post',
            url      : 'api/add-product',
            data     : {
              product_name  : $scope.product_name,  
              price         : $scope.price,  
              image         : $scope.image,    
              brand_name    : $scope.brand_name,  
              description   : $scope.description,
              category_name : $scope.category_name.name,
            },
            headers : { 'Content-Type': 'application/json' }
        }).then(function success (response){
            $scope.productList.push(response.data);
            toastr.success('product added successfully');
        });

         // model close
         var modal_popup = angular.element('#ProductModel');
         modal_popup.modal('hide');

        $scope.product_name = "",
        $scope.price        = "",
        $scope.image        = "",
        $scope.description  = "",
        $scope.brand_name   = "", 
        $scope.category_name= ""
    }

    // Current Item Click
    $scope.currentItem = function(product){
        $scope.id = product.id;
        $scope.updateItems = product
    }

    // Update product
    $scope.updateProduct = function(id){
        $http({
            method  : 'put',
            url     : 'api/update/products/'+id,
            data     : {
                product_name  : $scope.updateItems.product_name,  
                price         : $scope.updateItems.price,  
                image         : $scope.updateItems.image,    
                brand_name    : $scope.updateItems.brand_name,  
                description   : $scope.updateItems.description,
                category_name : $scope.updateItems.category_name,
            },
            headers : { 'Content-Type': 'application/json' }
        }).then(function success (response){
            toastr.success('Product has been updated');
        })
    }

    // Delete Product
    $scope.deleteItem = function(id) {
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
                    method    : 'delete',
                    url       : 'api/delete-products/'+id,
                    headers : { 'Content-Type': 'application/json' }
                }).then(function success(response){
                    $scope.productList.splice(response.data, 1);
                    toastr.success('product Deleted');
                })
            } else {
              swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
          });
    }
})
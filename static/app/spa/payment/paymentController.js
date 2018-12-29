app.controller('paymentController', function($scope, $http){
    $scope.pageTitle = "Payment Option";

    // Show data template
    $http.get('api/payment').then(function(response){
        $scope.salesTypeList = [];
        for(var i=0; i< response.data.length; i++){
            var addItem     = {};
            addItem.id      = response.data[i].id
            addItem.payment = response.data[i].payment
            addItem.date    = response.data[i].date
            $scope.salesTypeList.push(addItem);
        }
    });

    // Add new sales type
    $scope.addSalesType = function(){
        $http({
            method : 'post',
            url    : 'api/add-payment',
            data   : {payment: $scope.payment},
            headers: { 'Content-Type': 'application/json' }
        }).then(function success (response){
            $scope.salesTypeList.push(response.data);
            toastr.success('Payment option added successfully');
        });
        // model close
        var modal_popup = angular.element('#salestype');
        modal_popup.modal('hide');
        $scope.payment = "";
    }

    // Modal current item
    $scope.currentItem = function(saelstype){
        $scope.id          = saelstype
        $scope.updateItems = saelstype
    }

    // update sales type
    $scope.updateSales = function(id){
        $http({
            method  : 'put',
            url     : 'api/payment/'+id,
            data    : {payment: $scope.updateItems.payment},
            headers : { 'Content-Type': 'application/json' }
        }).then(function success(response){
            $scope.salesTypeList.push(response.data);
            toastr.success('Payment option has been updated');
        })
    }


    // Delete Item
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
                    url     : 'api/delete-payment/'+id,
                    headers : { 'Content-Type': 'application/json' }
                }).then(function success(response){
                    $scope.salesTypeList.splice(response.data, 1);
                    toastr.success('Payment option Deleted');
                })
            } else {
              swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
          });
    }
})
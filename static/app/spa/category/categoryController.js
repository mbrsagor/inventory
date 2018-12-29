app.controller('categoryController', function($scope, $http){
    $scope.pageTitle = "Product category page";

    // Show category template
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

    // Add new category
    $scope.addCategory = function(){
        $http({
            method : 'post',
            url    : 'api/category',
            data   : {
            name   : $scope.name,
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function success (response){
            $scope.categoryList.push(response.data);
            toastr.success('Category added successfully');
        });

        // model close
        var modal_popup = angular.element('#Modal2');
        modal_popup.modal('hide');
        $scope.name = "";
    }


    // Modal box click current Item
    $scope.currentItem = function(category){
        // console.log(category);
        $scope.editCategory = category;
        $scope.id = category.id;
    }

    // update category
    $scope.updateCategory = function(id){
        $http({
            method  : 'put',
            url     : 'api/category/'+id+"/",
            data    : {name : $scope.editCategory.name},
            headers : { 'Content-Type': 'application/json' }
        }).then(function success(response){
            toastr.success('Category has been updated');
        })
    }


    // Delete category
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
                    url     : 'api/category/'+id,
                    headers : { 'Content-Type': 'application/json' }
                }).then(function success (response){
                    $scope.categoryList.splice(response.id, 1);
                    toastr.success('Category deleted');
                });
            } else {
              swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
          });
    }

})
app.controller('userController', function($scope, $http){
    $scope.pageTitle = "User page";

    // show user template
    $http.get('agents/api/users').then(function(response){
        $scope.userList = [];
        for(var i=0; i<response.data.length; i++){
            var addUsers = {}
            addUsers.id = response.data[i].id
            addUsers.username = response.data[i].username
            addUsers.email = response.data[i].email
            addUsers.password = response.data[i].password
            $scope.userList.push(addUsers)
            // console.log(response);
        }
    });

    // add new user 
    $scope.adduser = function(){
        $http({
            method  : 'post',
            url     : 'agents/api/add-user',
            data    : {username: $scope.username, email:$scope.email, password:$scope.password},
            headers : { 'Content-Type': 'application/json' }
        }).then(function success(response){
            $scope.userList.push(response.data);
            toastr.success('User created successfully');
            // console.log(response);
        })
        // model close
        var modal_popup = angular.element('#usersAdd');
        modal_popup.modal('hide');
        $scope.username = ''
        $scope.email = ''
        $scope.password = ''
    }

    // Popup box click current item
    $scope.currentItem = function(user){
        $scope.id = user.id;
        $scope.edit = user;
    }

    // Update users
    $scope.updateUser = function(id){
        $http({
            method  : 'put',
            url     : 'agents/api/users/'+id,
            data    : {username: $scope.edit.username, email:$scope.edit.email, password:$scope.edit.password},
            headers : { 'Content-Type': 'application/json' }
        }).then(function success(response){
            toastr.success('User has been updated');
        })
    }

     // User delete 
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
                    url     : 'agents/api/delete-user/'+id,
                    headers : { 'Content-Type': 'application/json' }
                }).then(function success(response){
                    $scope.userList.splice(response.data, 1);
                    toastr.success('User has been deleted');
                })
            } else {
              swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
          });
    }
})
app.controller('vendorController', function($scope, $http){
    $scope.pageTitle = "Total vendor list";

    // Show vendor template
    $http.get('agents/api/vendor').then(function(response){
        $scope.vendorList = [];
        for(var i=0; i< response.data.length; i++){
            var addVender = {};
            addVender.id           = response.data[i].id
            addVender.agent_name   = response.data[i].agent_name.username
            addVender.address      = response.data[i].address
            addVender.phone_number = response.data[i].phone_number
            addVender.email_address= response.data[i].email_address
            addVender.company_name = response.data[i].company_name
            addVender.nid_card     = response.data[i].nid_card
            addVender.profile_pic  = response.data[i].profile_pic
            addVender.create_date  = response.data[i].create_date
            $scope.vendorList.push(addVender);
        }
    });

     // show user drop done menu
     $http.get('agents/api/users').then(function(response){
        $scope.userList = [];
        for(var i=0; i<response.data.length; i++){
            var addUsers = {}
            addUsers.id = response.data[i].id
            addUsers.username = response.data[i].username
            addUsers.email = response.data[i].email
            addUsers.password = response.data[i].password
            $scope.userList.push(addUsers)
        }
    });
    
    // Add vendor
    $scope.addVendor = function(){
        $http({
            method  : 'post',
            url     : 'agents/api/add-vendor',
            data    : {

                agent_name   : $scope.agent_name,
                address      : $scope.address,
                phone_number : $scope.phone_number,
                email_address: $scope.email_address,
                company_name : $scope.company_name,
                nid_card     : $scope.nid_card,
                profile_pic  : $scope.profile_pic
               
            },
            headers: { 'Content-Type': 'application/json' }
            
        }).then(function success(response){
            $scope.vendorList.push(response.data);
            toastr.success('Vendor created successfully');
            // console.log(response.data)
        })

         // model close
         var modal_popup = angular.element('#vendor');
         modal_popup.modal('hide');
         
         $scope.agent_name    = ''
         $scope.address       = ''
         $scope.phone_number  = ''
         $scope.email_address = ''
         $scope.company_name  = ''
         $scope.nid_card      = ''
         $scope.profile_pic   = ''         

    }

    // model update
    $scope.currentItem = function(vendor){
        $scope.id    = vendor.id
        $scope.edit  = vendor;
    }

    // update vendor profile
    $scope.UpdateVendor = function(id){
        $http({
            method  : 'put',
            url     : 'agents/api/vendor/'+id,
            data    : {

                agent_name   : $scope.edit.agent_name,
                address      : $scope.edit.address,
                phone_number : $scope.edit.phone_number,
                email_address: $scope.edit.email_address,
                company_name : $scope.edit.company_name,
                nid_card     : $scope.edit.nid_card,
                profile_pic  : $scope.edit.profile_pic
               
            },
            headers : { 'Content-Type': 'application/json' }
        }).then(function success (response){
            toastr.success('Vendor has been updated');
        })
    }

    // Delete Vendor
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
                    url     : 'agents/api/delete-vendor/'+id,
                    headers : { 'Content-Type': 'application/json' }
                }).then(function success(response){
                    $scope.vendorList.splice(response.data, 1);
                    toastr.success('Vendor has been deleted');
                })
            } else {
              swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
          });
    }
})
app.controller('loginController', function($scope, $http, $location, $localStorage){
    $scope.pageTitle = "Inventory Login";

    // login button onclick
    $scope.loginBtn = function(){
        $http({
            method  : 'post',
            url     : 'api/rest-auth/login/',
            data    : {username: $scope.username, password: $scope.password},
            headers : { 'Content-Type': 'application/json' }
        }).then(function success(response){
            $localStorage.token = response.data.key;
            $location.path('/');
        }),
        function (error){
            if(error==400){
                toastr.success("Sorry!! usernaem and password dosn't match.");
                console.log("Login failed");
            }else if(error==50){
                toastr.success("Invalid password");
            }
        }
    }
})
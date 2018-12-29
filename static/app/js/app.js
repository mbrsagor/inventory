var app = angular.module('inventoryApp', [
    'ngRoute',
    'angularUtils.directives.dirPagination',
    'zingchart-angularjs',
    'ngStorage',
]);


// configure routes
app.config(function($routeProvider, $httpProvider, $locationProvider){
    // csrf token
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // html5 mode enable
    $locationProvider.html5Mode({ enabled: true, requireBase: true });
    $locationProvider.hashPrefix('!');
    
    $routeProvider
    .when('/', {
        url         : '/',
        templateUrl : 'static/app/spa/dashboard/dashboard.html',
        controller  : 'dashboardController',
        authenticate: true,
     })
    .when('/product-management/category', {
        url         : '/product-management/category',
        templateUrl : 'static/app/spa/category/category.html',
        controller  : 'categoryController'
    })
    .when('/product-management/product', {
        url         : '/product-management/product',
        templateUrl : 'static/app/spa/product/product.html',
        controller  : 'productController'
    })
    .when('/product-management/payment', {
        url         : '/product-management/payment',
        templateUrl : 'static/app/spa/payment/payment.html',
        controller  : 'paymentController'
    })
    .when('/product-management/sell', {
        url         : '/product-management/sell',
        templateUrl : 'static/app/spa/sell/sell.html',
        controller  : 'sellController'
    })
    .when('/stock-management/stockin', {
        url         : '/stock-management/stockin',
        templateUrl : 'static/app/spa/stockin/stockin.html',
        controller  : 'stockinController'
    })
    .when('/add-clint/vendor', {
        url         : '/add-clint/vendor',
        templateUrl : 'static/app/spa/vendor/vendor.html',
        controller  : 'vendorController'
    })
    .when('/users/add-user', {
        url         : '/users/add-user',
        templateUrl : 'static/app/spa/users/user.html',
        controller  : 'userController'
    })
    .when('/login', {
        url         : '/login',
        templateUrl : 'static/app/spa/auth/login.html',
        controller  : 'loginController'
    })
    .otherwise({
        template: "<h1>Page not found</h1>"
    });

});

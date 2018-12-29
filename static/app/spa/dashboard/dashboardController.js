app.controller('dashboardController', function($scope, $http){
    $scope.pageTitle = "Dashboard";

    // Count product
    $http.get('api/products').then(function(response){
        $scope.productCount = [];
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
            $scope.productCount.push(addItem)

        } 
    });  
     // Count category
     $http.get('api/category').then(function(response){
        $scope.countCategory = [];
        for (var i = 0; i < response.data.length; i++) {
            var addItem  = {};
            addItem.id   = response.data[i].id
            addItem.name = response.data[i].name
            addItem.date = response.data[i].date
            $scope.countCategory.push(addItem)
        }
    });

    // Count user
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

    // Count vendor
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
            $scope.vendorList.push(addVender);
           
        }
    });

    // Recent Sales
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

     // stock count 
     $http.get('stock/api/stockin').then(function(response){
        var listMonth = [];
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
            stockIn.product    = response.data[i].product
            stockIn.date       = response.data[i].date
            stockIn.status     = response.data[i].status
            stockIn.category   = response.data[i].category
            stockIn.agent      = response.data[i].agent.username
            stockIn.pay_status = response.data[i].pay_status
            $scope.StockInList.push(stockIn)
           

            var objDate = new Date(response.data[i].date),
            locale = "en-us",
            month = objDate.toLocaleString(locale, { month: "long" });
            listMonth.push(month);
        }

    // chart
    var myConfig = {
        "type":"bar3d",
        "background-color":"#fff",
        "3d-aspect":{
            "true3d":0,
            "y-angle":10,
            "depth":30
        },
        "legend":{
            "layout":"float",
            "background-color":"none",
            "border-color":"none",
            "item":{
                "font-color":"#333"
            },
            "x":"37%",
            "y":"10%",
            "width":"90%",
            "shadow":0
        },
        "plotarea":{
            "margin":"95px 35px 50px 70px",
            "background-color":"#fff",
            "alpha":0.3
        },
        "scale-y":{
            "background-color":"#fff",
            "border-width":"1px",
            "border-color":"#333",
            "alpha":0.5,
            "format":"$%v",
            "guide":{
                "line-style":"solid",
                "line-color":"#333",
                "alpha":0.2
            },
            "tick":{
                "line-color":"#333",
                "alpha":0.2
            },
            "item":{
                "font-color":"#333",
                "padding-right":"6px"
            }
        },
        "scale-x":{
            "background-color":"#fff",
            "border-width":"1px",
            "border-color":"#333",
            "alpha":0.5,
            "values":listMonth,
            "guide":{
                "visible":false
            },
            "tick":{
                "line-color":"#333",
                "alpha":0.2
            },
            "item":{
                "font-size":"11px",
                "font-color":"#333"
            }
        },
        "series":[
            {
                "values":[22650,18750,29050,28745,31500,31625],
                "text":"Stock-In",
                "background-color":"#03A9F4 #4FC3F7",
                "border-color":"#03A9F4",
                "legend-marker":{
                    "border-color":"#03A9F4"
                },
                "tooltip":{
                    "background-color":"#03A9F4",
                    "text":"$%v",
                    "font-size":"12px",
                    "padding":"6 12",
                    "border-color":"none",
                    "shadow":0,
                    "border-radius":5
                }
            },
            {
                "values":[24200,12750,24250,11500,22550,24250],
                "text":"Stock-Out",
                "background-color":"#673AB7 #9575CD",
                "border-color":"#673AB7",
                "legend-marker":{
                    "border-color":"#673AB7"
                },
                "tooltip":{
                    "background-color":"#673AB7",
                    "text":"$%v",
                    "font-size":"12px",
                    "padding":"6 12",
                    "border-color":"none",
                    "shadow":0,
                    "border-radius":5
                }
            }
        ]
    };
     
    zingchart.render({ 
        id : 'myChart', 
        data : myConfig, 
        defaults:{
          'font-family':'sans-serif'
        }
    });
});


})
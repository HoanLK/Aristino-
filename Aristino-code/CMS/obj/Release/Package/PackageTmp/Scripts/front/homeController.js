frontApp.controller("homeController", ['$scope', '$http', '$window', 'CategoryProduct', function ($scope, $http, $window, CategoryProduct) {
    $scope.spMois = [];
    $scope.spNoiBats = [];
    $scope.giftForMens1 = [];
    $scope.giftForMens2= [];
    $scope.giftForMens3 = [];
    $scope.kms = [];
    $scope.aristino360s = [];

    //Lấy sản phẩm mới
    $http.get('/API/ProductsAPI?att=spMoi&&value=1')
       .success(function (data) {
           $scope.spMois = data;
       });

    //Lấy sản phẩm nỏi bật
    $http.get('/API/ProductsAPI?att=spNoiBat&&value=1')
       .success(function (data) {
           $scope.spNoiBats = data;
       });

    
    $http.get('/API/ProductsAPI?att=giftForMenHome&&value=20')
       .success(function (data) {
           $scope.giftForMens1 = data;
       });

    
    $http.get('/API/ProductsAPI?att=giftForMenHome&&value=21')
       .success(function (data) {
           $scope.giftForMens2 = data;
       });

    
    $http.get('/API/ProductsAPI?att=giftForMenHome&&value=22')
       .success(function (data) {
           $scope.giftForMens3 = data;
       });

    //Lấy tin khuyến mại
    $http.get('/API/PostsAPI?att=home&&value=4')
       .success(function (data) {
           $scope.kms = data;
       });

    //Lấy tin tức
    $http.get('/API/PostsAPI?att=home&&value=3')
       .success(function (data) {
           $scope.aristino360s = data;
       });
}]);
frontApp.controller("categoryProductController", ['$scope', '$http', '$window', 'CategoryProduct', function ($scope, $http, $window, CategoryProduct) {
    $scope.categoryProducts = [];
    $scope.products = [];
    $scope.spMois = [];
    $scope.spNoiBats = [];
    $scope.spSales = [];
    $scope.giftForMens1 = [];
    $scope.giftForMens2 = [];
    $scope.giftForMens3 = [];
    $scope.idCategoryProduct = angular.element('#idCategoryProduct').val();
    $scope.product = {};

    //Lấy tất cả danh mục
    $http.get('/API/CategoryProductsAPI?att=idCategoryParent&&value=' + 2)
       .success(function (data) {
           $scope.categoryProducts = data;
       });

    $http.get('/API/ProductsAPI?att=idCategoryProduct&&value=' + $scope.idCategoryProduct)
       .success(function (data) {
           $scope.products = data;
       });

    //Lấy sản phẩm mới
    $http.get('/API/ProductsAPI?att=spMoi&&value=' + $scope.idCategoryProduct)
       .success(function (data) {
           $scope.spMois = data;
       });

    //Lấy sản phẩm nỏi bật
    $http.get('/API/ProductsAPI?att=spNoiBat&&value=' + $scope.idCategoryProduct)
       .success(function (data) {
           $scope.spNoiBats = data;
       });

    //Lấy sản phẩm khuyến mại
    $http.get('/API/ProductsAPI?att=spSale&&value=' + $scope.idCategoryProduct)
       .success(function (data) {
           $scope.spSales = data;
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
}]);
frontApp.controller("productController", ['$scope', '$http', '$window', '$sce', function ($scope, $http, $window, $sce) {
    $scope.product = {};
    $scope.products = [];
    $scope.idCategoryProduct;
    $scope.idProduct = angular.element('#idProduct').val();
    $scope.order = {};
    $scope.thongKe = {};
    $scope.loadThongKe = {};

    $http.get('/API/ProductsAPI/' + $scope.idProduct)
        .success(function (data) {
            $scope.product = data;
            $scope.product.content = $sce.trustAsHtml(data.content);
            $scope.product.timeStart = ($scope.product.timeStart != null) ? new Date($scope.product.timeStart) : null;
            $scope.idCategoryProduct = data.idCategoryProduct;

            //Sản phẩm cùng danh mục
            $http.get('/API/ProductsAPI/')
                .success(function (data) {
                    angular.forEach(data, function (value, key) {
                        if (value.idCategoryProduct == $scope.idCategoryProduct && value.idProduct != $scope.idProduct) {
                            $scope.products.push(value);
                        };
                    });
                });
        });

    //Lưu Order
    $scope.SaveOrder = function () {
        $scope.order.checked = 0;
        $scope.order.idProduct = $scope.idProduct;
        $scope.order.sanPham = $scope.product.title;
        $scope.order.gia = $scope.product.price * $scope.order.soLuong;
        $scope.order.giaSP = $scope.product.price;
        $http.post('/API/OrderAPI/', $scope.order)
        .success(function () {
            toastr.success('Thành công', 'Đặt hàng');
        })
        .error(function () {
            toastr.error('Thất bại', 'Đặt hàng');
        });
        $http.get('/API/ThongKeAPI?value=' + $scope.order.SDT)
            .success(function (data) {
                //Tăng số lần mua nếu có
                $scope.thongKe.id = data.id;
                $scope.thongKe.ten = $scope.order.hoTen;
                $scope.thongKe.diaChi = data.diaChi;
                $scope.thongKe.SDT = data.SDT;
                $scope.thongKe.email = data.email;
                $scope.thongKe.soLanMuaHang = data.soLanMuaHang + 1;
                $http.put('/API/ThongKeAPI/' + $scope.thongKe.id, $scope.thongKe)
            })
            .error(function () {
                //Thêm mới nếu chưa có
                $scope.thongKe.ten = $scope.order.hoTen;
                $scope.thongKe.diaChi = $scope.order.diaChi;
                $scope.thongKe.SDT = $scope.order.SDT;
                $scope.thongKe.email = $scope.order.email;
                $scope.thongKe.soLanMuaHang = 1;
                $http.post('/API/ThongKeAPI/', $scope.thongKe)
            });
    }

    $scope.size38 = function () {
        $scope.order.kichThuoc = '38';
    }

    $scope.size39 = function () {
        $scope.order.kichThuoc = '39';
    }

    $scope.size40 = function () {
        $scope.order.kichThuoc = '40';
    }

    $scope.size41 = function () {
        $scope.order.kichThuoc = '41';
    }

    $scope.size42 = function () {
        $scope.order.kichThuoc = '42';
    }

    $scope.size43 = function () {
        $scope.order.kichThuoc = '43';
    }

    $scope.sizeS = function () {
        $scope.order.kichThuoc = 'S';
    }

    $scope.sizeM = function () {
        $scope.order.kichThuoc = 'M';
    }

    $scope.sizeL = function () {
        $scope.order.kichThuoc = 'L';
    }

    $scope.sizeXL = function () {
        $scope.order.kichThuoc = 'XL';
    }

    $scope.sizeXXL = function () {
        $scope.order.kichThuoc = 'XXL';
    }
}]);
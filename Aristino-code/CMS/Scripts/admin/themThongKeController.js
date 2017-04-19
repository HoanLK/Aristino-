myApp.controller("themThongKeController", ['$scope', '$http', '$window', '$location', '$filter', 'Url', function ($scope, $http, $window, $location, $filter, Url) {
    $scope.ThongKe = {};

    //Lấy idThongKe từ Url
    $scope.currentIdThongKe = Url.getParameterByName('id');

    //Nếu sửa thì trả về giá trị của ThongKe
    if ($scope.currentIdThongKe) {
        $http.get('/API/ThongKeAPI/' + $scope.currentIdThongKe)
            .success(function (data) {
                $scope.ThongKe = {
                    id: data.id,
                    ten: data.ten,
                    diaChi: data.diaChi,
                    SDT: data.SDT,
                    email: data.email,
                    soLanMuaHang: data.soLanMuaHang,
                };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
    }

    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/ThongKes';
    };
}]);
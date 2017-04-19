myApp.controller("danhsachThongKeController", ['$scope', '$http', '$window', 'Category', 'MenuMultiLevel', 'uiGridConstants', function ($scope, $http, $window, Category, MenuMultiLevel, uiGridConstants) {
    $scope.gridOptions = {};

    //Lấy danh sách ThongKe
    $http.get('/API/ThongKeAPI/').success(function (data) {
        $scope.gridOptions.data = data;
    });

    //Tùy chỉnh Column
    $scope.gridOptions.rowHeight = 50;
    $scope.gridOptions.columnDefs =
    [
        {
            displayName: "STT",
            name: 'stt',
            enableCellEdit: false,
            enableSorting: false,
            enableFiltering: false,
            width: 55,
            cellTemplate: '<div class="ui-grid-cell-contents text-center">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
        },
        {
            displayName: "Họ tên",
            name: 'ten',
        },
        {
            displayName: "Địa chỉ",
            name: 'diaChi',
        },
        {
            displayName: "Số đt",
            name: 'SDT',
            width: 150,
        },
        {
            displayName: "Email",
            name: 'email',
            width: 200,
        },
        {
            displayName: "Lần mua hàng",
            name: 'soLanMuaHang',
            width: 120,
        },
        {
            displayName: "",
            name: 'delete',
            enableSorting: false,
            enableFiltering: false,
            width: 100,
            enableCellEdit: false,
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.EditThongKe(row.entity.id)"><span class="fa fa-eye"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeleteThongKe(row.entity.id)"><span class="fa fa-bitbucket"></span></button></div>',
        }
    ];

    //Tim kiem
    $scope.gridOptions.enableFiltering = true;
    //Select
    $scope.gridOptions.enableRowSelection = true;
    $scope.gridOptions.enableRowHeaderSelection = false;
    $scope.gridOptions.multiSelect = false;

    //Grid API
    $scope.gridOptions.onRegisterApi = function (gridApi) {

    };

    //Edit
    $scope.EditThongKe = function (id) {
        $window.location.href = '/Admin/ThongKes/Create?id=' + id;
    }

    //Delete
    $scope.DeleteThongKe = function (id)) {
        var id) = id);

        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            //Xóa
            $http.delete('/API/ThongKeAPI/' + id))
            .success(function () {
                $http.get('/API/ThongKeAPI/').success(function (data) { $scope.gridOptions.data = data; });
                toastr.success('Thành công', 'Xóa');
            });
        }
    }
}]);
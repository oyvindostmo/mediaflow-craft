var mediaflow = angular.module('mediaflow', []);
mediaflow.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});

mediaflow.filter('sizeConverter', function () {
    return function (size, precision) {

        if (precision == 0 || precision == null) {
            precision = 1;
        }
        if (size == 0 || size == null) {
            return "";w
        }
        else if (!isNaN(size)) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            var posttxt = 0;

            if (size < 1024) {
                return Number(size) + " " + sizes[posttxt];
            }
            while (size >= 1024) {
                posttxt++;
                size = size / 1024;
            }

            var power = Math.pow(10, precision);
            var poweredVal = Math.ceil(size * power);

            size = poweredVal / power;

            return size + " " + sizes[posttxt];
        } else {
            console.log('Error: Not a number.');
            return "";
        }

    }
});

mediaflow.controller('MediaFlowFieldCtrl', function ($scope, $http) {
    $scope.connection = true;
    $scope.showMedia = false;
    $scope.media = [];
    $scope.testConnection = function () {
        $http.get('/admin/mediaflow/check').success(function (result) { 
            $scope.connection = result;
        });
    };
    $scope.testConnection();
    $scope.getMedia = function () {
        $http.get('/admin/mediaflow/media').success(function (result) { 
            $scope.media = result;
        });
    };
    $scope.getMedia();

    $scope.select = function (medium) {
        $scope.selected = medium;
    };
});

mediaflow.controller('MediaFlowBrowseCtrl', function ($scope, $http) {
    $scope.connection = true;
    $scope.searchText = '';
    $scope.view = 'list';
    $scope.media = [];
    $scope.testConnection = function () {
        $http.get('/admin/mediaflow/check').success(function (result) { 
            $scope.connection = result;
        });
    };
    $scope.testConnection();
    $scope.getMedia = function () {
        $http.get('/admin/mediaflow/media').success(function (result) { 
            $scope.media = result;
        });
    };
    $scope.getMedia();
});

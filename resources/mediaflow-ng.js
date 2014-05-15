var mediaflow = angular.module('mediaflow', ['angularFileUpload']);
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

    $scope.onFileSelect = function($files) {
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            $scope.upload = $upload.upload({
                url: '/admin/mediaflow/upload',
                file: $file,
                progress: function(evt) {
                    // TODO
                }
            }).success(function(data, status, headers, config) {
                    $scope.getMedia();
                });
        }
    }
});

mediaflow.controller('MediaFlowBrowseCtrl', function ($scope, $http, $upload) {
    $scope.connection = true;
    $scope.searching = false;
    $scope.searchText = '';
    $scope.view = 'list';
    $scope.media = [];
    $scope.testConnection = function () {
        $http.get('/admin/mediaflow/check').success(function (result) {
            $scope.connection = result;
        });
    };
    $scope.testConnection();
    $scope.getMedia = function (search) {
        var url = '/admin/mediaflow/media';
        var config = {};
        if (search) config.params = {q: search};
        $scope.searching = true;
        $http.get(url, config).success(function (result) {
            $scope.media = result;
            $scope.searching = false;
        });
    };
    $scope.getMedia();

    $scope.$watch('searchText', function(searchText, ov) {
        if (searchText === ov) return;
        setTimeout(function() {
            if (searchText == $scope.searchText) {
                $scope.getMedia($scope.searchText);
            }
        }, 250);
    });

    $scope.onFileSelect = function($files) {
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            $scope.upload = $upload.upload({
                url: '/admin/mediaflow/upload',
                file: $file,
                progress: function(evt) {
                    // TODO
                }
            }).success(function(data, status, headers, config) {
                    $scope.getMedia();
                });
        }
    }
});

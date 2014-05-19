var mediaflow = angular.module('mediaflow', ['angularFileUpload']);
mediaflow.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});

mediaflow.filter('sizeConverter', function () {
    return function (size, precision) {
        precision = precision || 0;

        if (!size) { return ''; }

        if (isNaN(size)) {
            console.log('Error: Not a number.');
            return '';
        }

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
    }
});

mediaflow.controller('MediaFlowFieldCtrl', function ($scope, $http, $upload) {
    $scope.connection = true;
    $scope.showMedia = false;
    $scope.spin = false;
    $scope.searchText = '';
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
        $scope.spin = true;
        $http.get(url, config).success(function (result) {
            $scope.media = result;
            $scope.spin = false;
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

    $scope.select = function (medium) {
        $scope.selected = medium;
        $scope.showMedia = false;
    };

    $scope.triggerFileSelect = function($event) {
        var $target = $event.currentTarget;
        if (!$target) { return; }
        var $parent = $target.parentNode;
        if (!$parent) { return; }
        var $el = $parent.querySelector('[type="file"]');
        if (!$el) { return; }
        $el.click();
    };

    $scope.onFileSelect = function($files) {
        $scope.spin = true;
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            $scope.upload = $upload.upload({
                url: '/admin/mediaflow/upload',
                file: $file,
                progress: function(evt) {
                    // TODO
                }
            }).then(function(args) {
                $scope.media.unshift(args.data);
                $scope.spin = false;
            }, function(args) {
                console.log('err', args);
                $scope.spin = false;
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

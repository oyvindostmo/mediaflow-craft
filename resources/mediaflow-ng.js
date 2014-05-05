var mediaflow = angular.module('mediaflow', []);
mediaflow.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});
mediaflow.controller('MediaFlowFieldCtrl', function($scope, $http){
    $scope.connection = false;
    $scope.showMedia = false;
    $scope.media = [];
    $scope.testConnection = function() {
        $http.get('/admin/mediaflow/check').success(function(result) { // FIXME
            $scope.connection = result;
        });
    };
    $scope.testConnection();
    $scope.getMedia = function () {
        $http.get('/public/index.php/admin/mediaflow/media').success(function(result) { // FIXME
            $scope.media = result;
        });
    };
    $scope.getMedia();

    $scope.select = function(medium) {
        $scope.selected = medium;
    };
});

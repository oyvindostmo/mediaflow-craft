var mediaflow = angular.module('mediaflow', []);
mediaflow.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});
mediaflow.controller('MediaFlowFieldCtrl', function($scope, $http){
    $scope.connection = true; //false;
    $scope.media = [];
    $scope.testConnection = function() {
        $http.get('mediaflow/settings/connection').success(function(data) {

            //$scope.connection = data;
        });
    }
    $scope.getMedia = function () {
        $scope.media = []
    };
});


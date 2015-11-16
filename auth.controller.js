(function(){
    'use strict';
  
    angular.module('myMenuApp.controllers')
    .controller("authCtrl", function ($rootScope,$scope, $http, $location, authUrl) {

        $scope.authenticate = function (user, pass) {
            $http.post(authUrl, {
                username: user,
                password: pass
            }, {
                withCredentials: true
            }).success(function (data) {
                $location.path("/");
                $rootScope.isAuthenticated = true;
                $rootScope.username = user;
            }).error(function (error) {
                $scope.authenticationError = error;
                $scope.errorMessage = error.ExceptionMessage;
                $rootScope.isAuthenticated = false;
            });
        }
    });
})();
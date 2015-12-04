(function(){
    'use strict';
  
    angular.module('myMenuApp.controllers')
    .controller("authCtrl", function ($rootScope,$scope, $http, $location, apiUrl) {

        $scope.authenticate = function (user, pass) {
            $http.post(apiUrl + 'users/Postusers', {
                username: user,
                password: pass
            }, {
                withCredentials: true
            }).success(function (data) {
                $location.path("/");
                $rootScope.isAuthenticated = true;
                $rootScope.username = user;
                $rootScope.userid = data.id;
                //$rootScope.projects = [];
            }).error(function (error) {
                $scope.authenticationError = error;
                $scope.errorMessage = error.ExceptionMessage;
                $rootScope.isAuthenticated = false;
            });
        }
    });
})();
'use strict'

angular
  .module('gifGoldblum', ['ngRoute'])
  .config(($routeProvider, $sceProvider) => {
    $sceProvider.enabled(false);

    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        templateUrl: 'partials/main.html',
      })
      .when('/giffify', {
        controller: 'URLCtrl',
        templateUrl: 'partials/view.html',
      })
    }
  )
  .controller('MainCtrl', function ($scope, $rootScope, $location, $http) {
    let submissionUrl = "";

    $scope.submitUrl = () => {
      submissionUrl = $scope.url;

      $http
        .get(`/gif/${submissionUrl}`)
        .then((res) => {
          console.log(res)
          $rootScope.gifDisplay = res.data
          $location.path("/giffify")
        })
    }


  })
  .controller('URLCtrl', function ($scope, $rootScope, $http, $sce) {
    var self = this;
    $sce.trustAsHtml($rootScope.gifDisplay)
    self.explicitlyTrustedHtml = $sce.trustAsHtml;
    $scope.view = "help meee";
  })

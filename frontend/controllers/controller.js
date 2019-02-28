var app = angular.module('myApp', ['ui.router', 'toastr'])
app
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    "$httpProvider",
    function ($stateProvider, $urlRouterProvider, $httpProvider, toastr) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '../index.html',
        })
        .state('findAddress', {
          url: '/findAddress',
          templateUrl: '../findAddress.html',
          controller: 'findAddressCtrl'
        })
        .state('findZip', {
          url: '/findZip',
          templateUrl: '../findZip.html',
          controller: 'findZipCtrl'
        })
      $urlRouterProvider.otherwise('home');

      $httpProvider.interceptors.push(function ($q, toastr) {
        return {
          requestError: function (rejection) {
            toastr.error('Error in request ' + rejection);
            return $q.reject(rejection);
          },
          response: function (result) {
            if (result.data.err) {
              toastr.error('Error ' + result.data.err);
              return $q.reject(result)
            }
            return result;
          },
          responseError: function (response) {
            toastr.error('Error in response' + response);
            return $q.reject(response);
          }
        }
      });

    }
  ]);
var url = "http://localhost:3000";


app.controller('findAddressCtrl', function ($scope, $http) {
  $scope.getAddress = function (addr) {
    $scope.dispAddress = {};
    $http.get(url + '/addressFinder/getAddress', {
      params: {
        zipcode: addr.zipcode
      }
    }).then(function (response) {
      if (response.data.data.city && response.data.data.state && response.data.data.country) {
        $scope.dispAddress.city = response.data.data.city;
        $scope.dispAddress.state = response.data.data.state;
        $scope.dispAddress.country = response.data.data.country;
      } else {
        $scope.dispAddress = "No data found";
      }
    });
  }
});

app.controller('findZipCtrl', function ($scope, $http) {
  $scope.loadCountries = function () {
    $scope.countries = {};
    $http.get(url + '/zipFinder/getCountries').then(function (response) {
      if (response.data) {
        $scope.countries = response.data.data;
      } else {
        $scope.countries = "No data Found"
      }
    })
  }
  $scope.loadCountries();
  $scope.loadStates = function (country) {
    $scope.states = {};
    $http.get(url + '/zipFinder/getStates', {
      params: {
        country: country._id
      }
    }).then(function (response) {
      if (response.data.data) {
        $scope.states = response.data.data;
      } else {
        $scope.states = "No data Found"
      }
    })
  };

  $scope.loadCities = function (state) {
    $scope.cities = {};
    $http.get(url + '/zipFinder/getCities', {
      params: {
        state: state._id
      }
    }).then(function (response) {
      if (response.data.data) {
        $scope.cities = response.data.data;
      } else {
        $scope.cities = "No data Found"
      }
    })
  }

  $scope.getZipCode = function (data) {
    $scope.zip = "";
    $http.get(url + '/zipFinder/getZipCode', {
      params: {
        country: data.countrySelected._id,
        state: data.stateSelected._id,
        city: data.citySelected.city
      }
    }).then(function (response) {
      if (response.data.data.zipcode) {
        $scope.zip = response.data.data.zipcode;
      } else {
        $scope.zip = "No data Found"
      }
    })
  }
});
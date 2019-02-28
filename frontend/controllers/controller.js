var app = angular.module('myApp', ['ui.router'])
app
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
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

      $urlRouterProvider.otherwise('/');
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
      if (response.data.err) {
        $scope.dispAddress = "There is some error"
      } else if (response.data.data.city && response.data.data.state && response.data.data.country) {
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
      if (response.data.err) {
        console.log("Error", response.data.err);
      } else if (response.data) {
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
      if (response.data.err) {
        console.log("Error", response.data.err);
      } else if (response.data.data) {
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
      if (response.data.err) {
        console.log("Error", response.data.err);
      } else if (response.data.data) {
        $scope.cities = response.data.data;
      } else {
        $scope.cities = "No data Found"
      }
    })
  }

  $scope.getZipCode = function (data) {
    $scope.zip = {};
    $http.get(url + '/zipFinder/getZipCode', {
      params: {
        country: data.countrySelected._id,
        state: data.stateSelected._id,
        city: data.citySelected.city
      }
    }).then(function (response) {
      if (response.data.err) {
        $scope.zip = "There is some error"
      } else if (response.data.data) {
        $scope.zip = response.data.data.zipcode;
      } else {
        $scope.zip = "No data Found"
      }
    })
  }
});
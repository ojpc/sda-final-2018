app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/temperature', {
            templateUrl : 'views/temperature.ejs',
            controller  : 'tempController'
        })
        .when('/humidity', {
            templateUrl : 'views/humidity.ejs',
            controller  : 'humController'
        });
}]);

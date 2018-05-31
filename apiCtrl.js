var app = angular.module('app', ['btford.socket-io', 'ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'index.html',
            controller  : 'mainController'
        })
        .when('/temperature', {
            templateUrl : 'views/temperature.html',
            controller  : 'tempController'
        })
        .when('/humidity', {
            templateUrl : 'views/humidity.html',
            controller  : 'humController'
        });
}]);

app.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect();
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
});

app.controller('mainController', function($scope, socket) {

});
app.controller('tempController', function($scope, socket) {
  $scope.temperature = "PRUEBA"
  socket.on('read', function(msg) {
    $scope.temperature = msg.temperatura
})
});
app.controller('humController', function($scope, socket) {
  socket.on('read', function(msg) {
    $scope.humedad = msg.humedad
})
});

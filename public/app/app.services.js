app.factory('data', function($resource){
  return $resource('/users/:user/:device', {}, {
    find : {
      url : '/users/:user',
      method : 'GET',
    },
    list : {
      url : '/users',
      method : 'GET'
    },
    delete : {
      method : 'DELETE'
    }
  })
})

app.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect();
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  console.log(mySocket)
  return mySocket;
});



app.factory('user', function($resource, $location){
  var host = $location.host();
  var url = '/getUser'
  return $resource(url, {}, {
    getUser : {
      method : 'GET',
    }
  })
})

app.controller("front", function($scope, socket) {

  $scope.temperature1 = "20 °C";
  $scope.temperature2 = "24 °C";
  $scope.temperature3 = "17 °C";
  $scope.pos1="6.235302, -75.578655";
  $scope.pos2="6.223331, -75.580342";
  $scope.pos3="6.270373, -75.565268";
  $scope.disp1="D001";
  $scope.disp2="D025";
  $scope.disp3="D010";
  socket.on('read', function(msg) {
    console.log(msg)
    console.log('FUNCIONA')
    $scope.read = msg
  })

})

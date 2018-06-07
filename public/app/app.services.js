app.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect();
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  console.log(mySocket)
  return mySocket;
});

app.controller("temperatureCtrl", function($scope, socket, $http) {
  $scope.temperature2 = "24 °C";
  $scope.temperature3 = "17 °C";
  $scope.timestamp2 = "01/02/2018 04:26:03";
  $scope.timestamp3 = "19/04/2018 07:12:49";
  $scope.pos2="6.223331, -75.580342";
  $scope.pos3="6.270373, -75.565268";
  $scope.disp2="D025";
  $scope.disp3="D010";
  socket.on('esp8266', function(msg) {
    $scope.temperature1 = msg.temp;
    $scope.humedad1 = msg.hum;
    $scope.pos1 = msg.pos;
    $scope.disp1 = msg.id;
    $scope.timestamp1 = msg.time;
  })
  $scope.saveRecord = function saveRecord () {
    var data = {
                temp: $scope.temperature1,
                hum: $scope.humedad1,
                pos: $scope.pos1,
                id: $scope.disp1,
                timestamp: $scope.timestamp1
            };
    var config = {
                  headers : {
                        'Content-Type': 'application/json'
                      }
                  }
    $http.post("https://sda2018.herokuapp.com/saverecord", data, config).then(function(r){
                console.log(r)
                if (r.statusText==="Created"){
                  alert("Histórico guardado exitosamente!");
                } else {
                  alert("Error al guardar histórico");
                }
            })
            };
})

app.controller("humidityCtrl", function($scope, socket,$http) {
  $scope.temperature2 = "24 °C";
  $scope.temperature3 = "17 °C";
  $scope.timestamp2 = "01/02/2018 04:26:03";
  $scope.timestamp3 = "19/04/2018 07:12:49";
  $scope.pos2="6.223331, -75.580342";
  $scope.pos3="6.270373, -75.565268";
  $scope.disp2="D025";
  $scope.disp3="D010";
  socket.on('esp8266', function(msg) {
    $scope.temperature1 = msg.temp;
    $scope.humedad1 = msg.hum;
    $scope.pos1 = msg.pos;
    $scope.disp1 = msg.id;
    $scope.timestamp1 = msg.time;
  })
  $scope.saveRecord = function saveRecord () {
    var data = {
                temp: $scope.temperature1,
                hum: $scope.humedad1,
                pos: $scope.pos1,
                id: $scope.disp1,
                timestamp: $scope.timestamp1
            };
    var config = {
                  headers : {
                        'Content-Type': 'application/json'
                      }
                  }
    $http.post("https://sda2018.herokuapp.com/saverecord", data, config).then(function(r){
                console.log(r)
                if (r.statusText==="Created"){
                  alert("Histórico guardado exitosamente!");
                } else {
                  alert("Error al guardar histórico");
                }
            })
            };
})


app.controller("recordsCtrl", function($scope,$http) {
  var config = {
                headers : {
                      'Content-Type': 'application/json'
                    }
                }
  var data = {"test":"test"}
  $http.post("https://sda2018.herokuapp.com/getrecords",data,config).then(function(r){
    $(document).ready(function() {
    r.data.forEach(function(element) {
      var row = $("<tr />")
      $("#recordstable").append(row);
      row.append($("<td>" + element.id + "</td>"));
      row.append($("<td>" + element.pos + "</td>"));
      row.append($("<td>" + element.timestamp + "</td>"));
      row.append($("<td>" + element.temp + "</td>"));
      row.append($("<td>" + element.hum + "</td>"));

   });
  });
  })
})

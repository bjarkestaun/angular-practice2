var app = angular.module('myApp', []);

app.run(function($rootScope) {
  $rootScope.name = 'bjarke';
});

var apiKey = 'MDIxMTU1MDM1MDE0NDY3ODI1ODU5OTNiYw000';
var nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('PlayerController', function($scope, $http) {
  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    $scope.programs = data.list.story;
  }).error(function(data, status) {

  });
  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.audio.src = 'http://techslides.com/demos/sample-videos/small.mp4';
  $scope.play = function(program) {
    if($scope.playing) $scope.audio.pause();
    var url = program.audio[0].format.mp4.$text;
    $scope.audio.src = url;
    $scope.audio.play();
    $scope.playing = true;
  };
  $scope.stop = function() {
    $scope.audio.stop();
    $scope.playing = false;
  };
  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop();
    });
  });
});

app.controller('RelatedController', ['$scope', function($scope) {}]);

app.controller('MyController', function($scope) {
  $scope.person = {
    name: 'San Francisco'
  };
  $scope.aliases = [
    {name: 'biarge'},
    {name: 'b man'},
    {name: 'bjarke'}
  ]
  var updateClock = function() {
    $scope.clock = new Date();
  };
  var timer = setInterval(function() {
    $scope.$apply(updateClock);
  }, 1000);
  updateClock();
});

app.directive('nprLink', function() {
  return {
    restrict: 'EA',
    require: ['^ngModel'],
    replace: true,
    scope: {
      ngModel: '=',
      play: '&'
    },
    templateUrl: 'views/nprListItem.html',
    link: function(scope, ele, attr) {
      scope.duration = scope.ngModel.audio[0].duration.$text;
    }
  }
});

// app.controller('DemoController', ['$scope', '$http', function($scope, $http) {
//   $scope.counter = 0;
//   $scope.add = function(amount) {
//     $scope.counter += amount;
//   };
//   $scope.subtract = function(amount) {
//     $scope.counter += amount;
//   };
//   $http({
//     method: 'JSONP',
//     url: 'https://api.github.com/events?callback=JSON_CALLBACK'
//   }).success(function(data, status, headers, config) {
//     $scope.stuff = data;
//   }).error(function(data, status, headers, config) {
//     $scope.error = data;
//   });
// }])

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state) {
  
  $scope.stsResponse = 'NO RESPONSE YET';
  
  var baseurl = 'https://sts.childrensmiraclenetworkhospitals.org/';
            var authorizationUrl = baseurl + 'core/connect/authorize';
            var client_id = '1772011F-B2BD-49BD-8902-9864F24B8AFE';
            //var redirect_uri = 'urn:cmnh:mb:oauth:2.0:oob';
			//var redirect_uri = "http://localhost:37643/";
			//var redirect_uri = 'cmnhapp://';
			var redirect_uri = 'cmnhinflight://';
    var response_type = "id_token";
    var scope = "openid inflight";
    var state = Date.now() + "" + Math.random();
		var response_mode = "fragment";
    var inflightUrl =
          authorizationUrl + "?" +
          "client_id=" + encodeURI(client_id) + "&" +
          "redirect_uri=" + encodeURI(redirect_uri) + "&" +
          "response_type=" + encodeURI(response_type) + "&" +
  "response_mode=" + encodeURI(response_mode) + "&" +
          "scope=" + encodeURI(scope) + "&" +
          "state=" + encodeURI(state) + "&" +
          "nonce=" + encodeURI(state);
                

  $scope.authURL = inflightUrl;
                  
  $scope.openAuth = function(){
    ref = cordova.InAppBrowser.open($scope.authURL, '_blank', 'location=no');
    ref.addEventListener('exit', function(event) { 
      if(oAuthResponseURL != ""){
          $state.go('tab.chats');
      }
    });
  };
  
  
  
})

.controller('ChatsCtrl', function($scope, Chats) {
  
  $scope.oAuthResponse = oAuthResponseURL.replace("cmnhinflight:///#", "");
  
  var EXTRA = {};
  
  var query = $scope.oAuthResponse.split("&");
          
  for (var i = 0, max = query.length; i < max; i++)
  {
      if (query[i] === "") // check for trailing & with no param
          continue;
      var param = query[i].split("=");
      EXTRA[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }
  $scope.oAuthResponseArray = EXTRA;
 
  
          
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

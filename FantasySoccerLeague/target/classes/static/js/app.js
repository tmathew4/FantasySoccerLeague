var app = angular.module('main', ["ngRoute"]);
app.show = false;
app.controller("menu", ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope) {
       $scope.route = function(path) {
         $location.path(path);
       };
		$scope.my_team = function() {
			$http.get("/my_team/"+$scope.user.id, function($response) {
				return $response.data.id;
			})
		}
		$scope.login = function() {
			console.log("inside login function");
			var user = {
				"email" : document.getElementById("email").value,
				"password" : document.getElementById("password").value
			};
			console.log(user);
            $http({
		        method : 'POST',
		        url : '/login',
		        contentType: 'application/json',
		        data : JSON.stringify(user)
		    }).then(function($response) {
		    	$rootScope.user = $response.data;
		    	console.log($response);
		    	console.log($response.data);
		    	console.log(app.user);
		    	if(app.user != null) {
		    	    $location.path("/home");
		    	    //$scope.show_menu();
		    	    app.show = true;
		    	}
		    });
		}
	}]);
app.config(['$routeProvider', '$locationProvider', function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "login1234.html",
        controller: 'menu'
    })
    .when("/home", {
		templateUrl : "home.html",
		controller: 'team_data'
    })
    .when("/leagues", {
        templateUrl : "leagues.html",
        controller : "get_leagues"
    })
    .when("/league", {
        templateUrl : "league.html",
        controller : "get_teams"
    })
    .when("/teams", {
        templateUrl : "team.html",
        controller: 'team_data'
    })
    .when("/schedule", {
        templateUrl : "schedule.html"
    })
    .when("/create", {
        templateUrl : "createuser.html",
        controller : "create_user"
    })
    .when("/sign", {
        templateUrl : "sign.html",
        controller : "sign_player"
    })
    .when("/trade", {
        templateUrl : "trade.html",
        controller : "trade_players"
    })
    .when("/players", {
        templateUrl : "players.html",
        controller: 'list_players'
    })
    .when("/unsigned_players", {
        templateUrl : "unsigned_players.html",
        controller: 'list_unsigned_players'
    });
}]);
app.controller("get_leagues", ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope) {
	$http.get("/league_list").then(function($response){
	    console.log($response.data);
		$scope.leagues = $response.data;
	});
	$scope.get_league = function(id) {
	    $rootScope.league_id = id;
	    $location.path("/league");
	}
}]);
app.controller("get_teams", ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope) {
    console.log($rootScope.league_id);
	$http.get("/league/" + $rootScope.league_id).then(function($response){
	    console.log($response.data);
		$scope.l_teams = $response.data;
	});
	$scope.get_team = function(id) {
	    $rootScope.team_id = id;
	    $location.path("/teams");
	}
}]);
app.controller("team_data", ['$scope','$http', '$rootScope', function($scope, $http, $rootScope) {
    console.log("We are here! We are here! WE ARE HERE!");
    console.log($rootScope.team_id);
	$http.get("/team/" + $rootScope.team_id).then(function($response){
	    console.log($response.data);
		$scope.t_players = $response.data;
	});
}]);
app.controller("list_players", function($scope, $http) {
	$http.get("all_players").then(function(response){
		console.log(response.data);
		$scope.list_players = response.data;
	});
});
app.controller("list_unsigned_players", function($scope, $http) {
	$http.get("available_players").then(function(response){
		console.log(response.data);
		$scope.unsigned_players = response.data;
	});
});
app.controller("sign_player", function($scope, $http) {
	$http.get("/available_players").then(function($response){
	    console.log($response.data);
		$scope.u_players = $response.data;
	});
	$scope.sign = function() {
	    var player1 = document.getElementById("unsigned_player").value;

	    $http.get("/sign_player/" + player1 + "/1");
	}
});
app.controller("trade_players", function($scope, $http) {
	$http.get("/team/1").then( function($response){
	    console.log($response.data);
		$scope.m_players = $response.data;
	});
	$http.get("/unavailable_players").then( function($response){
	    console.log($response.data);
	    $scope.a_players = $response.data;
	    var new_players = $scope.m_players;
	    $scope.o_players = $scope.a_players.filter(function (item) {
	                            return new_players.filter( function( item2 ){
                                                        return item.id == item2.id;
                                                      }).length == 0;
                               });
	});
	$scope.trade = function() {
	    var player1 = document.getElementById("my_player").value;
	    var player2 = document.getElementById("other_player").value;

	    $http.get("/trade_player/" + player1 + "/" + player2);
	}
});
app.controller("team_name", function($scope, $http) {
    $scope.name = "HI";
});
app.controller("create_user", ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope) {

		$scope.create_user = function() {
			console.log("inside create user function");
			var user = {
				"email" : document.getElementById("email").value,
				"password" : document.getElementById("password").value,
				"fname" : document.getElementById("fname").value,
				"lname" : document.getElementById("lname").value
			};
			console.log(user);
            $http({
		        method : 'POST',
		        url : '/register_user',
		        contentType: 'application/json',
		        data : JSON.stringify(user)
		    }).then(function($response) {
		    	$rootScope.user = $response.data;
		    	console.log($response);
		    	console.log($response.data);
		    	console.log($rootScope.user);
		    	if(app.user != null) {
		    	    $location.path("/home");
		    	}
		    });
		}
}]);
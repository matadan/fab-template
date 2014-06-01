/**
 * Created by andy on 16/05/2014.

 The MIT License (MIT)

 Copyright (c) 2014 Andrew Brian Eades

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

var app = angular.module("app", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {

	$routeProvider
		.when("/welcome",  {
			templateUrl : './pages/welcome/welcome.html',
			controller  : "WelcomeController"
		})
		.when("/login", {
			templateUrl : 'pages/login/login.html',
			controller  : 'LoginController'
		})
		.when("/register", {
			templateUrl : './pages/register/register.html',
			controller  : 'RegisterController'
		})
		.when("/forgot", {
			templateUrl : "./pages/forgot/forgot.html",
			controller  : "ForgotController"
		})
		.when("/passwordReset", {
			templateUrl : "./pages/passwordReset/passwordReset.html"
		})
		.when("/app", {
			templateUrl : "./pages/app/app.html",
			controller  : "AppController"
		})
		.when("/changePassword", {
			templateUrl : "./pages/changePassword/changePassword.html",
			controller  : "ChangePasswordController"
		})
		.when("/removeUser", {
			templateUrl : "./pages/removeUser/removeUser.html",
			controller  : "RemoveUserController"
		})
		.otherwise({
			redirectTo  : "/welcome"
		});
}]);

app.factory("FirebaseAuthenticationService", function() {
	var base, auth, currentUser, error;

	currentUser = null;
	error = null;

	return {
		initWithFirebaseAppName : function(options) {
			base = new Firebase('https://' + options.firebaseName + '.firebaseio.com');

			auth = new FirebaseSimpleLogin(base, function (error, user) {
				if (!error) {
					currentUser = user;

					if (options && options.successCallback) {
						options.successCallback(user);
					}
				} else {
					currentUser = null;

					if (options && options.errorCallback) {
						options.errorCallback(error);
					}
				}
			});
		},

		getAuth : function() {
			return auth;
		},

		getCurrentUser :  function() {
			return currentUser;
		},

		setError :  function(anError) {
			error = anError;
		},

		getError : function () {
			return error;
		}
	};
});

app.run(["$rootScope", "$location", "FIREBASE_NAME", "FirebaseAuthenticationService", function($rootScope, $location, FIREBASE_NAME, FirebaseAuthenticationService) {
	function successCallback(user) {
		if (!user) {
			console.log("No-one logged in.");

		} else {
			console.log("Login success: " + user.uid);

			$location.path("/app");
			$rootScope.$apply();
		}
	}

	function errorCallback(error) {
		console.log(error.message);

		FirebaseAuthenticationService.setError(error);

		$rootScope.$apply();
	}

	FirebaseAuthenticationService.initWithFirebaseAppName({firebaseName: FIREBASE_NAME, successCallback : successCallback, errorCallback: errorCallback });

}]);

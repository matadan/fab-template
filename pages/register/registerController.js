/**
 * Created by andy on 18/05/2014.

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

app.controller("RegisterController", ["$scope", "$location", "FirebaseAuthenticationService", function ($scope, $location, FirebaseAuthenticationService) {

	$scope.model = {
		formHeaderText          : "Please register",
		registerButtonText      : "Register",
		emailPlaceholderText    : "Email address",
		passwordPlaceholderText : "Password",

		emailAlreadyUsedAlertText: "There is already an account associated with that email address.",

		forgotPasswordLinkText : "Forgot your password?",

		showEmailTakenAlert : false
	}

	$scope.focusEmail = function() {
		$scope.model.showEmailTakenAlert = false;
	};

	$scope.submit = function() {
		if ($scope.model.form.email && $scope.model.form.password) {
			console.log($scope.model.form);

			FirebaseAuthenticationService.getAuth().createUser($scope.model.form.email, $scope.model.form.password, function(error, user) {
				if (!error) {
					console.log('Registered user Id: ' + user.uid + ', Email: ' + user.email);

					FirebaseAuthenticationService.getAuth().login("password", {
						email    : $scope.model.form.email,
						password : $scope.model.form.password
					});
				} else {
					console.log("Error registering " + $scope.model.form.email);
					console.log(error.message);

					switch (error.code) {
						case "EMAIL_TAKEN":
							$scope.$apply(function() {
								$scope.model.showEmailTakenAlert = true;
							});
							break;

						default:
							break;
					}
				}
			});
		}
	}
}]);

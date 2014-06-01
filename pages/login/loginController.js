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

app.controller("LoginController", ["$scope", "FirebaseAuthenticationService", function($scope, FirebaseAuthenticationService) {
	$scope.model = {
		formHeaderText          : "Please sign in",
		loginButtonText         : "Sign in",
		emailPlaceholderText    : "Email address",
		passwordPlaceholderText : "Password",

		rememberMeCheckBoxText  : "Remember me",

		invalidInputAlertText : "Error logging in with the specified username and password.",

		forgotPasswordLinkText : "Forgot your password?"
	};

	$scope.submit = function () {
		FirebaseAuthenticationService.getAuth().login("password", {
			email      : $scope.model.form.email,
			password   : $scope.model.form.password,
			rememberMe : $scope.model.form.rememberMe
		});
	};

	$scope.isInputValid = function() {
		var error;

		error = FirebaseAuthenticationService.getError();

		if (error) {
			return false;
		}

		return true;
	};

	$scope.focusInput = function() {
		FirebaseAuthenticationService.setError(null);
	};
}]);

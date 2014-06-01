/**
 * Created by andy on 20/05/2014.

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

app.controller("ChangePasswordController",
	["$scope", "$location", "FirebaseAuthenticationService", function($scope, $location, FirebaseAuthenticationService) {

	var protectedData;

	protectedData = {
		isInputValid : true
	};

	$scope.model = {
		formHeaderText             : "Change Password",
		submitButtonText           : "Change",
		emailPlaceholderText       : "Email address",
		passwordPlaceholderText    : "Old password",
		newPasswordPlaceholderText : "New password",

		invalidInputAlertText : "Error using the specified username and password.",

		forgotPasswordLinkText : "Forgot your password?"
	};

	$scope.submit = function () {
		FirebaseAuthenticationService.getAuth().changePassword(
			$scope.model.form.email,
			$scope.model.form.oldPassword,
			$scope.model.form.newPassword,
			function(error, success) {
				if (error) {
					$scope.$apply(function() {
						protectedData.isInputValid = false;
					});
				} else {
					$scope.$apply(function() {
						$location.path("/login").replace();
					});
				}
			}
		);
	};

	$scope.isInputValid = function() {
		return protectedData.isInputValid;
	};

	$scope.focusInput = function() {
		protectedData.isInputValid = true;
	};
}]);

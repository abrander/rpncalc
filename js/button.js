/**
 * This is nothing but a hack to avoid buttons getting focus
 * @return {!angular.Directive}
 */
RpnCalc.Directive.Button = function() {
	/**
	 * @param {angular.Scope} $scope
	 * @param {angular.JQLite} element
	 * @param {angular.Attributes} attrs
	 */
	var link = function($scope, element, attrs) {
		/**
		 * @this {Element}
		 */
		var blur = function() {
			var e = this;

			/* We blur the button to avoid "double entry" when pressing return
			 * We wait 100ms to still render the :active css
			 */
			setTimeout(function() {
				e.blur();
			}, 100);
		};

		angular.element(element[0]).bind('focus', blur);
	};

	return {
		link: link,
		restrict: 'E'
	};
};
rpncalc.directive('button', RpnCalc.Directive.Button);

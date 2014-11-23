/**
 * @constructor
 */
RpnCalc.Service.StackOperation = function() {
	var self = this;

	/**
	 * @dict
	 * @type {Object.<!string, !function(RpnCalc.Stack)>}
	 */
	var stackOperations = {
		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'add': function(stack) {
			var y = stack.shift();
			var x = stack.shift();

			stack.unshift(x + y);
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'acos': function(stack) {
			var x = stack.shift();

			stack.unshift(Math.acos(x));
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'asin': function(stack) {
			var x = stack.shift();

			stack.unshift(Math.asin(x));
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'atan': function(stack) {
			var x = stack.shift();

			stack.unshift(Math.atan(x));
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'cos': function(stack) {
			var x = stack.shift();

			stack.unshift(Math.cos(x));
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'divide': function(stack) {
			var y = stack.shift();
			var x = stack.shift();

			stack.unshift(x / y);
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'multiply': function(stack) {
			var y = stack.shift();
			var x = stack.shift();

			stack.unshift(x * y);
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'noop': function(stack) {
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'pop': function(stack) {
			stack.shift();
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'pow': function(stack) {
			var y = stack.shift();
			var x = stack.shift();

			stack.unshift(Math.pow(x, y));
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'reciprocal': function(stack) {
			var x = stack.shift();

			stack.unshift(1 / x);
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'sin': function(stack) {
			var x = stack.shift();

			stack.unshift(Math.sin(x));
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'subtract': function(stack) {
			var y = stack.shift();
			var x = stack.shift();

			stack.unshift(x - y);
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'tan': function(stack) {
			var x = stack.shift();

			stack.unshift(Math.tan(x));
		},

		/**
		 * @param {!RpnCalc.Stack} stack
		 */
		'swap': function(stack) {
			var y = stack.shift();
			var x = stack.shift();

			stack.unshift(x, y);
		}
	};

	/**
	 * @param {!RpnCalc.Stack} stack
	 * @param {!string} operation
	 */
	this.doOperation = function(stack, operation) {
		var func = stackOperations[operation];

		if (func)
			func(stack);
		else
			console.error('operation "' + operation + '" not found');
	};
};
rpncalc.service('StackOperation', RpnCalc.Service.StackOperation);

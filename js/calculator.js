/**
 * @ngInject
 * @param {RpnCalc.Service.StackOperation} StackOperation
 * @constructor
 */
RpnCalc.Controller.Calculator = function(StackOperation) {
	var self = this;

	/**
	 * @type {?string}
	 */
	var input = null;

	/**
	 * @expose
	 * @type {!boolean}
	 */
	this.editing = false;

	/**
	 * @expose
	 * @type {!number}
	 */
	this.decimals = 4;

	/**
	 * @expose
	 * @type {RpnCalc.Stack}
	 */
	this.stack = [];

	/**
	 * @expose
	 * @type {!Array<!string>}
	 */
	this.display = ['', '', '', ''];

	this.prepareDisplay = function() {
		for (var i = 0; i < 4; i++) {
			if (self.stack.length > i) {
				self.display[i] = self.stack[i].toFixed(self.decimals);
			} else {
				self.display[i] = '·';
			}
		}

		if (input) {
			self.display[0] = input;
			self.editing = true;
		} else {
			self.editing = false;
		}
	};
	this.prepareDisplay();

	/**
	 * @param {!string} target
	 */
	var click = function(target) {
		/* We wrap this in a timeout to avoid confusing Angular */
		setTimeout(function() {
			document.getElementById(target).click();
		}, 1);
	};

	/**
	 * @expose
	 * @param {Event} event
	 */
	this.keypress = function(event) {
		/*
		 * For better browser support, maybe we should look at
		 * http://unixpapa.com/js/key.html
		 */

		/**
		 * @dict
		 * @type {Object.<!number, !string>}
		 */
		var table = {
			42: 'button_mul',
			43: 'button_plus',
			44: 'button_dot',
			45: 'button_min',
			46: 'button_dot',
			47: 'button_div',
			48: 'button_0',
			49: 'button_1',
			50: 'button_2',
			51: 'button_3',
			52: 'button_4',
			53: 'button_5',
			54: 'button_6',
			55: 'button_7',
			56: 'button_8',
			57: 'button_9'
		};

		var target = table[event.charCode];

		if (target) {
			click(target);
		}
	};

	/**
	 * @expose
	 * @param {Event} event
	 */
	this.keyup = function(event) {
		/**
		 * @dict
		 * @type {Object.<!number, !string>}
		 */
		var table = {
			13: 'button_enter',
			46: 'button_del'
		};

		var target = table[event.keyCode];

		if (target) {
			click(target);
		}
	};

	/**
	 * @expose
	 * @param {number} value
	 */
	this.appendNumber = function(value) {
		var unshift = false;

		/* If we're not currently inputting, put new value on stack */
		if (!input) {
			unshift = true;
			input = '';
		}

		input += value.toString();

		var newX = parseFloat(input);

		if (unshift)
			self.stack.unshift(newX);
		else
			self.stack[0] = newX;

		self.prepareDisplay();
	};

	/**
	 * @expose
	 */
	this.appendDecimalSeperator = function() {
		if (!input)
			input = '0';

		if (input.indexOf('.') == -1)
			input += '.';

		self.prepareDisplay();
	};

	/**
	 * @expose
	 */
	this.enter = function() {
		if (!input)
			return;

		input = null;

		self.prepareDisplay();
	};

	/**
	 * @expose
	 * @param {!string} operation
	 */
	this.doOperation = function(operation) {
		self.enter();

		StackOperation.doOperation(self.stack, operation);

		self.prepareDisplay();
	};
};
rpncalc.controller('Calculator', RpnCalc.Controller.Calculator);

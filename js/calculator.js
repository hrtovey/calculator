// Clean up duplicate functions
// Pretty things up a bit

var c,
Calculator = {
	settings: {
		numButton: $('.calc-number'),
		funcButton: $('.calc-function'),
		clearButton: $('#c'),
		percentButton: $('#percent'),
		signButton: $('#plus-minus'),
		result: $('#result'),
		calculation: 0,
		currentNumberString: '',
		currentNumber: 0,
		calcArray: [0],
        operation: ''
	},

	init: function() {
		c = this.settings;
		this.bindUIActions();
	},

	bindUIActions: function() {
        var altKey = false;
        var shiftKey = false;

		c.numButton.on('click', function() {
			var id = this.id;
			Calculator.handleNumber(id);
		});

		c.funcButton.on('click', function() {
			var id = this.id;
			Calculator.handleOperation(id);
		});

		c.clearButton.on('click', function() {
			Calculator.clearCalculations();
		});

        c.percentButton.on('click', function() {
            Calculator.makePercentage();
        });

        c.signButton.on('click', function() {
            Calculator.changeSign();
        });

        // Keypress Section

        $(document).keydown(function(e) {

            if(e.which === 12) {
                Calculator.clearCalculations();
            }

            if(e.which === 18) {
                altKey = true;
            }

            if(e.which === 109 && altKey === true) {
                Calculator.changeSign();
            } else if(e.which === 109) {
                Calculator.handleOperation('subtract');
            } 

            if(e.which === 16) {
                shiftKey = true;
            }
            

            if(e.which === 53 && shiftKey === true) {
                Calculator.makePercentage();
            } else if(e.which === 53) {
                Calculator.handleNumber('5');
            } 
            
            if(e.which === 111) {
                Calculator.handleOperation('divide');
            } 
            
            if(e.which === 55) {
                Calculator.handleNumber('7');
            } 
            
            if(e.which === 56) {
                Calculator.handleNumber('8');
            } 
            
            if(e.which === 57) {
                Calculator.handleNumber('9');
            } 
            
            if(e.which === 106) {
                Calculator.handleOperation('multiply');
            } 
            
            if(e.which === 52) {
                Calculator.handleNumber('4');
            } 
            
            
            
            if(e.which === 54) {
                Calculator.handleNumber('6');
            } 
            
            
            
            if(e.which === 49) {
                Calculator.handleNumber('1');
            } 
            
            if(e.which === 50) {
                Calculator.handleNumber('2');
            } 
            
            if(e.which === 51) {
                Calculator.handleNumber('3');
            } 
            
            if(e.which === 107) {
                Calculator.handleOperation('add');
            } 
            
            if(e.which === 48) {
                Calculator.handleNumber('0');
            } 
            
            if(e.which === 110) {
                Calculator.handleNumber('dot');
            }

            if(e.which === 13) {
                Calculator.handleOperation('equals');
            }

        });

        $(document).keyup(function(e) {
            if(e.which === 18) {
                altKey = false;
            }

            if(e.which === 16) {
                shiftKey = false;
            }
        });

	},

	handleOperation: function(id) {


		// Create number from number string
		c.currentNumber = parseFloat(c.currentNumberString);
		// Push number into array
        if (isNaN(c.currentNumber) === false) {
            if (c.operation === '') {
                c.calcArray = [c.currentNumber];
            } else {
                c.calcArray.push(c.currentNumber);
            }	
		}
		
		// Start number string over again
		c.currentNumberString = '';

        if (c.calcArray.length > 1) {
    		// If there is more than one item in the array, then there must be 2 numbers and 1 operation. Thus, we can calculate a result.
            var number1 = c.calcArray[0];
            var number2 = c.calcArray[1];

    		// Calculate the result
    		switch(c.operation) {
    			case 'divide':
    				c.calculation = Calculator.round(number1 / number2);
    				break;
    			case 'multiply':
    				c.calculation = Calculator.round(number1 * number2);
    				break;
    			case 'subtract':
    				c.calculation = Calculator.round(number1 - number2);
    				break;
    			case 'add':
    				c.calculation = Calculator.round(number1 + number2);
    				break;
    			default:
                    break;
    		}
    		// Empty the array
    		c.calcArray = [];
    		// Push the result into the fresh array
    		c.result.text(Calculator.formatLength(c.calculation));
    		c.calcArray.push(c.calculation);
        }
		// Push the operation into the fresh array
		if (id === 'divide' || id === 'multiply' || id === 'add' || id === 'subtract') {
			c.operation = id;
		} else if (id === 'equals') {
            c.operation = '';
        }
		
	},

	handleNumber: function(id) {
		if (id === 'dot') {
			c.currentNumberString += '.';
		} else {
			c.currentNumberString += id;
		}
		
		c.result.text(Calculator.formatLength(c.currentNumberString));
	},

	clearCalculations: function() {
		c.calculation = 0;
		c.currentNumberString = '';
		c.currentNumber = 0;
		c.calcArray = [0];
        c.operation = '';
	   c.result.text(Calculator.formatLength(c.calculation));
	},

    split: function(number) {
        var split = number.toString().split('.')[1];
        if (typeof split === "undefined") {
            return 0;
        } else {
            return split.length;
        }
    },

	round: function(number) {
	   return Math.round(parseFloat(number) * Math.pow(10, 9)) / Math.pow(10, 9);
	},

    makePercentage: function() {

        if (c.currentNumberString === '') {

            
            c.calcArray[0] = Calculator.round(c.calcArray[0] * 0.01);
            c.result.text(Calculator.formatLength(c.calcArray[0]));
        } else {
            c.currentNumber = parseFloat(c.currentNumberString);

            c.currentNumber = Calculator.round(c.currentNumber * 0.01);
            c.result.text(Calculator.formatLength(c.currentNumber));
        
            // Push number into array
            if (isNaN(c.currentNumber) === false) {
                if (c.operation === '') {
                    c.calcArray = [c.currentNumber];
                } else {
                    c.calcArray.push(c.currentNumber);
                }   
            }
        
            // Start number string over again
            c.currentNumberString = '';
        }
    },

    changeSign: function() {
        if (c.currentNumberString === '') {
            c.calcArray[0] *= -1;
            c.result.text(Calculator.formatLength(c.calcArray[0]));
        } else {
            c.currentNumber = parseFloat(c.currentNumberString);
            c.currentNumber *= -1;
            c.result.text(Calculator.formatLength(c.currentNumber));
        
            // Push number into array
            if (isNaN(c.currentNumber) === false) {
                if (c.operation === '') {
                    c.calcArray = [c.currentNumber];
                } else {
                    c.calcArray.push(c.currentNumber);
                }   
            }
        
            // Start number string over again
            c.currentNumberString = '';
        }
    },

    formatLength: function(number) {
        if (number.toString().length > 11) {
            return number.toExponential(5);
        } else {
            return number;
        }
    }
};

$(document).ready(function() {
	Calculator.init();
});
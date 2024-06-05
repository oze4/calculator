/**
 * Calculator "class"
 */
function Calculator() {
    this.calculation = [];
    this.monitoring = undefined;

    this.pressDigit = function (digit) {
        if (isNaN(parseInt(digit))) {
            console.error("calculator.digit() : digit is not an integer");
            return;
        }
        if (digit.toString().length !== 1) {
            console.error("calculator.digit() : digit must be single digit");
            return;
        }
        if (this.monitoring) {
            // If we are monitoring an operator and a digit was just pressed,
            // we need to push that operator onto the stack/calculation.
            if (this.isMonitoringOperator()) {
                this.calculation.push(this.monitoring);
                this.monitoring = digit;
            } else {
                this.monitoring += digit;
            }
        } else {
            this.monitoring = digit;
        }
    };

    this.pressOperator = function (operator) {
        if (!this.isOperator(operator)) {
            console.error("calculator.operator() : operator must be one of : '/', '-', '+', '*'");
            return;
        }
        if (!this.isMonitoringOperator()) {
            this.calculation.push(this.monitoring);
        }
        this.monitoring = operator;
    };

    this.pressDecimal = function () {
        if (this.isMonitoringOperator()) {
            this.calculation.push(this.monitoring);
            this.monitoring = ".";
        } else if (!this.monitoring) {
            this.monitoring = ".";
        } else {
            this.monitoring += ".";
        }
    };

    this.pressDelete = function () {
        // If we are deleting an operator we need to remove the previous number from calculation, which was
        // added to the calculation, after pressing the operator.
        if (this.isMonitoringOperator()) {
            // should be the last number added to calculation, so we can just pop it off.
            this.monitoring = this.calculation.pop();
        } else if (this.monitoring) {
            this.monitoring = this.monitoring.substring(0, this.monitoring.length - 1);
            // If the number we just deleted was only one digit long,
            // we need to revert back to what we were monitoring prior (an operator or undefined)
            // thus, we also need to remove it from current calculation since operators get added to current calc
            // after pressing a digit.
            if (!this.monitoring.length) {
                this.monitoring = this.calculation.pop();
            }
        }
    };

    this.pressEquals = function () {
        if (this.monitoring && !this.isMonitoringOperator()) {
            this.calculation.push(this.monitoring);
        }

        let calc = parseFloat(this.calculation[0]);
        let operation = "";

        for (let i = 1; i < this.calculation.length; i++) {
            let current = this.calculation[i];
            if (this.isOperator(current)) {
                operation = current;
                continue;
            }
            current = parseFloat(current);
            if (operation === "+") {
                calc += current;
            } else if (operation === "-") {
                calc -= current;
            } else if (operation === "/") {
                calc /= current;
            } else {
                // Multiplication is all that is left
                calc *= current;
            }
        }

        this.monitoring = String(calc);
        this.calculation = [];
        return calc;
    };

    this.clear = function () {
        this.monitoring = undefined;
        this.calculation = [];
    };

    this.isMonitoringOperator = function () {
        return this.isOperator(this.monitoring);
    };

    this.isOperator = function (x) {
        return ["+", "-", "/", "*"].includes(x);
    };
}

// Class to help us with order of operations.
// Helps us to generate a tree structure via our calculation array.
class CalculationNode {
    constructor({ value, operation, left, right, parent } = {}) {
        this.value = value;
        this.operation = operation;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}

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

    /**
     * A HUGE SHOUT OUT TO THIS ARTICLE : 
     * https://www.antoniovdlc.me/implementing-a-basic-calculator-in-javascript-the-hard-way/
     * 
     * Some examples of what the "calculation tree" will look like:
     * 
     *  - If `this.calculation = [2, "+", 2]` then the final tree will look like:
     *                          +
     *                        /   \
     *                      2       2
     * 
     *  - If `this.calculation = [5, "+", 4, "*", 3]` then the final tree will look like:
     *                              +
     *                            /   \
     *                           5     *
     *                                /  \
     *                               4    3
     * 
     *  - If `this.calculation = [34, "/", 5, "+", 12, "*", 3, "/", 2, "-", 6, "+", 33, "/", 3, "+", 13]` 
     *    then the final tree will look like: (a forward slash in quotes means divide)
     *                                            +
     *                                         /     \
     *                                        +       13
     *                                       /   \
     *                                      -     \  
     *                                     / \     \
     *                                    +   6     \
     *                                   /  \       "/"
     *                                 "/"   \      / \
     *                                 / \    \   33   3
     *                               34   5    \
     *                                         "/"
     *                                        /   \
     *                                       *      2
     *                                     /  \
     *                                    12   3
     * 
     */
    this.calculate = function () {
        // Make sure all numbers are included in calculation
        if (this.monitoring && !this.isMonitoringOperator()) {
            this.calculation.push(this.monitoring);
        }

        let root = new CalculationNode();
        let currentNode = root;

        for (let i = 0, length = this.calculation.length; i < length; i++) {
            let current = this.calculation[i];
            // OPERATORS
            if (this.isOperator(current)) {
                if (!currentNode.operation) {
                    currentNode.operation = current;
                } else {
                    const newNode = new CalculationNode({ operation: current });
                    // Put our new node above the currentNode in our tree, as to follow the order of operations.
                    if (this.isAdditionOrSubtraction(currentNode.operation) && this.isMultiplicationOrDivision(newNode.operation)) {
                        newNode.left = currentNode.right;
                        currentNode.right = newNode;
                        newNode.parent = currentNode;
                        // If both our current node and new node are using multiplication or division
                    } else if (this.isMultiplicationOrDivision(currentNode.operation) && this.isMultiplicationOrDivision(newNode.operation)) {
                        // If the current node we are processing is the root, we can make the new node the root, 
                        // as the order of those operations don't matter. 
                        // If the current node is not the root, we need to locally do the same operation, 
                        // hence the need to keep track of parent nodes as well!
                        if (!currentNode.parent) { // current node is the root node
                            newNode.left = currentNode;
                            currentNode.parent = newNode;
                            root = newNode;
                        } else { // current node is not the root node
                            currentNode.parent.right = newNode;
                            newNode.parent = currentNode.parent;
                            newNode.left = currentNode;
                        }
                    } else {
                        // To finish the construction of the tree, we need to deal with the case where 
                        // we have successive + and - operations. This case is similar to the previous
                        // when it happens at the root, but because of the rules of arithmetic, here
                        // we always update the root node, as the current node will always be at the root.
                        newNode.left = root;
                        root.parent = newNode;
                        root = newNode;
                    }
                    // Assign our new node as the current, so we can continue constructing our tree.
                    currentNode = newNode;
                }
            } else {
                // NUMBERS
                let number = parseFloat(current);
                if (currentNode.left == null) {
                    currentNode.left = new CalculationNode({ value: number });
                } else if (currentNode.right == null) {
                    currentNode.right = new CalculationNode({ value: number });
                }
            }
        }

        /**
         * HELPER FUNCTION SO WE CAN USE RECURSION
         * Don't want to make this func a member of our Calculator class,
         * so people don't accidentally use it or confuse it with "this.calculate()"
         * 
         * @param {CalculationNode} root root node of calculate node tree
         */
        function compute(root) {
            if (root.value !== null && root.value !== undefined) {
                return root.value;
            }
            if (root.operation) {
                let left = compute(root.left);
                let right = compute(root.right);
                switch (root.operation) {
                    case "+":
                        return left + right;
                    case "-":
                        return left - right;
                    case "*":
                        return left * right;
                    case "/":
                        return left / right;
                }
            }
        };

        // Reset calculation
        this.calculation = [];

        // If someone just types a single number and hits "=" we just return that same number.
        if (!root.operation) {
            // Set current monitoring to the result of our calculation
            this.monitoring = String(root.left.value);
            return root.left.value;
        }
        const result = compute(root);
        // Set current monitoring to the result of our calculation.
        this.monitoring = String(result);
        return result;
    };

    this.clear = function () {
        this.monitoring = undefined;
        this.calculation = [];
    };

    this.isMultiplicationOrDivision = function (x) {
        return ["*", "/"].includes(x);
    };

    this.isAdditionOrSubtraction = function (x) {
        return ["+", "-"].includes(x);
    };

    this.isMonitoringOperator = function () {
        return this.isOperator(this.monitoring);
    };

    this.isOperator = function (x) {
        return ["+", "-", "/", "*"].includes(x);
    };
}

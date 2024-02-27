const calculator = {
  memory: {
    array: [],
    push: function (value) {
      this.array.push(value);
    },
    pop: function () {
      return this.array.pop();
    },
    clear: function () {
      this.array = [];
    },
    isEmpty: function () {
      return this.array.length === 0;
    },
    peek: function () {
      return this.array[this.array.length - 1];
    },
    peekBefore: function () {
      return this.array[this.array.length - 2];
    },
    newNumber: false,
  },
  add: function (a, b) {
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  },
  multiply: function (a, b) {
    return a * b;
  },
  divide: function (a, b) {
    return a / b;
  },
  sqrt: function (a) {
    return Math.sqrt(a);
  },
  square: function (a) {
    return Math.pow(a, 2);
  },
  percentage: function (a, b) {
    return (a * b) / 100;
  },
  inverse: function (a) {
    return 1 / a;
  },
};

const display = {
  content: document.getElementById("inp"),
  limit: 10,
  nchars: 0,
  go: function () {
    return this.nchars < this.limit;
  },
  clear: function () {
    this.content.value = "";
    this.nchars = 0;
  },
  add: function (value) {
    if (calculator.memory.newNumber === true) {
      this.clear();
      calculator.memory.newNumber = false;
    }
    if (this.go()) {
      if (this.content.value === "0" && value !== ".") {
        this.content.value = "";
        this.nchars = 0;
      }
      if (value === "sign") {
        this.content.value = eval(this.content.value) * -1;
        return;
      }
      if (this.content.value.includes(".") && value === ".") {
        return;
      }
      if (this.content.value === ".") {
        this.content.value = "0.";
        this.nchars = 0;
      }
      this.content.value += value;
      this.nchars++;
    }
  },
  back: function () {
    if (this.content.value.length > 0) {
      this.content.value = this.content.value.slice(0, -1);
      this.nchars--;
    }
  },
  operation: function (value, equals = false) {
    if (this.content.value === "") return;
    let result = eval(this.content.value);
    const functions = ["sqrt", "square", "inverse"];
    if (
      !calculator.memory.isEmpty() ||
      typeof calculator.memory.peek() === "number"
    ) {
      const a = calculator.memory.peekBefore();
      const b = eval(this.content.value);
      let actualValue = "";
      if (value === "equals") {
        actualValue = "equals";
      } else if (equals) {
        actualValue = value;
      } else {
        actualValue = calculator.memory.peek();
      }
      switch (actualValue) {
        case "plus":
          result = calculator.add(a, b);
          break;
        case "minus":
          result = calculator.subtract(a, b);
          break;
        case "multiply":
          result = calculator.multiply(a, b);
          break;
        case "division":
          result = calculator.divide(a, b);
          break;
        case "percentage":
          result = calculator.percentage(a, b);
          break;
        case "equals":
          const value = calculator.memory.peek();
          if (typeof value === "string") {
            this.operation(calculator.memory.peek(), true);
          }
          calculator.memory.clear();
          return;
      }
    }
    if (functions.includes(value)) {
      const a = eval(this.content.value);
      switch (value) {
        case "inverse":
          result = calculator.inverse(a);
          break;
        case "sqrt":
          result = calculator.sqrt(a);
          break;
        case "square":
          result = calculator.square(a);
          break;
      }
    }
    if (value !== "equals") {
      if (String(result).length > 10) {
        this.content.value = String(result.toExponential(3));
        console.log(result);
        return;
      }
      this.content.value = result;
    }
    calculator.memory.push(eval(this.content.value));
    calculator.memory.push(value);
    calculator.memory.newNumber = true;
    console.log(result);
  },
};

function addValueDisplay(value) {
  display.add(value);
}

function backValueDisplay() {
  display.back();
}

function clearValueDisplay() {
  display.clear();
}

function clearDisplay() {
  calculator.memory.clear();
  display.clear();
}

function operationValueDisplay(value) {
  display.operation(value);
}

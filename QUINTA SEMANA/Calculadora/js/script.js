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
  add: function (value) {
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
};

function addValueDisplay(value) {
  display.add(value);
}

function backValueDisplay() {
  display.back();
}

function clearValueDisplay() {
  display.content.value = "";
  display.nchars = 0;
}

function clearDisplay() {
  calculator.memory.clear();
  display.content.value = "";
  display.nchars = 0;
}

function pushMemory() {
  calculator.memory.push(eval(display.content.value));
  clearValueDisplay();
  console.log(calculator.memory.peek());
}

function add() {
  display.content.value = calculator.memory.peek();
}

function subtract() {
  if (!calculator.memory.isEmpty()) {
    calculator.memory.push(
      calculator.subtract(calculator.memory.peek(), display.content.value)
    );
    display.content.value = calculator.memory.peek();
  }
  calculator.memory.push(eval(display.content.value));
  clearValueDisplay();
  console.log(calculator.memory.peek());
}

function equals(value) {
  var result = 0;
  const a = calculator.memory.peek();
  const b = eval(display.content.value);
  if (calculator.memory.array.length === 2) {
    switch (value) {
      case "plus":
        result = calculator.add(a, b);
        break;
      case "minus":
        result = calculator.subtract(a, b);
        break;
      case "multiply":
        result = calculator.multiply(a, b);
        break;
      case "divide":
        result = calculator.divide(a, b);
        break;
      case "sqrt":
        result = calculator.sqrt(a);
        break;
      case "square":
        result = calculator.square(a);
        break;
      case "percentage":
        result = calculator.percentage(a, b);
        break;
      case "inverse":
        result = calculator.inverse(a);
        break;
    }
  }
  display.content.value = result;
  calculator.memory.clear();
}

function operationValueDisplay(value) {
  if (!calculator.memory.isEmpty()) {
    const a = calculator.memory.peek();
    const b = eval(display.content.value);
    var result = 0;
    calculator.memory.push(calculator.add(a, b));
    switch (value) {
      case "plus":
        result = calculator.add(a, b);
        break;
      case "minus":
        result = calculator.subtract(a, b);
        break;
      case "multiply":
        result = calculator.multiply(a, b);
        break;
      case "divide":
        result = calculator.divide(a, b);
        break;
      case "sqrt":
        result = calculator.sqrt(a);
        break;
      case "square":
        result = calculator.square(a);
        break;
      case "percentage":
        result = calculator.percentage(a, b);
        break;
      case "inverse":
        result = calculator.inverse(a);
        break;
    }
    calculator.memory.push(result);
    display.content.value = result;
    return;
  }
  calculator.memory.push(eval(display.content.value));
  clearValueDisplay();
}

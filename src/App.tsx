import { useState } from "react";

function App() {
  const [input, setInput] = useState<string>("");

  const calculate = () => {
    try {
      const result = evaluateExpression(input);
      setInput(result.toString());
    } catch {
      // setInput("Error");
    }
  };

  const evaluateExpression = (expression: string): number => {
    // Replace "×" with "*" and "÷" with "/"
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');

    // Split the expression into numbers and operators
    const tokens = expression.split(/([-+*/])/);

    // Define operator precedence
    const precedence: { [key: string]: number } = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };

    // Convert infix notation to postfix notation (Reverse Polish notation)
    const postfix: (number | string)[] = [];
    const operatorStack: string[] = [];
    let unaryMinus = false;
    for (const token of tokens) {
      if (!isNaN(parseFloat(token))) {
        postfix.push(unaryMinus ? -parseFloat(token) : parseFloat(token));
        unaryMinus = false;
      } else if (token in precedence) {
        if (token === '-' && (postfix.length === 0 || postfix[postfix.length - 1] in precedence)) {
          unaryMinus = true;
        } else {
          while (operatorStack.length > 0 && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
            postfix.push(operatorStack.pop()!);
          }
          operatorStack.push(token);
        }
      }
    }
    while (operatorStack.length > 0) {
      postfix.push(operatorStack.pop()!);
    }

    // Evaluate the postfix expression
    const stack: number[] = [];
    for (const token of postfix) {
      if (typeof token === 'number') {
        stack.push(token);
      } else {
        const operand2 = stack.pop()!;
        const operand1 = stack.pop()!;
        switch (token) {
          case '+':
            stack.push(add(operand1, operand2));
            break;
          case '-':
            stack.push(subtract(operand1, operand2));
            break;
          case '*':
            stack.push(multiply(operand1, operand2));
            break;
          case '/':
            stack.push(divide(operand1, operand2));
            break;
        }
      }
    }

    return stack[0];
  };

  const decimalPlacesCount = (num: number): number => {
    const numStr = num.toString();
    const decimalIndex = numStr.indexOf('.');
    return decimalIndex === -1 ? 0 : numStr.length - decimalIndex - 1;
  };

  const add = (a: number, b: number): number => {
    const decimalPlaces = Math.max(decimalPlacesCount(a), decimalPlacesCount(b));
    const multiplier = Math.pow(10, decimalPlaces);
    return (Math.round(a * multiplier) + Math.round(b * multiplier)) / multiplier;
  };

  const subtract = (a: number, b: number): number => {
    const decimalPlaces = Math.max(decimalPlacesCount(a), decimalPlacesCount(b));
    const multiplier = Math.pow(10, decimalPlaces);
    return (Math.round(a * multiplier) - Math.round(b * multiplier)) / multiplier;
  };

  const multiply = (a: number, b: number): number => {
    const decimalPlaces = decimalPlacesCount(a) + decimalPlacesCount(b);
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(a * b * multiplier) / multiplier;
  };

  const divide = (a: number, b: number): number => {
    const decimalPlaces = Math.max(decimalPlacesCount(a), decimalPlacesCount(b));
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(a * multiplier / b) / multiplier;
  };

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const clear = () => {
    setInput("");
  };

  const backspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const toggleSign = () => {
    if (input.charAt(0) === "-") {
      setInput((prev) => prev.substring(1));
    } else {
      setInput((prev) => "-" + prev);
    }
  };

  return (
    <div className="App min-h-screen bg-[beige] flex flex-col items-center justify-center">
      <h1 className="text-[30px] font-bold text-red-500 text-center translate-y-[-100px] ">Simple Calculator</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xs">
        <div className="mb-4">
          <div className="bg-gray-100 text-[30px] font-bold p-2 mt-5 rounded text-right overflow-hidden ">{input || "0"}</div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded" onClick={() => handleClick('7')}>7</button>
          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded" onClick={() => handleClick('8')}>8</button>
          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded" onClick={() => handleClick('9')}>9</button>
          <button className="text-[20px] bg-[#A9A9A9] p-3 text-white rounded " onClick={toggleSign}>+/-</button>
          <button className="text-[20px] bg-[#A9A9A9] p-3 text-white rounded " onClick={backspace}>⮕</button>

          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded" onClick={() => handleClick('4')}>4</button>
          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded" onClick={() => handleClick('5')}>5</button>
          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded" onClick={() => handleClick('6')}>6</button>
          <button className="text-[20px] bg-[#808080] p-3 rounded text-white color" onClick={() => handleClick('×')}>×</button>
          <button className="text-[20px] bg-[#808080] p-3 rounded text-white color" onClick={() => handleClick('÷')}>÷</button>

          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded " onClick={() => handleClick('1')}>1</button>
          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded " onClick={() => handleClick('2')}>2</button>
          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded " onClick={() => handleClick('3')}>3</button>
          <button className="text-[20px] bg-[#808080] p-3 font-bold text-white rounded " onClick={() => handleClick('-')}>–</button>

          <button className="text-[20px] bg-red-600 p-2 text-white rounded" onClick={clear}>C</button>
          <button className="text-[20px] bg-gray-200 p-2 font-bold text-blue-500 rounded" onClick={() => handleClick('0')}>0</button>
          <button className="text-[20px] bg-gray-200 p-2 font-bold text-blue-500 rounded" onClick={() => handleClick('.')}>.</button>
          <button className="text-[20px] bg-[#808080] p-3 font-bold text-white rounded" onClick={() => handleClick('+')}>+</button>

          <button className="text-[20px] bg-blue-500 p-2 font-bold text-white rounded col-end-6 row-start-3 row-span-2" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;



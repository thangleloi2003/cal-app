import { useState } from "react";
import { evaluate } from "mathjs";
import { Button } from "@nextui-org/react";

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    try {
      const expression = input.replace(/×/g, '*').replace(/÷/g, '/');
      const result = evaluate(expression);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const clear = () => {
    setInput("")
  }

  const backspace = () => {
    setInput((prev) => prev.slice(0, -1));
  }

  const toggleSign = () => {
    if (input.charAt(0) === "-") {
      setInput((prev) => prev.substring(1));
    } else {
      setInput((prev) => "-" + prev);
    }
  }

  return (
    <div className="App min-h-screen bg-[beige] flex flex-col items-center justify-center">
      <h1 className="text-[30px] font-bold text-red-500 text-center translate-y-111 ">Simple Calculator</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xs">
        <div className="mb-4">
          <div className="bg-gray-100 text-[30px] font-bold p-2 mt-5 rounded ">{input || "0"}</div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <Button isLoading className="w-[60px] h-[60px] min-w-fit text-[20px] bg-gray-200 font-bold text-blue-500 rounded" onClick={() => handleClick('7')}>7</Button>
          {/* <Button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded" onClick={() => handleClick('8')}>8</Button>
          <Button className="text-[20px] Bg-gray-200 p-3 font-bold text-blue-500 rounded" onClick={() => handleClick('9')}>9</Button>
          <Button className="text-[20px] bg-[#A9A9A9] p-3 text-white rounded " onClick={toggleSign}>+/-</Button>
          <Button className="text-[20px] bg-[#A9A9A9] p-3 text-white rounded " onClick={backspace}>⮕</Button>

          <Button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded" onClick={() => handleClick('4')}>4</Button>
          <Button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded" onClick={() => handleClick('5')}>5</Button>
          <Button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded" onClick={() => handleClick('6')}>6</Button>
          <Button className="text-[20px] bg-[#808080] p-3 rounded text-white color" onClick={() => handleClick('×')}>×</Button>
          <Button className="text-[20px] bg-[#808080] p-3 rounded text-white color" onClick={() => handleClick('÷')}>÷</Button>

          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded " onClick={() => handleClick('1')}>1</button>
          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded " onClick={() => handleClick('2')}>2</button>
          <button className="text-[20px] bg-gray-200 p-3 font-bold text-blue-500 rounded " onClick={() => handleClick('3')}>3</button>
          <button className="text-[20px] bg-[#808080] p-3 font-bold text-white rounded " onClick={() => handleClick('-')}>–</button> */}
{/* 
          <button className="text-[20px] bg-red-600 p-2 text-white rounded" onClick={clear}>C</button> */} */
          {/* /* <button className="text-[20px] bg-gray-200 p-2 font-bold text-blue-500 rounded" onClick={() => handleClick('0')}>0</button>
          <button className="text-[20px] bg-gray-200 p-2 font-bold text-blue-500 rounded" onClick={() => handleClick('.')}>.</button>
          <button className="text-[20px] bg-[#808080] p-3 font-bold text-white rounded" onClick={() => handleClick('+')}>+</button>

          <button className="text-[20px] bg-blue-500 p-2 font-bold text-white rounded col-end-6 row-start-3 row-span-2" onClick={calculate}>=</button> */}
        </div>
      </div>
    </div>
  );
}

export default App;

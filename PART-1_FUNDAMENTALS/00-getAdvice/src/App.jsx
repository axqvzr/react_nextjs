import { useEffect, useState } from "react";

const App = () => {
  /* Needed inorder to display somthing to UI that trigger re-render. */
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    console.log(data);
    setAdvice(data.slip.advice);
    /* Increase count as well when clicking on button */
    setCount((prev) => prev + 1);
  }

  /* Call getAdvice function as soon as App Components mount so we can get 1 advice when we open. */
  useEffect(() => getAdvice, []);

  return (
    <div>
      <h1>{advice}</h1>
      {/* 
      Directly pass function like getAdvice
      OR
      Call inside callback funtion like ()=>getAdvice() */}
      <button onClick={getAdvice}>Get Advice</button>
      <Message count={count} />
    </div>
  );
};

export default App;

/* Message Component */
function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advices!
    </p>
  );
}

/* See implementation of it using vanilla js in vanilla-js.html file */
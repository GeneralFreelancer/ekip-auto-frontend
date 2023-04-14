import React, { useState, useEffect } from "react";

const StartTimer = () => {
  let [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      resetTimer();
    }
  }, [seconds]);

  const resetTimer = () => {
    setSeconds(60);
  };

  return seconds;
}


export default StartTimer;
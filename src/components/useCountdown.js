import { useEffect, useState } from 'react';

const useCountdown = (targetDate) => {
  const [flag,setFlag]=useState(true)
  const countDownDate = targetDate;


// console.log(countDown)
  useEffect(() => {
    const interval = setInterval(() => {
      setFlag(!flag)
      getReturnValues(countDownDate)
    }, 1000);
   

    return () => clearInterval(interval);
  }, [flag]);

  return getReturnValues(countDownDate);
};
const getReturnValues = (countDownDate) => {
  // calculate time left
  const countDown = countDownDate - Date.now();
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((countDown / 1000 / 60) % 60);
  const seconds = Math.floor((countDown / 1000) % 60);

  return [days, hours, minutes, seconds];
};


export { useCountdown };

import { useEffect, useState } from 'react';

const DateTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>{`${date.toLocaleDateString()} ${
      (date.getHours() < 10 ? '0' : '') + date.getHours()
    }:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`}</div>
  );
};

export default DateTime;

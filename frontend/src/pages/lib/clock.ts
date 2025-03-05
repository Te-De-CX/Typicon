const interval = 1000;

const clock = () => {
  const time = new Date(); 
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedTime;
};

setInterval(() => {
  console.log(clock());
}, interval);

export default clock;
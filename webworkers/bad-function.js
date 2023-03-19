const getNumber = (num) => {
  const start = Date.now();
  for (let x = 0; x < 5000_000_000; x++) {}
  const end = Date.now();
  const duration = end - start;
  return { num, duration };
};

onmessage = (message) => {
  const {num, duration} = getNumber(message.data);
  postMessage({num, duration});
};

const delayByMilliseconds = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export default delayByMilliseconds;

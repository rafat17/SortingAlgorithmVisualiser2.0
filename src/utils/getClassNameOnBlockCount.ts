const getClassNameOnBlockCount = (count: number) => {
  if (count > 40) {
    return "p-0 w-3";
  } else if (count > 30) {
    return "p-0 w-5";
  }

  return "p-4 w-8";
};

export default getClassNameOnBlockCount;

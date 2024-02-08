export const getNextID = (): number => {
  const storedID = localStorage.getItem('id');

  if (storedID === null) {
    localStorage.setItem('id', '1');
    return 1;
  } else {
    const id = parseInt(storedID);
    const nextID = id + 1;
    localStorage.setItem('id', nextID.toString());
    return nextID;
  }
};

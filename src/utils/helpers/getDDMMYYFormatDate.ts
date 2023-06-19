export const getDDMMYYFormatDate = (numberDay: number) => {
  const date = new Date(new Date().setDate(new Date().getDate() + numberDay));
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}.${month}.${year}`;
};

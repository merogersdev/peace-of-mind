// Manual Formatting of date
export default function formatDate(date) {
  const splitDate = date.split(/[- :]/); //
  const dayOfWeek = splitDate[2].split(/[T]/);
  const formattedDate = `${splitDate[1]}/${dayOfWeek[0]}/${splitDate[0]}`;
  return formattedDate;
}

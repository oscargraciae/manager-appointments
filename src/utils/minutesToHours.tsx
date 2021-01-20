
export const minutesToHour = (minutes :number) => {
  const hour = minutes / 60;
  // const hourWuthoutDecimal = Number(hour.toFixed(0));
  const decimals = hour % 1;
  const min = decimals * 60;
  if (min === 0) {
    return `${hour.toFixed(0)} hrs`;
  } else if(hour < 1) {
    return `${min} mins`;
  } else {
    return `${hour.toFixed(0)}:${min} hrs`;
  }
 
}
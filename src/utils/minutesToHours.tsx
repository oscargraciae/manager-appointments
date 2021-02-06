export const minutesToHour = (minutes :number) => {
  const hour = minutes / 60;
  const min = (hour % 1) * 60;

  if (min === 0) {
    return `${Math.trunc(hour)} hrs`;
  } else if(hour < 1) {
    return `${min} mins`;
  } else {
    return `${Math.trunc(hour)}:${min} hrs`;
  } 
}
import { IHour } from "../types/IHour";

export const getMin = (hours :IHour[]) => {
  hours.sort((a, b) :any => {
    if (a.openFrom && b.openFrom) {
      return a.openFrom.localeCompare(b.openFrom);
    }
  });

  return hours[0].openFrom;
}

export const getMax = (hours :IHour[]) => {
  hours.sort((a, b) :any => {
    if (a.openTill && b.openTill) {
      return b.openTill.localeCompare(a.openTill);
    }
  });

  return hours[0].openTill;
}
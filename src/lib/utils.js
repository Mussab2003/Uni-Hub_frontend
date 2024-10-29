import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function timeConverter(dateString) {
  const currentDate = new Date();
  const givenDate = new Date(dateString);

  // Calculate the difference in milliseconds
  const timeDiff = currentDate - givenDate;

  // Convert milliseconds to hours and days
  const secDiff = Math.floor(timeDiff / 1000);
  const minDiff = Math.floor(timeDiff / (1000 * 60));
  const hourDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const monthDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  const yearDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

  if (secDiff < 60) {
    if(secDiff <= 0){
      return '0 second ago'; 
    }
    return `${secDiff} seconds ago`;
  } else if (minDiff < 60) {
    return `${minDiff} minutes ago`;
  } else if (hourDiff < 24) {
    return `${hourDiff} hours ago`;
  } else if (dayDiff === 1) {
    return "yesterday";
  } else if(dayDiff < 30) {
    return `${dayDiff} days ago`;
  } else if (monthDiff < 12) {
    return `${monthDiff} months ago`;
  }else{
    return `${yearDiff} years ago`;
  }
}

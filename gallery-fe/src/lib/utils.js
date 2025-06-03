const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export function formatDate(date) {
  const formattedDate = Date.parse(date);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(formattedDate);
}

export function formatDateTime(date) {
  const formattedDate = Date.parse(date);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(formattedDate);
}

export function relativeFormatDateTime(date) {
  const formattedDate = Date.parse(date);
  const timeDifference = Date.now() - formattedDate;
  if (timeDifference < (MINUTE)) {
    return `${Math.trunc(timeDifference / SECOND)} seconds ago`;
  } else if (timeDifference < (HOUR)) {
    return `${Math.trunc(timeDifference / (MINUTE))} minutes ago`;
  } else if (timeDifference < (DAY)) {
    return `${Math.trunc(timeDifference / (HOUR))} hours ago`;
  } else {
    return `${Math.trunc(timeDifference / (DAY))} days ago`;
  }
}

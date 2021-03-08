import distanceInWordsStrict from 'date-fns/formatDistance';
import parseISO from 'date-fns/parseISO';
/**
 * @param {string} - ISO Date string
 * @param {boolean} - Format to print
 * @returns {string}
 */
export default function parseDate({date, strict}) {
  const today = new Date();
  const duration = distanceInWordsStrict(parseISO(date), today);
  const durationArr = duration.split(' ');
  if (!strict) return duration;
  return durationArr[0] + durationArr[1].substr(0, 1);
}

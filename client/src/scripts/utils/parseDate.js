import distanceInWordsStrict from 'date-fns/distance_in_words_strict';

export default function parseDate({date, strict}) {
  const today = new Date();
  const duration = distanceInWordsStrict(date, today);
  const durationArr = duration.split(' ');
  if (!strict) return duration;
  return durationArr[0] + durationArr[1].substr(0, 1);
}

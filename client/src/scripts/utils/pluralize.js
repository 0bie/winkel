/**
 * Return the plural of a word
 * based on a count
 * @param {string} word - The word to transform
 * @param {number} count - The count to check against (Optional)
 * @returns {string}
 */

export default function pluralize(word, count) {
  if (count <= 1) return word;
  const lastCharacter = word.charAt(word.length - 1);
  if (lastCharacter !== 'y') {
    return word + 's';
  } else {
    const plural = word.substr(0, word.length - 1);
    return plural + 'ies';
  }
}

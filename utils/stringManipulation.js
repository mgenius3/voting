export function shortenString(str, maxLength) {
  if (str?.length > maxLength) {
    // Shorten the string and append ellipses
    return str.slice(0, maxLength - 3) + "...";
  } else {
    // Return the original string if it's already shorter than the maximum length
    return str;
  }
}
export function getInitials(firstName, lastName) {
  const firstInitial = firstName?.charAt(0);
  const lastInitial = lastName?.charAt(0);
  if (!firstInitial && !lastInitial) return "nil";
  return firstInitial + lastInitial;
}

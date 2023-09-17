export default function isUrl(str: string): boolean {
  // Use a regular expression to check if the string looks like a URL
  const regex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return regex.test(str);
}

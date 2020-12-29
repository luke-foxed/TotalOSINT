const validIPRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const validDomainRegex = /^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/;
const validMd5Regex = /^[a-f0-9]{32}$/;
const validSha256Regex = /^[A-Fa-f0-9]{64}$/;
const validSha1Regex = /^[0-9A-Fa-f]{5,40}$/;
const privateIPRegex = /(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.).*/;

export const checkInput = (type, value) => {
  switch (type) {
    case 'IP':
      return validIPRegex.test(value) && !privateIPRegex.test(value);

    case 'Domain':
      return validDomainRegex.test(value);

    case 'Hash':
      return (
        validMd5Regex.test(value) ||
        validSha256Regex.test(value) ||
        validSha1Regex
      );
  }
};

const validIPRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const validDomainRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
const validMd5Regex = /^[a-f0-9]{32}$/;
const validSha256Regex = /^[A-Fa-f0-9]{64}$/;

export const checkInput = (type, value) => {
  switch (type) {
    case 'IP':
      return validIPRegex.test(value);

    case 'Domain':
      return validDomainRegex.test(value);

    case 'Hash':
      return validMd5Regex.test(value) || validSha256Regex.test(value);
  }
};

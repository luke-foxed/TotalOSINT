const axios = require('axios');
const config = require('config');
require('dotenv').config();

// const apiKey = config.get('whoisKey');
const apiKey = process.env.WHOIS_KEY;

const getWhoIs = async (type, query) => {
  try {
    let { data } = await axios.get(
      `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${query}&outputFormat=JSON`
    );

    const {
      WhoisRecord: { registryData },
    } = data;

    if (type === 'ip') {
      if (data.WhoisRecord.subRecords) {
        return {
          details: {
            range: data.WhoisRecord.subRecords[0].customField1Value,
            date_created: data.WhoisRecord.subRecords[0].createdDate,
            org: data.WhoisRecord.subRecords[0].registrant.organization,
            registrar_name: data.WhoisRecord.registrarName,
            country: data.WhoisRecord.subRecords[0].registrant.country,
            url: `https://whois.whoisxmlapi.com/lookup?q=${query}`,
          },
        };
      } else {
        return {
          details: {
            range: registryData.customField1Value,
            date_created: registryData.createdDate,
            org: registryData.registrant.organization,
            registrar_name: data.WhoisRecord.registrarName,
            country: registryData.registrant.country,
            url: `https://whois.whoisxmlapi.com/lookup?q=${query}`,
          },
        };
      }
    } else if (type === 'domain') {
      return {
        details: {
          date_created: data.WhoisRecord.createdDateNormalized,
          org: data.WhoisRecord.registrant.organization,
          country: data.WhoisRecord.registrant.country,
          registrar_name: data.WhoisRecord.registrarName,
          domain_name: data.WhoisRecord.domainName,
          url: `https://whois.whoisxmlapi.com/lookup?q=${query}`,
        },
      };
    }
  } catch (err) {
    console.error(err);
    return {
      error: 'Error Retrieving WhoIs Data',
    };
  }
};

module.exports = {
  getWhoIs,
};

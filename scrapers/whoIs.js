const axios = require('axios');
const config = require('config');
const apiKey = config.get('whoisKey');

const getWhoIs = async (type, query) => {
  try {
    let { data } = await axios.get(
      `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${query}&outputFormat=JSON`
    );

    if (type === 'ip') {
      return {
        details: {
          range: data.WhoisRecord.registryData.customField1Value,
          date_created: data.WhoisRecord.registryData.createdDate,
          registrar_name: data.WhoisRecord.registrarName,
          org: data.WhoisRecord.registryData.registrant.organization,
          country: data.WhoisRecord.registryData.registrant.country,
        },
      };
    } else if (type === 'domain') {
      return {
        details: {
          date_created: data.WhoisRecord.createdDateNormalized,
          org: data.WhoisRecord.registrant.organization,
          country: data.WhoisRecord.registrant.country,
          registrar_name: data.WhoisRecord.registrarName,
          domain_name: data.WhoisRecord.domainName,
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

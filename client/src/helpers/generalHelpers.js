const jsonexport = require('jsonexport');

export const exportAsCSV = async (scrapedData) => {
  try {
    const csv = await jsonexport(scrapedData);

    let blob = new Blob([csv], { type: 'text/plain' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
  } catch (err) {
    console.error(err);
    alert('Error Exporting File!');
  }
};

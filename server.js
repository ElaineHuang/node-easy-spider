const https = require('https');
const cheerio = require('cheerio');

// HTTP GET JSON

https.get('https://httpbin.org/ip', (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    console.log(JSON.parse(data));
  }); 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

// HTTP GET HTML

https.get('https://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm', (resp) => {
  let body = '';
  resp.on('data', (chunk) => {
    body += chunk;
  });
  resp.on('end', () => {
    $ = cheerio.load(body);
    const todayRow = $('.FcstBoxTable01').children('tbody').children().first().children();
    const temperature = todayRow.first().next().text();
    const rain = todayRow.last().text();
    console.log('Today: ' + temperature + ' 度C');
    console.log('降雨機率: ' + rain); 
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

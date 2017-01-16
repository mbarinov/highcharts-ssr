const exporter = require('highcharts-export-server');
const express = require('express')
const app = express()
const Config = require('./config');
const Series = require('./series');
const exportSettings = Object.assign({}, {
    type: 'png',
},
{
  options: getConfigByChartType(),
});

exporter.initPool();

app.get('/chart', function (req, res) {
  exporter.export(exportSettings, function (err, output) {
    if (err) {
      res.end(err);
      return false;
    }

    const img = new Buffer(output.data, 'base64');

    res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': img.length
   });
   res.end(img);
  });

})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

function getConfigByChartType(type = 'barChart') {
  Config.series = getSeries();
  return Config;
}

function getSeries() {
  return Series
}

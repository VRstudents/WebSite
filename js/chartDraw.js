google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
var data = google.visualization.arrayToDataTable([
  ['Quarter', 'Answers', 'Correct'],
  ['1',  45,      41],
  ['2',  40,      38],
  ['3',  42,       35],
  ['4',  33,      29]
]);

var options = {
  title: 'Performance',
  curveType: 'function',
  legend: { position: 'bottom' }
};

var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

chart.draw(data, options);
}
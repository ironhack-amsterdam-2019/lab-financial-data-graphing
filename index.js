class MyCoolChartStuff {
  constructor() {
    this.baseURL = "https://api.coindesk.com/v1/bpi/historical/close.json";
    this.setParams()
    axios.defaults.crossDomain = true;
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: 1000,
      headers: {'Access-Control-Allow-Origin': true}    });
    this.instance.get("/").then(data => console.log(data)).catch(error => console.log(error))
    this.ctx = document.getElementById('myChart').getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'apples',
          data: [12, 19, 3, 17, 6, 3, 7],
          backgroundColor: "rgba(153,255,51,0.4)"
        }, {
          label: 'oranges',
          data: [2, 29, 5, 5, 2, 3, 10],
          backgroundColor: "rgba(255,153,0,0.4)"
        }]
      }
    });
  }

  setParams() {
    this.params = {
      currency: "EUR",
      start: "2013-01-01",
      end: "2013-02-01"
    }
  }
}

window.onload = function start() {
  new MyCoolChartStuff()
}
class MyCoolChartStuff {
  constructor() {
    this.baseURL = "https://api.coindesk.com/v1/bpi/historical/close.json";
    this.ctx = document.getElementById('myChart').getContext('2d');
    this.end = document.getElementById("end")
    this.start = document.getElementById("start")
    this.currency = document.getElementById("currency")
    this.setParams()
    this.currency.addEventListener("change", this.endCurrency.bind(this))
    this.end.addEventListener("change", this.endChange.bind(this))
    this.start.addEventListener("change", this.startChange.bind(this))
    this.draw()
  }

  endCurrency(e) {
    this.params.currency = currency[currency.selectedIndex].value;
    this.draw();
  }

  endChange(e) {
    this.params.end = e.currentTarget.value;
    this.start.setAttribute("max", this.params.end)
    this.draw();
  }

  startChange(e) {
    this.params.start = e.currentTarget.value;
    this.end.setAttribute("min", this.params.end)
    this.draw();
  }

  draw() {
    axios.defaults.crossDomain = true;
    axios.get(this.baseURL, {
      params: this.params
    }).then(response => {
      let labels = [];
      let data = [];
      for (let key in response.data.bpi) {
        data.push(response.data.bpi[key])
        labels.push(key)
      }
      let chartData = {
        labels: labels,
        datasets: [{
          label: 'BTC',
          data: data,
          backgroundColor: "rgba(153,255,51,0.4)"
        }]
      }
      this.chart = new Chart(this.ctx, {
        type: 'line',
        data: chartData
      });
    }).catch(error => console.log(error))
  }

  setParams() {
    this.params = {
      currency: "EUR",
      start: this.start.value,
      end: this.end.value
    }
  }
}

window.onload = function start() {
  new MyCoolChartStuff()
}
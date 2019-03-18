export default {
  datasetFill: true,
  animation: {steps: 60, easing: 'easeOutQuart'},
  animationSteps: 60,
  responsive: true,
  fill: true,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        drawOnChartArea: false
      }
    }],
    yAxes: [{
      display: false,
      gridLines: {
        drawOnChartArea: false
      }
    }]
  },
  layout: {
    padding: {
      top: 8
    }
  }
};

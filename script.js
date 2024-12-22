function calculateSIP() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
    const annualRate = parseFloat(document.getElementById("annualRate").value);
    const investmentPeriod = parseInt(document.getElementById("investmentPeriod").value);
  
    if (
      isNaN(monthlyInvestment) ||
      isNaN(annualRate) ||
      isNaN(investmentPeriod) ||
      monthlyInvestment <= 0 ||
      annualRate <= 0 ||
      investmentPeriod <= 0
    ) {
      document.getElementById("result").innerText = "Please enter valid positive values for all fields.";
      return;
    }
  
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = investmentPeriod * 12;
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    const investedAmount = monthlyInvestment * totalMonths;
    const earnedAmount = futureValue - investedAmount;
  
    document.getElementById("result").innerText = `Future Value: ₹${futureValue.toFixed(2)}`;
  
    // Update Chart
    updateChart(investedAmount, earnedAmount);
  }
  
  let sipChart;
  function updateChart(investedAmount, earnedAmount) {
    const ctx = document.getElementById("sipChart").getContext("2d");
  
    if (sipChart) sipChart.destroy(); // Destroy previous chart if it exists
  
    sipChart = new Chart(ctx, {
      type: "doughnut", // Doughnut (Ring Pie Chart)
      data: {
        labels: ["Invested Amount", "Earned Amount"],
        datasets: [
          {
            label: "SIP Breakdown",
            data: [investedAmount, earnedAmount],
            backgroundColor: ["#4caf50", "#fbc02d"],
            hoverBackgroundColor: ["#66bb6a", "#ffd54f"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#f8f8f8",
            },
          },
        },
      },
    });
  }
  
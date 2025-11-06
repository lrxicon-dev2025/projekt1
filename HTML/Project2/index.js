const btnCalculate = document.getElementById("Calculate");
const totalSpan = document.getElementById("total");

function calculateTotal() {
    const billEl = document.getElementById("billAmount");
    const tipEl = document.getElementById("tip");

    // ensure elements exist (defensive programming)
    if (!billEl || !tipEl || !totalSpan) return;

    const billAmount = parseFloat(billEl.value);
    const tipPercentage = parseFloat(tipEl.value) || 0;

    // validate bill amount
    if (Number.isNaN(billAmount)) {
        totalSpan.textContent = "Please enter a valid bill amount";
        return;
    }

    const total = billAmount + (billAmount * tipPercentage / 100);
    totalSpan.textContent = total.toFixed(2);
}

if (btnCalculate) {
    btnCalculate.addEventListener("click", calculateTotal);
}

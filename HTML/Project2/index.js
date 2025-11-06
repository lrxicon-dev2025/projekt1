const btnCalculate = document.getElementById("calculate");
const totalSpan = document.getElementById("total");
const billAmountInput = document.getElementById("billAmount");
const tipInput = document.getElementById("tip");

function calculateTotal() {
    if (!billAmountInput || !tipInput || !totalSpan) {
        console.error("Required elements not found");
        return;
    }

    const billAmount = parseFloat(billAmountInput.value);
    const tipPercentage = parseFloat(tipInput.value) || 0;

    if (isNaN(billAmount) || billAmount < 0) {
        totalSpan.textContent = "Please enter a valid bill amount";
        return;
    }

    if (isNaN(tipPercentage) || tipPercentage < 0 || tipPercentage > 100) {
        totalSpan.textContent = "Tip must be between 0 and 100";
        return;
    }

    const total = billAmount + (billAmount * tipPercentage / 100);
    totalSpan.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(total);
}

function setupEventListeners() {
    if (btnCalculate) {
        btnCalculate.addEventListener("click", calculateTotal);
    }

    // Auto-calculate on input changes after initial calculation
    [billAmountInput, tipInput].forEach(input => {
        if (input) {
            input.addEventListener("input", () => {
                if (totalSpan.textContent !== "0.00") {
                    calculateTotal();
                }
            });
        }
    });
}

// Initialize the calculator
setupEventListeners();

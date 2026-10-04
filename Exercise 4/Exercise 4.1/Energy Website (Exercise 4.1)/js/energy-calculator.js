(() => {
    const form = document.querySelector("#energy-calculator-form");
    const message = document.querySelector("#calculator-message");
    const outputIds = ["daily-energy", "monthly-energy", "yearly-energy", "monthly-cost", "yearly-cost"];
    const outputs = outputIds.map(id => document.getElementById(id));
    const wattsInput = document.getElementById("appliance-watts");
    const hoursInput = document.getElementById("daily-hours");
    const rateInput = document.getElementById("electricity-rate");
    const currency = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });

    if (!form || !message || outputs.some(output => !output) || !wattsInput || !hoursInput || !rateInput) {
        console.error("The appliance energy calculator is missing required page elements.");
        return;
    }

    function clearResults() {
        outputs.forEach(output => {
            output.textContent = "-";
        });
    }

    function calculate(event) {
        if (event.type === "submit") {
            event.preventDefault();
        }

        const watts = Number(wattsInput.value);
        const hours = Number(hoursInput.value);
        const rateCents = Number(rateInput.value);
        const inputs = [wattsInput, hoursInput, rateInput];
        const invalidInput = inputs.find(input =>
            !input.value.trim() || !input.validity.valid || !Number.isFinite(input.valueAsNumber)
        );

        inputs.forEach(input => {
            input.setAttribute("aria-invalid", String(!input.value.trim() || !input.validity.valid));
        });

        if (invalidInput) {
            clearResults();
            message.textContent = invalidInput.validity.valueMissing
                ? "Please enter a value in each field."
                : "Check your values: power must be above 0 W, use must be between 0 and 24 hours, and the electricity rate cannot be negative.";
            message.classList.add("is-error");
            return;
        }

        const dailyKwh = watts * hours / 1000;
        const yearlyKwh = dailyKwh * 365;
        const monthlyKwh = yearlyKwh / 12;
        const monthlyCost = monthlyKwh * rateCents / 100;
        const yearlyCost = yearlyKwh * rateCents / 100;
        const results = [dailyKwh, monthlyKwh, yearlyKwh, monthlyCost, yearlyCost];

        if (!results.every(Number.isFinite)) {
            clearResults();
            message.textContent = "These values are too large to calculate. Please enter smaller values.";
            message.classList.add("is-error");
            return;
        }

        outputs[0].textContent = `${dailyKwh.toFixed(2)} kWh`;
        outputs[1].textContent = `${monthlyKwh.toFixed(2)} kWh`;
        outputs[2].textContent = `${yearlyKwh.toFixed(2)} kWh`;
        outputs[3].textContent = currency.format(monthlyCost);
        outputs[4].textContent = currency.format(yearlyCost);
        message.textContent = "Estimate updated using the values entered.";
        message.classList.remove("is-error");
    }

    form.addEventListener("submit", calculate);
})();

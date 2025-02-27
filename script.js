document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phoneInput");

    phoneInput.addEventListener("input", function (e) {
        let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

        if (!input.startsWith("0")) {
            input = "+" + input; // Ensure "+" is always present
        }

        if (input.length > 3) {
            input = "+" + input.substring(1, 3) + " " + input.substring(3); // Add space after country code
        }

        e.target.value = input;
    });

    phoneInput.addEventListener("blur", function () {
        if (phoneInput.value === "+") {
            phoneInput.value = ""; // Clear input if only "+" is entered
        }
    });
});

function trackNumber() {
    const phoneNumber = document.getElementById("phoneInput").value.trim();
    const resultDiv = document.getElementById("result");
    const apiKey = "type your api key from numverify"; // Replace with your actual API key
    const url = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${encodeURIComponent(phoneNumber)}`;

    if (!phoneNumber || phoneNumber.length < 5) {
        resultDiv.innerHTML = "<p style='color: red;'>Please enter a valid phone number.</p>";
        return;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                resultDiv.innerHTML = `
                    <p><strong>Country:</strong> ${data.country_name || "N/A"}</p>
                    <p><strong>Location:</strong> ${data.location || "N/A"}</p>
                    <p><strong>Carrier:</strong> ${data.carrier || "N/A"}</p>
                    <p><strong>Line Type:</strong> ${data.line_type || "N/A"}</p>
                `;
            } else {
                resultDiv.innerHTML = "<p style='color: red;'>Invalid phone number.</p>";
            }
        })
        .catch(error => {
            resultDiv.innerHTML = "<p style='color: red;'>Error fetching data. Please try again later.</p>";
            console.error("Error:", error);
        });
}

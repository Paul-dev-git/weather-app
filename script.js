const apiKey = "2cc73287bf1471236962b65a5be6a3d0";

document.getElementById("SearchButton").addEventListener("click", async function () {
    const rawInput = document.getElementById("SearchInput").value.trim();
    const city = encodeURIComponent(rawInput);

    const emojiEl = document.querySelector(".today");
    const tempEl = document.querySelector(".temperature");

    if (!city) return;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            console.log("Fehlerantwort:", data); // zeigt dir genaue Ursache
            emojiEl.textContent = "❓";
            tempEl.textContent = `Fehler: ${data.message}`;
            return;
        }

        const temp = Math.round(data.main.temp);
        if (temp >= 20) {
            emoji = "☀️";
        } else if (temp >= 12) {
            emoji = "⛅";
        } else if (temp >= 6) {
            emoji = "☁️";
        } else {
            emoji = "❄️";
        }

        emojiEl.textContent = emoji;
        tempEl.textContent = `${temp}°C in ${data.name}`;
    } catch (error) {
        emojiEl.textContent = "⚠️";
        tempEl.textContent = "Fehler beim Abrufen";
        console.error(error);
    }
});

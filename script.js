document.addEventListener("DOMContentLoaded", loadEntries);

function logCapture(type) {
    const timestamp = new Date().toLocaleString();

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        saveEntry(type, timestamp, latitude, longitude);
    }, error => {
        alert("Location access denied. Logging without location.");
        saveEntry(type, timestamp, "Unknown", "Unknown");
    });
}

function saveEntry(type, timestamp, lat, lon) {
    const lure = document.getElementById("lure").value || "N/A";
    const depth = document.getElementById("depth").value || "N/A";

    const entry = {
        type,
        timestamp,
        lure,
        depth,
        lat,
        lon
    };

    let logEntries = JSON.parse(localStorage.getItem("fishingLog")) || [];
    logEntries.push(entry);
    localStorage.setItem("fishingLog", JSON.stringify(logEntries));

    displayEntries();
}

function loadEntries() {
    const logEntries = JSON.parse(localStorage.getItem("fishingLog")) || [];
    logEntries.forEach(entry => addEntryToList(entry));
}

function displayEntries() {
    const logList = document.getElementById("logList");
    logList.innerHTML = "";

    const logEntries = JSON.parse(localStorage.getItem("fishingLog")) || [];
    logEntries.forEach(entry => addEntryToList(entry));
}

function addEntryToList(entry) {
    const logList = document.getElementById("logList");
    const item = document.createElement("li");
    item.textContent = `${entry.timestamp} - ${entry.type}, Lure: ${entry.lure}, Depth: ${entry.depth} ft, Location: (${entry.lat}, ${entry.lon})`;
    logList.appendChild(item);
}

function clearLog() {
    localStorage.removeItem("fishingLog");
    displayEntries();
}

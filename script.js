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

    const logList = document.getElementById("logList");
    const entry = document.createElement("li");
    entry.textContent = `${timestamp} - ${type}, Lure: ${lure}, Depth: ${depth} ft, Location: (${lat}, ${lon})`;
    logList.appendChild(entry);
}

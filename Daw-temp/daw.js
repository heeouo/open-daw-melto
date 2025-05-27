document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addInstrumentBtn");
    const options = document.getElementById("instrumentOptions");
    const closeBtn = document.getElementById("closeOptions");
    const trackArea = document.getElementById("trackArea");
    trackArea.style.display = "block";
    

    addBtn.addEventListener("click", () => {
        options.classList.toggle("hidden");
    });

    closeBtn.addEventListener("click", () => {
        options.classList.add("hidden");
    });

    document.querySelectorAll(".instrument").forEach(button => {
        button.addEventListener("click", () => {
            const instrument = button.dataset.instrument;
            addTrack(instrument);
            options.classList.add("hidden");
        });
    });

    function addTrack(instrument) {
        const track = document.createElement("div");
        track.classList.add("track");
        track.textContent = `${instrument} 트랙`;
        trackArea.appendChild(track);
    }
});
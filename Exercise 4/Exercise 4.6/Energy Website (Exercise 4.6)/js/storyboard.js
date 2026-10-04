function storyClick(page = 2) {
    if (page === 1) {
        document.querySelector("div.placement").classList.remove("right");
        document.querySelector("#sb1").classList.remove("hidden");
        document.querySelector("#sb2").classList.add("hidden");
    } else {
        document.querySelector("div.placement").classList.add("right");
        document.querySelector("#sb2").classList.remove("hidden");
        document.querySelector("#sb1").classList.add("hidden");
    }

}

function showGraph(page = 1) {
    const graph = document.querySelector("dialog img");
    const dialog = document.querySelector("dialog");

    if (!graph || !dialog) {
        console.error("The storyboard graph dialog is missing from the page.");
        return;
    }

    graph.src = page === 1
        ? "./images/TVManufacturingCountries.png"
        : "./images/PowerConsumedByScreenTechnology.png";
    graph.alt = page === 1
        ? "TV manufacturing counts by country"
        : "Average power consumption by screen technology";

    dialog.showModal();
}
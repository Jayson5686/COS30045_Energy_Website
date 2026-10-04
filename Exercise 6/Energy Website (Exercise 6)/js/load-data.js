d3.csv("./data/Ex6.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
})).then(d => {
    createHistogram(d);
    drawScatterPlot(d);
    populateFilters(d);
    createTooltip(d);
    handleMouseEvents()
}).catch(error => {
    console.error("Failed to load the TV dataset for the visualisations.", error);

    d3.select("main")
        .insert("p", ":first-child")
        .attr("class", "data-load-error")
        .attr("role", "alert")
        .text("The visualisations could not load. Please check that the data file is available and reload the page.");
});
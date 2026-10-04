const populateFilters = (data) => {

    d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
    .attr("class", d => `filter ${d. isActive ? "active" : ""}`)
    .attr("id", d => d.id)
    .text(d => d. label)

    .on("click", (e, d) => {

        if (!d.isActive) {

            // make sure button clicked is not already active
            filters_screen.forEach(filter => {
                filter.isActive = d.id === filter.id ? true : false;
            });

            // update the filter buttons based on which one was clicked
            d3.selectAll("#filters_screen .filter")
                .classed("active", filter => filter.id === d.id);

            updateHistogram(d.id, data);
         }
    })
}


const updateHistogram = (filterId, data) => {

    const updatedData = filterId === "all" ? data : data.filter(tv => tv.screenTech === filterId);

    const updatedBins = binGenerator(updatedData);

    d3.selectAll("#histogram rect")
        .data(updatedBins)
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
    
    histogramGroup.selectAll(".bar-label")
        .data(updatedBins)
        .join("text")
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("class", "bar-label")
        .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
        .attr("y", d => yScale(d.length) - 6)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .style("font-weight", "600")
        .style("fill", "#333")
        .text(d => d.length > 0 ? d.length : "");
}


const createTooltip = (data) => {
    const tooltip = innerChartS.append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.8)

    tooltip.append("text")
        .text("NA")
        .attr("x", 5)
        .attr("y", 15)
        .attr("text-anchor", "start")
        .attr("fill", "white")
        .attr("font-weight", 700)
        .attr("font-size", "8px")
        .attr("class", "t1")

    tooltip.append("text")
        .text("NA")
        .attr("x", 5)
        .attr("y", 15 + 10)
        .attr("text-anchor", "start")
        .attr("fill", "white")
        .attr("font-weight", 700)
        .attr("font-size", "8px")
        .attr("class", "t2")
}


const handleMouseEvents = () => {
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            const line1 = d3.select(".tooltip .t1").text(`Screen Size: ${d.screenSize}`);
            const line2 = d3.select(".tooltip .t2").text(`TV Brand: ${d.brand}`);

            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            const widthLine1 = line1.node().getComputedTextLength();
            const widthLine2 = line2.node().getComputedTextLength();

            const longestTextWidth = Math.max(widthLine1, widthLine2);
            const padding = 20; 
            const dynamicTooltipWidth = longestTextWidth + padding;
            
            d3.select(".tooltip rect")
                .attr("width", dynamicTooltipWidth);

            d3.select(".tooltip")
                .attr("transform", `translate(${cx - (0.5 * tooltipWidth)}, ${cy - (1.5 * tooltipHeight)})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", (e, d) => {
            d3.select(".tooltip")
                .style("opacity", 1)
                .attr("transform", "translate(0, 500)");
        })
}
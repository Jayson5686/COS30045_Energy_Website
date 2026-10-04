function createHistogram(data) {
    // 1. Ensure data is formatted as numbers
    // Assuming your data objects look like: { energyConsumption: 250 }
    data.forEach(d => {
        d.energyConsumption = +d.energyConsumption;
    });

    // 2. Define internal logical coordinate dimensions
    
    const margin = { top: 60, right: 40, bottom: 60, left: 60 };
    const baseWidth = 800;  
    const baseHeight = 450;    
    const width = baseWidth - margin.left - margin.right;
    const height = baseHeight - margin.top - margin.bottom;

    // 3. RESPONSIVE SVG SETUP
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${baseWidth} ${baseHeight}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "auto");

    const group = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    histogramGroup = group;

    // 4. Set up the X Scale (Linear scale across the range of energy values)
    xScale
        .domain([0, d3.max(data, d => d.energyConsumption) * 1.1]) // 10% headroom
        .range([0, width]);

    // 5. Use D3's Bin Generator to compute the data thresholds
    // (Translates raw numbers into array buckets with x0 and x1 bounds)
    const histogram = binGenerator
        .domain(xScale.domain())
        .thresholds(xScale.ticks(15)); // Suggests roughly 15 intervals to D3

    const bins = histogram(data);

    // 6. Set up the Y Scale (Linear scale based on the highest frequency bin count)
    yScale
        .domain([0, d3.max(bins, d => d.length) * 1.1]) // 10% headroom for frequency count
        .range([height, 0]);

    // 7. Render X and Y Axes
    group.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    group.append("g")
        .call(d3.axisLeft(yScale));

    // 8. Render the Histogram Bars
    group.selectAll(".hist-bar")
        .data(bins)
        .enter()
        .append("rect")
        .attr("class", "hist-bar")
        // d.x0 is the starting value of the bin, d.x1 is the ending value
        .attr("x", d => xScale(d.x0) + 1) // +1 adds a tiny pixel gap between bins
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
        // Remember: SVG draws top-to-bottom! 
        .attr("y", d => yScale(d.length)) 
        .attr("height", d => height - yScale(d.length)) 
        .attr("fill", "teal")
        .style("opacity", 0.8);

    // 9. Add frequency count labels directly above each bar
    group.selectAll(".bar-label")
        .data(bins)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
        .attr("y", d => yScale(d.length) - 6)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .style("font-weight", "600")
        .style("fill", "#333")
        .text(d => d.length > 0 ? d.length : "");

    // --- Titles and Axis Labels ---
    group.append("text")
        .text("TV Energy Consumption Distribution")
        .attr("x", width / 2)
        .attr("y", -20)
        .style("font-family", "sans-serif")
        .style("font-size", "14px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle");

    group.append("text")
        .text("Energy Consumption (kWh)")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .style("font-family", "sans-serif")
        .style("font-size", "11px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle");

    group.append("text")
        .text("Frequency (Number of TVs)")
        .attr("x", -1 * height / 2)
        .attr("y", -40)
        .style("font-family", "sans-serif")
        .style("font-size", "11px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle")
        .style("transform", "rotate(270deg)");
}
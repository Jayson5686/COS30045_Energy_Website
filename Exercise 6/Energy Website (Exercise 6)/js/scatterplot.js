function drawScatterPlot(data) {
    
    // 2. Base SVG and Group Container setup
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")

    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 3. Set up Scales
    // scalePoint is perfect for scatter plots with categorical axes because 
    // it maps discrete values to evenly spaced points along the axis line.
    const xScale = d3.scaleLinear()
        .domain([0, 10]) // Sets the scale explicitly from 0 to 10 stars
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energyConsumption) + 50])
        .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale)
        .ticks(20);

    const uniqueTechs = Array.from(new Set(data.filter(d => typeof d.screenTech === "string").map(d => d.screenTech)));
    colorScale.domain(uniqueTechs).range(["steelblue", "orange", "darkgreen"]);

    // 4. Render X and Y Axes
    innerChartS.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle");

    innerChartS.append("g")
        .call(d3.axisLeft(yScale));

    // 5. Render the Scatter Plot Circles (Markers)
    innerChartS.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.star))    // Center X coordinate
        .attr("cy", d => yScale(d.energyConsumption))   // Center Y coordinate
        .attr("r", 5)                       // Radius of the circle point
        .attr("fill", colorScale)            // Accent color for dots
        .attr("stroke", "#fff")             // White border around dots to make them pop
        .attr("stroke-width", ".5px");

    // --- Your exact Text Labels & Titles ---
    // Chart Title
    innerChartS.append("text")
        .text("Star Rating vs Power Consumption")
        .attr("x", innerWidth / 2)
        .attr("y", -10)
        .style("font-family", "sans-serif")
        .style("font-size", "12px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle");

    // X Axis Title
    innerChartS.append("text")
        .text("Star Rating")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 50)
        .style("font-family", "sans-serif")
        .style("font-size", "10px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle");

    // Y Axis Title
    innerChartS.append("text")
        .text("Power Consumption")
        .attr("x", -1 * innerHeight / 2)
        .attr("y", -40)
        .style("font-family", "sans-serif")
        .style("font-size", "10px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle")
        .style("transform", "rotate(270deg)");

    const legend = innerChartS.append("g")
        .attr("class", "chart-legend")
        .attr("transform", `translate(${innerWidth - 60}, 50)`);

    // 2. Bind the screenTech domain array to create a row for each technology
    const legendRow = legend.selectAll(".legend-item")
        .data(uniqueTechs) 
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`); 

    // 3. Draw the colored rectangles/squares
    legendRow.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("rx", 2)
        .attr("fill", d => colorScale(d)); 

    // 4. Add the text labels next to the colored squares
    legendRow.append("text")
        .attr("x", 20) 
        .attr("y", 10)
        .style("font-family", "sans-serif")
        .style("font-size", "11px")
        .style("font-weight", "500")
        .style("fill", "#333")
        .text(d => d); 
    
}
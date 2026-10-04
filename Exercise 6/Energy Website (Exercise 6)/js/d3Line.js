function createTimeSeriesLineChart(data) {
    // 1. Sort data chronologically by year
    data.sort((a, b) => a.year - b.year);

    // 2. Define the regions you want to plot
    const regions = ["queensland", "nsw", "sa", "tasmania", "victoria"];
    
    // Display names mapping for the legend/labels
    const regionLabels = {
        queensland: "Queensland",
        nsw: "New South Wales",
        sa: "South Australia",
        tasmania: "Tasmania",
        victoria: "Victoria"
    };

    // 3. Set up canvas dimensions and margins
    const margin = { top: 40, right: 150, bottom: 60, left: 60 }; // Added right margin for labels
    const width = 750 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(".responsive-svg-container.lineChart")
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("width", "100%")

    const group = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 4. Set up Scales
    // Since years are plain numbers, scaleLinear works beautifully
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, width]);

    // Find the maximum value across ALL regions to scale the Y-axis properly
    const maxPowerValue = d3.max(data, d => {
        return d3.max(regions, region => d[region]);
    });

    const yScale = d3.scaleLinear()
        .domain([0, maxPowerValue])
        .range([height, 0]);

    // 5. Ordinal Color scale for the different region lines
    const colorScale = d3.scaleOrdinal()
        .domain(regions)
        .range(d3.schemeCategory10);

    // 6. Render Axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")); // "d" removes the comma separator from years (e.g., 2,025 -> 2025)
    group.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    group.append("g")
        .call(d3.axisLeft(yScale));

    // 7. Define the Line Generator
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y((d, i, nodes) => {
            // This is dynamically set below during execution
            return yScale(d.value);
        });

    // 8. Draw a line for EACH region
    regions.forEach(region => {
        
        // Transform the broad data structure into a specific array for this specific line
        const regionData = data.map(d => ({
            year: d.year,
            value: d[region]
        }));

        // Set up the line generator tracking values specifically for this loop
        const specificLine = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.value));

        // Append the line path
        group.append("path")
            .datum(regionData)
            .attr("class", `line-${region}`)
            .attr("d", specificLine)
            .attr("fill", "none")
            .attr("stroke", colorScale(region))
            .attr("stroke-width", 2.5);

        // 9. Add an interactive or static text label at the end of each line
        const lastPoint = regionData[regionData.length - 1];
        group.append("text")
            .attr("x", xScale(lastPoint.year) + 5) // Slightly to the right of the line end
            .attr("y", yScale(lastPoint.value) + 4) // Centered vertically with line
            .style("fill", colorScale(region))
            .style("font-family", "sans-serif")
            .style("font-size", "11px")
            .style("font-weight", "600")
            .text(regionLabels[region]);
    });

    // --- Graph Layout Titles ---
    group.append("text")
        .text("Electricity Price Trend per Megawatt Hour")
        .attr("x", width / 2)
        .attr("y", -15)
        .style("font-family", "sans-serif")
        .style("font-size", "14px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle");

    group.append("text")
        .text("Year")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .style("font-family", "sans-serif")
        .style("font-size", "11px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle");

    group.append("text")
        .text("$ per Megawatt Hour")
        .attr("x", -1 * height / 2)
        .attr("y", -40)
        .style("font-family", "sans-serif")
        .style("font-size", "11px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle")
        .style("transform", "rotate(270deg)");
}

d3.csv("./data/LineChart.csv", d => ({ 
    year: +d.Year, 
    queensland: +d["Queensland ($ per megawatt hour)"], 
    nsw: +d["New South Wales ($ per megawatt hour)"], 
    sa: +d["South Australia ($ per megawatt hour)"],
    tasmania: +d["Tasmania ($ per megawatt hour)"],
    victoria: +d["Victoria ($ per megawatt hour)"]
})
).then(createTimeSeriesLineChart);
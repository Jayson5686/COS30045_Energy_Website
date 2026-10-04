function createScatterPlot(data) {
    console.log(data)
    // 1. Set up canvas dimensions and margins
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // 2. Base SVG and Group Container setup
    const svg = d3.select(".responsive-svg-container.scatterPlot")
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("width", "100%")

    const group = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 3. Set up Scales
    // scalePoint is perfect for scatter plots with categorical axes because 
    // it maps discrete values to evenly spaced points along the axis line.
    const xScale = d3.scaleLinear()
        .domain([0, 10]) // Sets the scale explicitly from 0 to 10 stars
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.power) + 50])
        .range([height, 0]);

    const xAxis = d3.axisBottom(xScale)
        .ticks(20);

    // 4. Render X and Y Axes
    group.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle");

    group.append("g")
        .call(d3.axisLeft(yScale));

    // 5. Render the Scatter Plot Circles (Markers)
    group.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.star))    // Center X coordinate
        .attr("cy", d => yScale(d.power))   // Center Y coordinate
        .attr("r", 6)                       // Radius of the circle point
        .attr("fill", "crimson")            // Accent color for dots
        .attr("stroke", "#fff")             // White border around dots to make them pop
        .attr("stroke-width", ".5px");

    // --- Your exact Text Labels & Titles ---
    // Chart Title
    group.append("text")
        .text("Star Rating vs Power Consumption")
        .attr("x", width / 2)
        .attr("y", -10)
        .style("font-family", "sans-serif")
        .style("font-size", "12px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle");

    // X Axis Title
    group.append("text")
        .text("Star Rating")
        .attr("x", width / 2)
        .attr("y", height + 50)
        .style("font-family", "sans-serif")
        .style("font-size", "10px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle");

    // Y Axis Title
    group.append("text")
        .text("Power Consumption")
        .attr("x", -1 * height / 2)
        .attr("y", -40)
        .style("font-family", "sans-serif")
        .style("font-size", "10px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle")
        .style("transform", "rotate(270deg)");
}

d3.csv("./data/ScatterPlot.csv", d => ({ star: d.Star2, power: +d["Avg_mode_power"] })).then(d => createScatterPlot(d.sort((a, b) => b.power - a.power)));
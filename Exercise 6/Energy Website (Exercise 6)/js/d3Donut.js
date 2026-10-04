const createDonutChart = data => {
    // 1. Set up dimensions 
    const width = 400;
    const height = 200;
    const margin = 40;

    // The radius of the pie chart is half the smallest dimension minus margins
    const radius = Math.min(width, height) / 2 - margin;

    // 2. Create the base SVG canvas
    const svg = d3.select(".responsive-svg-container.donutChart") // Change to your container ID
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        
    // 3. Center the 'g' group container
    // Pie charts are drawn relative to (0,0), so we center the group in the middle of the canvas
    const group = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // 4. Set up a Color Scale
    // Maps each categorical 'tech' item to a distinct visual color
    const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.tech))
        .range(["steelblue", "darkgreen", "orange"]); // Uses a standard D3 built-in 10-color palette

    // 5. Compute the Pie Angles
    // d3.pie extracts your numerical value ('power') and calculates start/end angles
    const pie = d3.pie()
        .value(d => d.power)
        .sort(null); // Keeps the data in its pre-sorted CSV order

    // 6. Define the Arc (The shape generator)
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.5) // This creates the center hole! (e.g., 50% of the outer radius)
        .outerRadius(radius)
        .cornerRadius(5);

    // 7. Render the Donut Slices
    group.selectAll(".slice")
        .data(pie(data)) // Passes our data through the pie angle calculator
        .enter()
        .append("path")
        .attr("class", "slice")
        .attr("d", arcGenerator) // The arc generator turns the angle data into SVG path data
        .attr("fill", d => colorScale(d.data.tech)) // d.data references the original object
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("border-radius", "3px");

    // 8. Add Data Text Labels Inside/Near the Slices
    // We use a secondary arc configuration to compute label placement coordinates
    const labelArc = d3.arc()
        .innerRadius(radius * 0.7) 
        .outerRadius(radius * 0.7);

    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    const labelGroups = group.selectAll(".slice-label-group")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "slice-label-group")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`);

    labelGroups.append("text")
        .attr("class", "slice-label")
        .attr("y", -1)
        .attr("x", d => midAngle(d) < Math.PI ? 5 : -5)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "6px")
        .style("font-weight", "600")
        .style("fill", "#fff")
        .text(d => d.data.tech); 

    labelGroups.append("text")
        .attr("class", "slice-label")
        .attr("y", 6)
        .attr("text-anchor", "middle")
        .attr("x", d => midAngle(d) < Math.PI ? 5 : -5)
        .style("font-family", "sans-serif")
        .style("font-size", "6px")
        .style("font-weight", "600")
        .style("fill", "#fff")
        .text(d => ((d.data.power / data.map(r => r.power).reduce((p,c) => c+p)) * 100).toFixed(2) + "%");

    group.append("text")
        .text("Power Consumption across Screen Tech")
        .attr("y", -1 * height / 2 + 30)
        .style("font-family", "sans-serif")
        .style("font-size", "10px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle") 
}


d3.csv("./data/DonutChart.csv", d => ({ tech: d.Screen_Tech, power: +d["Mean(Avg_mode_power)"] })).then(d => createDonutChart(d.sort((a, b) => b.power - a.power)));
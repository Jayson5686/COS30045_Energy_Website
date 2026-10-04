
const createBarChart = data => {
    // 1. Set up canvas dimensions and margins
    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const heightWithPadding = height - 100;

    const colors = ["steelblue", "darkgreen", "orange"];

    // 2. Append the SVG element inside your container (e.g., #chart)
    // and create a grouped element 'g' shifted by the margins
    const svg = d3.select(".responsive-svg-container.barChart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    const group = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 3. Set up the X Scale (Band scale for categorical 'tech')
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.tech))
        .range([0, width - 100])
        .padding(0.2); // Adds spacing between bars

    // 4. Set up the Y Scale (Linear scale for numerical 'power')
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.round(d.power) + 10)])
        .range([heightWithPadding, 0]); // Inverted range handles the top-to-bottom SVG coordinate math

    // 5. Render the X Axis
    group.append("g")
        .attr("transform", `translate(0, ${heightWithPadding})`)
        .attr("class", "xaxis")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "center");

    // 6. Render the Y Axis
    group.append("g")
        .call(d3.axisLeft(yScale));

    // 7. Render the Bars
    group.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.tech))
        .attr("width", xScale.bandwidth())
        .attr("y", d => yScale(d.power)) // Defines where the top of the bar starts
        .attr("height", d => (heightWithPadding) - yScale(d.power)) // Extends the bar downwards to the baseline
        .style("fill", (d, i) => colors[i]);

    group.selectAll(".bar-value-text") 
        .data(data)                    
        .enter()                       
        .append("text")                
        .attr("class", "bar-value-text") 
        .text(d => d.power.toFixed(2))
        .attr("x", d => xScale(d.tech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.power) - 5)
        .style("text-anchor", "middle") 
        .style("font-family", "sans-serif")
        .style("font-size", "8px") 

    group.append("text")
        .text("Screen Tech vs Power Consumption")
        .attr("x", width / 2 - 50)
        .style("font-family", "sans-serif")
        .style("font-size", "10px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle") 

    group.append("text")
        .text("Screen Tech")
        .attr("x", width / 2 - 50)
        .attr("y", heightWithPadding + 30)
        .style("font-family", "sans-serif")
        .style("font-size", "10px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle") 


    group.append("text")
        .text("Power Consumption")
        .attr("x", -1 * heightWithPadding / 2)
        .attr("y", -30)
        .style("font-family", "sans-serif")
        .style("font-size", "10px") 
        .style("font-weight", 600) 
        .style("text-anchor", "middle")
        .style("transform", "rotate(270deg)")

}

d3.csv("./data/BarChart.csv", d => ({ tech: d.Screen_Tech, power: +d["Mean(Avg_mode_power)"] })).then(d => createBarChart(d.sort((a, b) => b.power - a.power)));
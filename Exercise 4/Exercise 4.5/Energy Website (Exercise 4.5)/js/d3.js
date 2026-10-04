// Exercise 4.3

const svg = d3.select("#e2 .responsive-svg-container").append("svg").attr("viewBox", "0 0 1200 1600").style("border", "1px solid black");
svg.append("rect").attr("x", 10).attr("y", 10).attr("width", 414).attr("height", 16).attr("fill", "blue");


// Exercise 4.4
const logData = (data) => {
    console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));
    console.log(d3.extent(data, d => d.count));

    console.log(data.sort((a, b) => b.count - a.count));

    for (let y of data) {
        d3.select("#e3 .responsive-svg-container").append("p").text(`Brand: ${y.brand} - Count: ${y.count}`);
    }
}

d3.csv("./data/newDataTV.csv", d => ({ brand: d.brand, count: +d.count })).then(logData);


// Exercise 4.5
const createBarChart = data => {
    const svg = d3.select("#e4 .responsive-svg-container").append("svg").attr("viewBox", "0 0 1200 1600").style("border", "1px solid black");
    svg.selectAll("rect").data(data).join("rect")
        .attr("class", d => {
            console.log(d);
            return `bar bar-${d.count}`;
        })
        .attr("width", d => d.count)
        .attr("height", 20)
        .attr("x", 20)
        .attr("y", (d, i) => i*20 + (i + 5)*5);
}

d3.csv("./data/newDataTV.csv", d => ({ brand: d.brand, count: +d.count })).then(d => createBarChart(d.sort((a, b) => b.count - a.count)));
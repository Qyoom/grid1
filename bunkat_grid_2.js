/**
*   grid                  Setup a search space grid: 
*                         Configurable number of rows and columns
*   @param anchorElement  div id tag starting with #
*   @param width          width of the grid in pixels
*   @param height         height of the grid in pixels
*   @param iSquare        true/false if you want the height to 
*                         match the (calculated first) width
*
*                         TODO: Hardwire square cell.
*/
function grid(anchorElement, width, height, numCols, numRows)
{
    var calData = randomData(width, height, numCols, numRows);
    console.log("calData: " + JSON.stringify(calData));

    var marginRight = 40;
    
    var grid = d3.select(anchorElement).append("svg")
                    .attr("width", width + marginRight)
                    .attr("height", height)
                    .attr("class", "grid");

    var row = grid.selectAll(".row")
                  .data(calData)
                .enter().append("svg:g")
                  .attr("class", "row");

    var col = row.selectAll(".cell")
                 .data(function (d) { return d; })
                .enter().append("svg:rect")
                 .attr("class", "cell")
                 .attr("x", function(d) { return d.x; })
                 .attr("y", function(d) { return d.y; })
                 .attr("width", function(d) { return d.width; })
                 .attr("height", function(d) { return d.height; })
                 .on('mouseover', function() {
                    d3.select(this)
                        .style('fill', '#0F0');
                 })
                 .on('mouseout', function() {
                    d3.select(this)
                        .style('fill', '#FFF');
                 })
                 .on('click', function() {
                    console.log(d3.select(this));
                 })
                 .style("fill", '#FFF')
                 .style("stroke", '#555');
}

////////////////////////////////////////////////////////////////////////

/**
*   randomData()        returns an array: [
                                            [{anchorElement:value, ...}],
                                            [{anchorElement:value, ...}],
                                            [...],...,
                                            ];
                        ~ [
                            [hour1, hour2, hour3, ...],
                            [hour1, hour2, hour3, ...]
                          ]

*/
function randomData(gridWidth, gridHeight, numCols, numRows)
{
    var data = new Array();
    var gridItemWidth = gridWidth / numCols;
    var gridItemHeight = gridItemWidth;
    var startX = gridItemWidth / 2;
    var startY = gridItemHeight / 2;
    var stepX = gridItemWidth;
    var stepY = gridItemHeight;
    var xpos = startX;
    var ypos = startY;
    var newValue = 0;
    var count = 0;

    for (var index_a = 0; index_a < numRows; index_a++)
    {
        data.push(new Array());
        for (var index_b = 0; index_b < numCols; index_b++)
        {
            newValue = Math.round(Math.random() * (100 - 1) + 1);
            data[index_a].push({
              time: index_b, 
              value: newValue,
              width: gridItemWidth,
              height: gridItemHeight,
              x: xpos,
              y: ypos,
              count: count
            });
            xpos += stepX;
            count += 1;
        }
        xpos = startX;
        ypos += stepY;
    }
    return data;
}




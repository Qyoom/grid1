/**
*   grid                  Setup a search space grid: 
*                         Configurable number of rows and columns
*   @param anchorElement  div id tag starting with #
*   @param numRows        Number of rows in grid
*   @param numCols        Number of columns in grid
*   @param cellSize       Size of cell in pixels
*/
function grid(anchorElement, numCols, numRows, cellSize)
{
    var marginHoriz = 40;
    var marginVert = 40;
    var width = numCols * cellSize;
    var height = numRows * cellSize;

    var calData = randomData(width, height, numCols, numRows);
    console.log("calData: " + JSON.stringify(calData));
    
    var grid = d3.select(anchorElement).append("svg")
                    .attr("width", width + marginHoriz)
                    .attr("height", height + marginVert)
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
 *   randomData()        returns an array: []
 *
 */
function randomData(gridWidth, gridHeight, numCols, numRows)
{
    var data = new Array();
    var cellWidth = gridWidth / numCols;
    var cellHeight = cellWidth;
    var startX = cellWidth / 2;
    var startY = cellHeight / 2;
    var stepX = cellWidth;
    var stepY = cellHeight;
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
              width: cellWidth,
              height: cellHeight,
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

// Starts here
grid('#grid', 40, 20, 25);




/**
*   grid                  Setup a search space grid: 
*                         Configurable number of rows and columns
*   @param anchorElement  div id tag starting with #
*   @param numRows        Number of rows in grid
*   @param numCols        Number of columns in grid
*   @param cellSize       Size of cell in pixels
*/
function grid()
{
    var marginHoriz = 40;
    var marginVert = 40;
    var width = numCols * cellSize;
    var height = numRows * cellSize;

    var gridData = cellData();
    //console.log("gridData: " + JSON.stringify(gridData));
    console.log("gridData num rows: " + gridData.length);
    console.log("gridData num cols: " + gridData[1].length);
    
    var grid = d3.select(anchorElement).append("svg")
        .attr("width", width + marginHoriz)
        .attr("height", height + marginVert)
        .attr("class", "grid");

    var row = grid.selectAll(".row")
        .data(gridData)
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

/**
 *   cellData()        returns an two dimensional array of rows and columns
 *
 */
function cellData()
{
    var data = new Array();

    var startX = cellSize / 2;
    var startY = cellSize / 2;
    var stepX = cellSize;
    var stepY = cellSize;
    var xPos = startX;
    var yPos = startY;
    var newValue = 0;
    var count = 0;

    // Row iterator
    for (var index_a = 0; index_a < numRows; index_a++)
    {
        // Row array
        data.push(new Array());

        // Column iterator
        for (var index_b = 0; index_b < numCols; index_b++)
        {
            // TODO: What is the use of value? Make it uniform? Put it to some good use?
            newValue = Math.round(Math.random() * (100 - 1) + 1);

            // Columnar cell data
            data[index_a].push({
              id: index_b, 
              value: newValue,
              width: cellSize,
              height: cellSize,
              x: xPos,
              y: yPos,
              count: count // TODO: Same as id
            });

            xPos += stepX;
            count += 1;
        }
        xPos = startX;
        yPos += stepY;
    }
    return data;
}

// Including diagonals
// Assuming svg origin [0,0] as upper left.
var directions = [
    [0, 1],   // south
    [1, 1],   // south-east
    [1, 0],   // east
    [1, -1],  // north-east
    [-1, 0],  // north
    [-1, -1], // north-west
    [0, -1],  // west
    [-1, 1]   // south-west
];

function neighbors(cell) {
    //console.log("node: " + JSON.stringify(node));

    var result = [];

    _.each(directions, function(dir) {
        var neighbor = [
            cell.x + dir[0], // x
            cell.y + dir[1]  // y
        ];

        if(nodesContains(neighbor)) {
            //console.log("neighbor: " + JSON.stringify(neighbor));
            result.push(neighbor);
        }
    });

    return result;
}

function nodesContains(neighbor) {
    result = true;
    // test on range
    if(
        neighbor[0] < 0 || numCols <= neighbor[0] ||
        neighbor[1] < 0 || numRows <= neighbor[1]
    ) result = false;

    //if(!result) console.log("nodesContains " + neighbor + " " + result);
    return result;
}

var anchorElement = '#grid';
var numCols = 10;
var numRows = 5;
var cellSize = 25;

// Starts here
grid();




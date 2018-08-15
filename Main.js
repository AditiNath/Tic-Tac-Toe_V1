var win = false;
var player; //set to true if current player is human, else false for machine
var humanMarker;
var machineMarker;
var move_count = 0;

$(function() {

  $("#playModal").modal({
    backdrop: "static",
    keyboard: false
  });

  //Depending on marker selected, humanMarker and machineMarker are set to the appropriate symbol
  $("body").on("click", ".btn-marker-select", function() {
    var marker = $(this).data("marker");
    humanMarker = marker === "O" ? "O" : "X";
    machineMarker = marker === "O" ? "X" : "O";
    console.log(humanMarker);
    console.log(machineMarker);
    player = humanMarker === "X" ? true : false;
    if (marker === 'O') {
      setTimeout(function() {
        player = false;
        machineMove();
      }, 100);
    }
  });

  //Calls setMarker function on clicking a cell
  $(".square").on("click", function() {
    if (!win && this.innerHTML === "") {
      if (player) {
        setMarker(this, humanMarker);
      } else {
        setMarker(this, machineMarker);
      }
    }
  })

  //Restart game on clicking the restart button
  $("#restartGame").on("click", restartGame);

});


/***  FUNCTIONS ***/

//Sets marker on clicked cell depending on the player's turn
function setMarker(element, marker) {
  $("#" + element.id).addClass(marker);
  let row = element.id[4];
  let col = element.id[5];
  player === true ? $("#playerTurn").text(machineMarker) : $("#playerTurn").text(humanMarker);
  let svg = d3.select("#" + element.id)
    .append("svg")
    .attr("viewBox", "0 0 100% 100%")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content", true);

  let svg_width = $(".svg-content").width();
  let svg_height = $(".svg-content").height();
  //Append svg circle or path (X) and transition them for animation purposes. Get the width and height to scale them accordingly.
  if (marker === "O") {
    let circle_r = svg_height / 2 - 15;
    let circle = svg.append("circle")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", 0)
      .attr("class", "elem" + row + "" + col)
      .style("fill", "none")
      .style("stroke", "#FFEEDB")
      .style("stroke-width", 8)
      .transition()
      .duration(500)
      .attr("r", circle_r);
  } else {
    let x1 = svg_width - 25;
    let y1 = svg_height - 20;
    let l1 = `M 20 15 L ${x1} ${y1}`;
    let l2 = `M ${x1} 15 L ${x1} 15`;
    let l3 = `M ${x1} 15 L 20 ${y1}`

    let line1 = svg.append("path")
      .attr("d", "M 20 15 L 20 15")
      .attr("stroke-width", 8)
      .attr("stroke", "#FFEEDB")
      .attr("stroke-linecap", "square")
      .attr("fill", "none")
      .transition()
      .duration(500)
      .attr("d", l1);


    var line2 = svg.append("path")
      .attr("d", l2)
      .attr("stroke-width", 8)
      .attr("stroke", "#FFEEDB")
      .attr("stroke-linecap", "square")
      .attr("fill", "none")
      .transition()
      .duration(500)
      .attr("d", l3);
  }

  //Check the winner by calling checkWin function. If there is a winner, display winModal
  if (checkWin(element, marker)) {
    setTimeout(() => {
      let score = $("#" + marker + "Wins").text();
      $("#" + marker + "Wins").html(+score + 1);
      $("#playerTurn").html("");
      let modal = $("#winModal");
      modal.find('.modal-body p').text(marker + " Wins!");
      $("#winModal").modal('show');
    }, 500);
  }

  //Negate the player in order for the opponent to play
  player = !player;
  //Increment counter for number of moves made till now. (There should be 9 clicks totally)
  move_count++;
  if (!player && move_count < 9) {
    machineMove();
  }
  //If move_count is 9, all cells have been clicked. If there are no winners, its a draw and winModal is set to draw.
  if (move_count === 9) {
    $("#playerTurn").html("");
    setTimeout(() => {
      if (win === false) {
        let modal = $("#winModal");
        modal.find('.modal-body p').text("It's a draw!");
        $("#winModal").modal('show');
      }
    }, 1500);
  }
}

//TODO: Implement Min Max and two player component

//Simple function which generates a random cell number to click as the machine's move
function machineMove() {
  let check = true;
  while (check) {
    let row = Math.floor(Math.random() * 3) + 1;
    let col = Math.floor(Math.random() * 3) + 1;
    if ($("#cell" + row + "" + col).find("svg").length) {
      continue;
    } else {
      setTimeout(() => {
        $("#cell" + row + "" + col).click();
      }, 500);
      check = false;
    }
  }
}

//Check winner by checking the row and column along the cell clicked. If no winners, then check the diagonals.
function checkWin(element, marker) {
  let row = element.id[4];
  let col = element.id[5];

  //Check row in which the cell was clicked
  for (let i = 1; i < 4; i++) {
    if (!$("#cell" + row + "" + i).hasClass(marker)) break;
    win = (i === 3) ? true : false;
  }
  if (win === true) {
    setTimeout(() => {
      for (let i = 1; i < 4; i++) {
        $("#cell" + row + i).addClass("winner"); //Highlight the winning row or column or diagonal by adding the winner class
      }
    }, 500);
    return true;
  }

  //Check column in which the cell was clicked
  for (let i = 1; i < 4; i++) {
    if (!$("#cell" + i + "" + col).hasClass(marker)) break;
    win = (i === 3) ? true : false;
  }
  if (win === true) {
    setTimeout(() => {
      for (let i = 1; i < 4; i++) {
        $("#cell" + i + col).addClass("winner");
      }
    }, 500)
    return true;
  }

  //Check the first diagonal from left to right (Diagonals are checked regardless of the fact the cell is central or not)
  for (let i = 1; i < 4; i++) {
    if (!$("#cell" + i + "" + i).hasClass(marker)) break;
    win = (i === 3) ? true : false;
  }
  if (win === true) {
    setTimeout(() => {
      for (let i = 1; i < 4; i++) {
        $("#cell" + i + i).addClass("winner");
      }
    }, 500)
    return true;
  }

  //Check the second diagonal from right to left
  if ($("#cell13").hasClass(marker)) {
    if ($("#cell22").hasClass(marker)) {
      if ($("#cell31").hasClass(marker)) {
        win = true;
      }
    }
  }
  if (win === true) {
    setTimeout(() => {
      $("#cell13").addClass("winner");
      $("#cell22").addClass("winner");
      $("#cell31").addClass("winner");
    }, 500)
    return true;
  }
  return false;
}

//Remove the svg elements and marker/highlight classes from all the cells. Set move_count to 0. Depending on player turn, call machineMove function
function restartGame() {
  d3.selectAll('.square svg').remove();
  win = false;
  $(".winner").removeClass("winner");
  $(".X").removeClass("X");
  $(".O").removeClass("O");
  $("#playerTurn").html("X");
  let modal = $("#winModal");
  modal.find('.modal-body p').text("");
  move_count = 0;
  if (machineMarker === "X") {
    player = false;
    machineMove();
  } else player = true;
}

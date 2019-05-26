var socket = io()
var side = 30;
function setup() {
    createCanvas(50 * side, 50 * side)
    background('#acacac');
}
//let grassCount = document.getElementById('grassCount');
//let grasseaterCount = document.getElementById('grasseaterCount');
var weather = document.getElementById("weather")
socket.on("data", Draw);

function Draw(data) {
    matrix = data.matrix;
    weather = data.weather;

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                if (weather == "Գարուն") {
                    fill(0, 255, 0);
                }
                else if (weather == "Ամառ") {
                    fill(53, 241, 53)
                }
                else if (weather == "Աշուն") {
                    fill(0, 75, 0)
                }
                else if (weather == "Ձմեռ") {
                    fill("white")
                }
            }
            else if (matrix[i][j] == 0) {
                fill("#acacac");
            }
            else if (matrix[i][j] == 3) {
                if (weather== "Գարուն") {
                    fill(247, 255, 0);
                }
                else if (weather == "Ամառ") {
                    fill(195, 201, 36)
                }
                else if (weather == "Աշուն") {
                    fill(182, 157, 59)
                }
                else if (weather == "Ձմեռ") {
                    fill(241, 225, 96)
                }
            }
            else if (matrix[i][j] == 2) {
                if (weather == "Գարուն") {
                    fill(255, 170, 0);
                }
                else if (weather == "Ամառ") {
                    fill(243, 180, 43)
                }
                else if (weather == "Աշուն") {
                    fill(150, 107, 14)
                }
                else if (weather == "Ձմեռ") {
                    fill(250, 209, 123)
                }
            }
            else if (matrix[i][j] == 4) {
                if (weather == "Գարուն") {
                    fill(255, 0, 201);
                }
                else if (weather == "Ամառ") {
                    fill(243, 68, 204)
                }
                else if (weather == "Աշուն") {
                    fill(151, 33, 126)
                }
                else if (weather == "Ձմեռ") {
                    fill(243, 133, 219)
                }

            }
            else if (matrix[i][j] == 5) {
                
                if (weather == "Գարուն") {
                    fill(139, 0, 255);
                }
                else if (weather == "Ամառ") {
                    fill(157, 56, 241)
                }
                else if (weather == "Աշուն") {
                    fill(66, 25, 100)
                }
                else if (weather == "Ձմեռ") {
                    fill(194, 141, 238)
                }
            }
            else if (matrix[i][j] == 6) {
                
                if (weather == "Գարուն") {
                    fill(255, 0, 0);
                }
                else if (weather == "Ամառ") {
                    fill(245, 65, 65)
                }
                else if (weather == "Աշուն") {
                    fill(134, 24, 24)
                }
                else if (weather == "Ձմեռ") {
                    fill(242, 111, 111)
                }
            }
            rect(i * side, j * side, side, side);
        }
    }
  
}



function kill() {
    socket.emit("spani")
}
function pushgrasses() {
    socket.emit('pushgrasses')
}
function pushgrasseaters() {
    socket.emit('pushgrasseaters')
}
function changecolour() {
    socket.emit('changecolour')
}

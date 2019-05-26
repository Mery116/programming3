grassArr = []; //խոտերի զանգվածը
grasseaterArr = []; //խոտակերների զանգվածը
gishatichArr = []; //գիշատիչի զանգվածը
strangeArr = [];//տարօրինակների զանգվածը
guynikArr = [];
explodesArr = [];
matrix = []; // Մատրիցի ստեղծում
rows = 100; // Տողերի քանակ
columns = 100; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
for (let x = 0; x < columns; x++) {
let a = Math.floor(Math.random()*100);
if (a >= 0 && a < 20) {
matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
} 
if (a >= 20 && a < 40) {
matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
} 
else if (a >= 40 && a < 50) {
matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
} 
else if (a >= 50 && a < 70) {
matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
} 
else if(a >= 70 && a < 90) {
matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
} 
else if(a >= 90 && a < 100) {
matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
} 
}
}

let random = require('./modules/random');


var Grass = require("./modules/class.Grass.js");
var Grasseater = require("./modules/class.Grasseater.js");
var Gishatich = require("./modules/class.Gishatich.js");
var Guynik = require("./modules/class.Guynik.js");
var Strange = require("./modules/class.Strange.js");
var Explodes = require("./modules/class.Explodes.js");


var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(5000);

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grasseater = new Grasseater(x, y);
                grasseaterArr.push(grasseater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y)
                gishatichArr.push(gishatich)
            }

            else if (matrix[y][x] == 4) {
                var strange = new Strange(x, y)
                strangeArr.push(strange)
            }


            else if (matrix[y][x] == 5) {
                var guynik = new Guynik(x, y)
                guynikArr.push(guynik)
            }
            else if (matrix[y][x] == 6) {
                var explodes = new Explodes(x, y)
                explodesArr.push(explodes)
            }
        }
    }


}

creatingObjects()
weather = ["Գարուն", "Ամառ", "Աշուն", "Ձմեռ"];
let takt = 0;
let sendData = {
    matrix: matrix,
    weather: "Ձմեռ"
}
function game() {
    takt++
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul(); 
        }
    }
    if (grasseaterArr[0] !== undefined) {
        for (var i in grasseaterArr) {
            grasseaterArr[i].eat()
        }
    }

    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            gishatichArr[i].eat();
        }
    }

    if (strangeArr[0] !== undefined) {
        for (var i in strangeArr) {
            strangeArr[i].eat();
        }
    }

    if (guynikArr[0] !== undefined) {
        for (var i in guynikArr) {
            guynikArr[i].eat();
        }
    }
    if (explodesArr[0] !== undefined) {
        for (var i in explodesArr) {
            explodesArr[i].eat();
        }
    }
    if (takt <= 6) {
        weather == "Գարուն"
    }
    else if (takt <= 12) {
        weather == "Ամառ"
    }
    else if (takt <= 18) {
        weather == "Աշուն"
    }
    else if (takt <= 24) {
        weather == "Ձմեռ"
      
    }   else  {
        takt = 0;
      
    }
    io.sockets.emit("data", sendData);
}


function matriximah() {
    grassArr = []
    grasseaterArr = []
    gishatichArr = []
    strangeArr = []
    guynikArr = []
    explodesArr = []
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[0].length; y++) {
            if (y == x) {
                matrix[y][x] = 5;
            }
            else {
                matrix[y][x] = 0;
            }
        }

    }
}

function changeexplodes() {
    explodesArr = []
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[0].length; y++) {
            if (matrix[x][y] = 6) {
                matrix[x][y] = 2

            }



        }

    }
}
io.on('connection', function (socket) {
    socket.on('spani', matriximah)

    socket.on('changecolour', changeexplodes)

    socket.on('pushgrasses', function () {
        for (var m = 0; m < 2; m++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] = 0) {
                matrix[y][x] = 1;
                grassArr.push(new Grass(x, y))
            }
        }
    })
    socket.on('pushgrasseateres', function () {
        for (var m = 0; m < 2; m++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] = 0) {
                matrix[y][x] = 2;
                grasseaterArr.push(new Grasseater(x, y))
            }
        }
    })

});
setInterval(game, 1000)

var statistics = {}

setInterval(function () {
    statistics.grassArr = grassArr.length;
    statistics.grasseaterArr = grasseaterArr.length;
    statistics.gishatichArr = gishatichArr.length;
    statistics.strangeArr = strangeArr.length;
    statistics.guynikArr = guynikArr.length;
    statistics.explodesArr = explodesArr.length;

    fs.writeFile("statistics.json", JSON.stringify(statistics))
}, 10)
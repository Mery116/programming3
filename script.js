var side = 25;
var grassArr = []; //խոտերի զանգվածը
var grasseaterArr = []; //խոտակերների զանգվածը
var gishatichArr = []; //գիշատիչի զանգվածը
var strangeArr = [];//տարօրինակների զանգվածը
var guynikArr = [];

let matrix = []; // Մատրիցի ստեղծում
let rows = 20; // Տողերի քանակ
let columns = 30; // Սյուների քանակ

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



function setup() { 
    noStroke();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side); 
    background('#acacac');
    //Կրկնակի ցիկլը լցնում է օբյեկտներով խոտերի և խոտակերների զանգվածները
    //հիմնվելով մատրիցի վրա 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grasseater = new Grasseater(x, y);
                grasseaterArr.push(grasseater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if(matrix[y][x] == 3){
                var gishatich = new Gishatich(x, y)
                gishatichArr.push(gishatich)
            }
            
            else if(matrix[y][x] == 4){
                var strange = new Strange(x, y)
                strangeArr.push(strange)
            }
            
            
            else if(matrix[y][x] == 5){
                var guynik = new Guynik(x, y)
                guynikArr.push(guynik)
            }
            
        }
    }
}

//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function draw() {
    
    //Գծում է աշխարհը, հիմվելով matrix-ի վրա
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }
            else if(matrix[i][j] == 3){
                fill("yellow")
                rect(j * side, i * side, side, side);
            }
            
            else if(matrix[i][j] == 4){
                fill("pink")
                rect(j * side, i * side, side, side);
             }
             
             
             else if(matrix[i][j] == 5){
                fill("purple")
                rect(j * side, i * side, side, side);
             }
            
        }
    }


    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    
    //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ
    for (var i in grasseaterArr) {
        grasseaterArr[i].eat();
    }
    //յուրաքանչյուր գիշատիչ փորձում է ուտել խոտակեր
    for (var i in gishatichArr) {
        gishatichArr[i].eat();
    }
    
    for (var i in strangeArr) {
        strangeArr[i].eat();
        
    }
    
    for (var i in guynikArr) {
        guynikArr[i].eat();
       
    }
    
    
     
}
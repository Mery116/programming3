var LivingCreature = require("./class.LivingCreature");
var random = require("./random.js");

module.exports = class Explodes extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        this.getNewCoordinates();
        return super.chooseCell(ch);
    }
    move() {
        //որոնում  է դատարկ  տարածքներ
        var fundCords = this.chooseCell(0)
        var cord = random(fundCords)
        if (cord) {
            var x = cord[0]
            var y = cord[1]
            //երբ  տեղափոխվում է հաջորդ տարածքը  իր  նախկին  տարածքը  դառնում է դատարկ
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            //իր նախկին կորդինատները դառնում են օբյեկտի  մեջ իր նոր  կորդինատները
            this.x = x;
            this.y = y;
        }
    }
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ()
        var fundCords1 = this.chooseCell(5)
        var fundCords2 = this.chooseCell(4)
        var fundCords3 = this.chooseCell(2)
        let fundcords = fundCords1.concat(fundCords2, fundCords3)
        var cord = random(fundcords)


        if (cord) {
            var x = cord[0]
            var y = cord[1]
            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը, իսկ իր նախկին տեղը դառնոում է դատարկ վանդակ
            let m = matrix[y][x]
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            //իր նախկին կորդինատները դառնում են օբյեկտի  մեջ իր նոր  կորդինատները
            this.x = x;
            this.y = y;
            //բազմացման  գործակիցը ավելանում է
            this.multiply++
            //էներգիան  ավելանում է
            this.energy++

            if (m == 2) {
                for (var i in grasseaterArr) {
                    if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                        grasseaterArr.splice(i, 1);
                    }
                }
            }
            else if (m == 4) {
                for (var i in strangeArr) {
                    if (this.x == strangeArr[i].x && this.y == strangeArr[i].y) {
                        strangeArr.splice(i, 1);
                    }
                }


            }
            else if (m == 5) {
                for (var i in guynikArr) {
                    if (this.x == guynikArr[i].x && this.y == guynikArr[i].y) {
                        guynikArr.splice(i, 1);
                    }
                }


            }

            //եթե պատրաստ է բազմացման,  բազմանում  է
            if (this.multiply >=2) {
                this.mul()
                this.multiply = 0;
            }
        }

        else {
            //մնացած  դեպքում եթե սնունդ  չկա  շարժվում է,  էներգիան  նվազում է  
            this.move();
            this.energy -= 2;
            // եթե այն հասնում է 0-ի մահանում է
            if (this.energy < 0) {
                this.die();
            }
        }


    }
    //mul() Բազմացում
    mul() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;


            var norExplodes = new Explodes(x, y);
            explodesArr.push(norExplodes);


            matrix[y][x] = 1;
            this.multiply = 0;
        }
    }
}





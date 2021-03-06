var LivingCreature = require("./class.LivingCreature");
var random = require("./random.js");

module.exports = class Gishatich extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
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


    //move() շարժվել
    move() {
        
        //որոնում  է դատարկ  տարածքներ
        var fundCords = this.chooseCell(0)
        var cord = random(fundCords)
        if (cord) {
            var x = cord[0]
            var y = cord[1]
            //երբ  տեղափոխվում է հաջորդ տարածքը  իր  նախկին  տարածքը  դառնում է դատարկ
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            //իր նախկին կորդինատները դառնում են օբյեկտի  մեջ իր նոր  կորդինատները
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat() {

        //հետազոտում է շրջակայքը, որոնում է սնունդ(այստեղ խոտակեր)
        var fundCords = this.chooseCell(2)
        var cord = random(fundCords)
        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0]
            var y = cord[1]
            this
            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը, իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            //իր նախկին կորդինատները դառնում են օբյեկտի  մեջ իր նոր  կորդինատները
            this.x = x;
            this.y = y;
            //բազմացման  գործակիցը ավելանում է
            this.multiply++
            //էներգիան  ավելանում է 2-ով
            this.energy += 2
            //իր կերած խոտակերին խոտակերների  զանգվածից ջնջում է 
            for (var i in grasseaterArr) {
                if (x == grasseaterArr[i].x && y == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                }
            }
            //եթե պատրաստ է բազմացման,  բազմանում  է
            if (this.multiply >= 15) {
                this.mul()
                this.multiply = 0;
            }

        }

        else {
            //մնացած  դեպքում եթե սնունդ  չկա  շարժվում է,  էներգիան  նվազում է  2-ով
            this.move();
            this.energy -= 2;
            // եթե  էներգիան  0-ից փոքր է  մահանում է
            if (this.energy < 0) {
                this.die();
            }
        }
    }


    //mul()-բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            //ստեղծում է նոր գիշատիչ և այն  տեղադրում է այն գիշատիչների  զանգվածի մեջ
            var norGishatich = new Gishatich(x, y);
            gishatichArr.push(norGishatich);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 1;

        }
    }
    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր տեղը դառնում է դատարկ
        matrix[this.y][this.x] = 0;

        // ջնջում է ինքն իրեն գիշատիչների զանգվածից
        for (var i in gishatichArr) {
            if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                gishatichArr.splice(i, 1);
                break;
            }
        }

    }
}

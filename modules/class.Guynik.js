var LivingCreature = require("./class.LivingCreature");
var random = require("./random.js");

module.exports = class Guynik extends LivingCreature {
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

            matrix[y][x] = 5
            matrix[this.y][this.x] = 0
            //իր նախկին կորդինատները դառնում են օբյեկտի  մեջ իր նոր  կորդինատները
            this.x = x;
            this.y = y;
        }
    }



    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords1 = this.chooseCell(1)
        var fundCords2 = this.chooseCell(4)
        let fundcords = fundCords1.concat(fundCords2)
        var cord = random(fundcords)

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0]
            var y = cord[1]
            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            let c = matrix[y][x]
            matrix[y][x] = 5
            matrix[this.y][this.x] = 0


            //իր նախկին կորդինատները դառնում են օբյեկտի  մեջ իր նոր  կորդինատները
            this.x = x;
            this.y = y;
            //բազմացման  գործակիցը ավելանում է
            this.multiply++
            //էներգիան  ավելանում է
            this.energy++
            //իր կերած խոտակերին խոտակերների  զանգվածից ջնջում է 
            if (c == 1) {
                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                    }
                }
            }
            else if (c == 4) {
                for (var i in strangeArr) {
                    if (x == strangeArr[i].x && y == strangeArr[i].y) {
                        strangeArr.splice(i, 1);
                    }
                }

            }

            //եթե պատրաստ է բազմացման,  բազմանում  է
            if (this.multiply >= 10) {
                this.mul()
                this.multiply = 0;

            }

        }


        else {
            //մնացած  դեպքում եթե սնունդ  չկա  շարժվում է,  էներգիան  նվազում է  
            this.move();
            this.energy--;
            // եթե այն հասնում է 0-ի մահանում է
            if (this.energy < 0) {
                this.die();
            }

        }


    }


    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        //եթե կա բազմանում է
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            this.multiply++;

            //ստեղծում է նոր տարօրինակ
            //և տեղադրում է այն տարօրինակների  զանգվածի մեջ
            var norGuynik = new Guynik(x, y);
            guynikArr.push(norGuynik);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտ մասին
            matrix[y][x] = 1;


        }
    }

    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        // ջնջում է ինքն իրեն տարօրինակների  զանգվածից
        for (var i in guynikArr) {
            if (this.x == guynikArr[i].x && this.y == guynikArr[i].y) {
                guynikArr.splice(i, 1);
                break;
            }
        }
    }


}

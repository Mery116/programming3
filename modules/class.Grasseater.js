var LivingCreature = require("./class.LivingCreature");
var random = require("./random.js");

module.exports = class GrassEater extends LivingCreature {
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
        //հետազոտում և որոնում է դատարկ տարածքներ
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //երբ  տեղափոխվում է հաջորդ տարածքը  իր  նախկին  տարածքը  դառնում է դատարկ
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //իր նախկին կորդինատները դառնում են օբյեկտի  մեջ իր նոր  կորդինատները
            this.x = x;
            this.y = y;

        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ, այստեղ(խոտակերին)
        var fundCords = this.chooseCell(1);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը, իսկ իր նախկին տեղը դառնում է դատարկ վանդակ
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //իր նախկին կորդինատները դառնում են օբյեկտի  մեջ իր նոր  կորդինատները
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;

            //իր կերած խոտը ջնջում է խոտերի զանգվածից
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply >= 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ,  շարժվում է  և  էնեգիան  նվազում  է
            this.move();
            this.energy--;
            if (this.energy < 0) { //մահանում է, եթե էներգիան 0֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) և տեղադրում է այն խոտակերների զանգվածի մեջ
            var norGrasseater = new Grasseater(x, y);
            grasseaterArr.push(norGrasseater);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 1;

        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        // ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in grasseaterArr) {
            if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                grasseaterArr.splice(i, 1);
                break;
            }
        }
    }

}

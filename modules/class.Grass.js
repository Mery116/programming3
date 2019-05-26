var LivingCreature = require("./class.LivingCreature");
var random = require("./random");

module.exports = class Grass extends LivingCreature {
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
    //mul() Բազմացում
    mul() {
        this.multiply++;
        if (this.multiply >= 3) {
            //Հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            var fundCords = this.chooseCell(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                //Ավելացնում է նոր խոտ խոտերի զանգվածում
                var norGrass = new Grass(x, y);
                grassArr.push(norGrass);

                //Ավելացնում է նոր խոտի մասին գրառում հիմնական matrix-ում 
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}



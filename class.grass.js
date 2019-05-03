//խոտի կլասը
class Grass {
constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 5; //էներգիան
    this.multiply = 0; //բազմացման գործակից

}
                                                                            
//շրջապատում  հնարավոր  քայլերը (matrix-ից)
 newDirections() {
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
                                                                            
//հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին( t արգումենտով)
getDirections(t) {
    this.newDirections();
     var found = [];
    for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[y][x] == t) {
                found.push(this.directions[i]);
            }
        }
    }
    return found;
}
                                                                            
//mul() Բազմացում
mul() {
    this.multiply++;
    if (this.multiply == 3) {
                                                                            
        //Հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
        var fundCords = this.getDirections(0);
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
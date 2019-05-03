//Տարօրինակի  կլասը
class Strange {
                                                                                constructor(x, y) {
                                                                                    this.x = x;
                                                                                    this.y = y;
                                                                                    this.multiply = 0;
                                                                                    this.energy = 30;
                                                                                    this.directions = [];
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
                                                                                //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին(t արգումենտով)
                                                                                 getDirections(t) {
                                                                                this.newDirections();
                                                                                var found = [];
                                                                                for (var i in this.directions) {
                                                                                    var x = this.directions[i][0];
                                                                                    var y = this.directions[i][1];
                                                                                    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && (x!=this.x && y!=this.y)) {
                                                                                        if (matrix[y][x] == t) {
                                                                                            found.push(this.directions[i]);
                                                                                        }
                                                                                    }
                                                                                }
                                                                                return found;
                                                                            }
                                                                            //move() շարժվել
                                                                            move() {
                                                                                //որոնում  է դատարկ  տարածքներ
                                                                                var fundCords= this.getDirections(1)
                                                                                var cord = random(fundCords)
                                                                            
                                                                                if (cord) {
                                                                                    var x = cord[0]
                                                                                    var y = cord[1]
                                                                                //երբ  տեղափոխվում է հաջորդ տարածքը  իր  նախկին  տարածքը  դառնում է դատարկ
                                                                                    matrix[this.y][this.x] = 1 
                                                                            
                                                                            
                                                                                //իր նախկին կորդինատները դառնում են օբյեկտի  մեջ իր նոր  կորդինատները
                                                                                    this.x = x;
                                                                                    this.y = y;
                                                                                    
                                                                                }
                                                                            }
                                                                            
                                                                            eat() {
                                                                                //հետազոտում է շրջակայքը, որոնում է սնունդ()
                                                                                var fundCords1 = this.getDirections(3)
                                                                                var fundCords2 = this.getDirections(2)
                                                                                let fundcords = fundCords1.concat(fundCords2)
                                                                                var cord = random(fundcords)
                                                                                
                                                                                
                                                                                if (cord) {
                                                                                    var x = cord[0]
                                                                                    var y = cord[1]
                                                                                 //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը, իսկ իր նախկին տեղը դառնոում է դատարկ վանդակ
                                                                                    let m = matrix[y][x]
                                                                                    matrix[y][x] = 4
                                                                                    matrix[this.y][this.x] = 0
                                                                                //իր նախկին կորդինատները դառնում են օբյեկտի  մեջ իր նոր  կորդինատները
                                                                                    this.x = x;
                                                                                    this.y = y;
                                                                                //բազմացման  գործակիցը ավելանում է
                                                                                    this.multiply++
                                                                                //էներգիան  ավելանում է
                                                                                    this.energy++
                                                                                
                                                                                 if(m == 2)
                                                                                    {
                                                                                        for (var i in grasseaterArr) {
                                                                                        if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                                                                                            grasseaterArr.splice(i, 1);
                                                                                        }
                                                                                    }
                                                                                }
                                                                                else if(m == 3)
                                                                                    {
                                                                                        for (var i in gishatichArr) {
                                                                                        if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                                                                                            gishatichArr.splice(i, 1);
                                                                                        }
                                                                                    }
                                                                            
                                                                                    
                                                                                }
                                                                                
                                                                                //եթե պատրաստ է բազմացման,  բազմանում  է
                                                                                    if (this.multiply == 2) {
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
                                                                                var fundCords = this.getDirections(0);
                                                                                var cord = random(fundCords);
                                                                                
                                                                                //եթե կա բազմանում է
                                                                                if (cord) {
                                                                                    var x = cord[0];
                                                                                    var y = cord[1];
                                                                                    this.multiply++;
                                                                            
                                                                                    //ստեղծում է նոր տարօրինակ և տեղադրում է այն տարօրինակների  զանգվածի մեջ
                                                                                    var norStrange = new Strange(x, y);
                                                                                    strangeArr.push(norStrange);
                                                                            
                                                                                    //հիմնական matrix-ում կատարում է գրառում նոր խոտ մասին
                                                                                    matrix[y][x] = 1;
                                                                            
                                                                                
                                                                                }
                                                                            }
                                                                            
                                                                            die() {
                                                                                //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
                                                                                    matrix[this.y][this.x] = 0;
                                                                            
                                                                                    // ջնջում է ինքն իրեն տարօրինակների  զանգվածից
                                                                                    for (var i in strangeArr) {
                                                                                        if (this.x == strangeArr[i].x && this.y == strangeArr[i].y) {
                                                                                            strangeArr.splice(i, 1);
                                                                                        }
                                                                                    }
                                                                                }
                                                                                
                                                                            }
                                                                            
                                                                            
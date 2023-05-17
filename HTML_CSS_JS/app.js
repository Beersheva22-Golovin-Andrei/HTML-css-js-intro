const rectangle = new Rectangle(width=5, height=5);
function Rectangle (width, height){
this.width = width;
this.height = height;
//this.square = 
this.perimeter = function(){ return 2*(this.width+this.height)}
}

//console.log(rectangle.square());

Rectangle.prototype.square = function(){ return this.width*this.height;}
console.log(rectangle);
console.log(rectangle.square());


const rectangle2 = {...rectangle};
console.log(rectangle2);

Array.prototype.map = function(){
    console.log('fsfsfsfsdfsdf');
}

Array.prototype.every = function(){
    console.log('every new');
}


const arr=[1,2,3];
arr.map(()=>console.log(1));

arr.every(()=>console.log(2));

class Square extends Rectangle{
    #color;
    constructor (width, color){
        super(width, width);
        this.color=color;
    }  
}

const square = new Square(10);
console.log(square.perimeter());
console.log(square.square());
console.log(square);

Array.prototype.map = function(){
    console.log('fsfsfsfsdfsdf');
}

Array.prototype.reduce = function(){
    console.log('fsfsfsfsdfsdf');
}

Array.prototype.forEach = function(){
    this.map()
}

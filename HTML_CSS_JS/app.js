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
// console.log(square.perimeter());
// console.log(square.square());
// console.log(square);



Array.prototype.myForEach  = function(func){
    for (let i=0; i<this.length; i++){
        func(this[i], i, this);
    }
}

arr.myForEach(n=>console.log(n));

Array.prototype.myMap  = function(func){
    let res=[];
    for (let i=0; i<this.length; i++){
        res[i]=func(this[i], i, this);
    }
    return res;
}

console.log(arr.myMap(n=>n+1));

Array.prototype.myFilter  = function(func){
    let res=[];

    for (let i=0; i<this.length; i++){
        if (func(this[i], i, this)) {
            res.push(this[i]);
        }
    }
    return res;
}
console.log([1,2,3,4,5,6].myFilter(n=>n>4));

Array.prototype.myReduce  = function(func, start){
    let res =start == undefined ? this[0] : start;
    let i =0;
    if (start==undefined) {i=1;}
    for (i; i<this.length; i++){
        res=func(res, this[i], i, this);
    }
    return res;
}
console.log([1,2,3,4,5,6].myReduce((a,b)=>a+b));


// class Deffered {
//     constructor (a){
//         this.a = a;

//     }
// }



// const d = new Deferred();

// d.then(function(res){ 
//     console.log("1 ", res); 
//     return "a"; 
// });

// d.then(function(res){
//      console.log("2 ", res); 
//      return "b"; 
//     });

// d.then(function(res){ console.log("3 ", res); return "c"; });
// d.resolve('hello');




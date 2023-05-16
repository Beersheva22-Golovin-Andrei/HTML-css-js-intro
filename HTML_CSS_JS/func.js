
this.x = 100;

function f1 (){
    return this;
}

const f2 = () =>{
  return this;
}
    
    console.log('f1', f1());
    console.log('f2', f2());
    console.log(()=>{console.log(this);});

    const x = {f1:function(){
        return this;
    },
f2: ()=>{return this;}}
console.log('x.f1',x.f1());
console.log('x.f2',x.f2());
const rectangle = {width: 20, height:20, sqr: function(){
    return this.width*this.height;
}, perimetr: ()=>this.width+this.hight}

console.log('square ='+rectangle.sqr());
console.log('per='+rectangle.perimetr());

const point = {x:3, y:4};

function displPoint(z,t) {
    console.log(this.x, this.y, z, t);
}

//displPoint = displPoint.bind(point, 100, 200);
displPoint(10,20);
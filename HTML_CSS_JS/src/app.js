function sleep (timeout){
return new Promise(resolve => setTimeout(()=>resolve(), timeout));
}
//
function f1(){
    console.log('f1 performed')
}

function f2(){
    console.log('f2 performed')
}

function f3(){
    console.log('f3 performed')
}

const promise = sleep(2000);
//promise.then(()=>f1()).then(()=>f2()).then(()=>f3());

function getId(predicate){
    const idArr = [123,124,125];
    const index = idArr.findIndex(predicate);
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            return index<0 ? reject('id not found') : resolve(idArr[index])
        }, 1000);
    })
}

function getCar(id){
    const cars = {
        123: 'suzuki',
        124: 'hunday'
    }
    const car = cars[id];
    return new Promise((resolve, reject) => setTimeout(()=>car? resolve(car):reject('There is not such car!'), 1000));
}

// function displayCar(predicate){
//     return getId(predicate)
//     .then(id=>getCar(id))
//     .then(car=>console.log(car))
//     .catch(er=>{console.log(er)
//     //return 'merc'
// })
//     //getId(id=>id%2==1).then(id=>getCar(id)).then(car=>console.log(car));
// }

async function displayCar(predicate){
    await sleep(20000);
    try{
    const id = await getId(predicate);
    const car = await getCar(id);
    console.log(car);
    }catch (error) {
        console.log(error)
    }
}
displayCar(id=>id==125).then(()=>console.log('end'));
console.log('waiting..');

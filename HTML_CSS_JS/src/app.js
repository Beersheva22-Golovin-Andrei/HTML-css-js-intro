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
//displayCar(id=>id==125).then(()=>console.log('end'));
//console.log('waiting..');

async function getTemperatures (lat, long, startDate, days, hourFrom, hourTo){
    const start = new Date(startDate);
    let end = start;
    end = new Date(end.setDate(start.getDate()+days));
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&timezone=IST&forecast_days=${days}&start_date=${startDate}&end_date=${end.toISOString().substring(0,10)}`);
    const strResp = await response.json();
    const indexes = [];
    const dateAndTime =[];
    [...strResp.hourly.time].forEach((t, i)=>{
        const dateTime = t.split('T');
        const hour = dateTime[1].split(':')[0];
        if (hour>=hourFrom&&hour<=hourTo) {
            indexes.push(i);
            dateAndTime.push(dateTime);
        }   
    });
    const tempr = strResp.hourly.temperature_2m;
    const apparentTempr = strResp.hourly.apparent_temperature;
    const res=[];
    res.length = indexes.length;
    indexes.forEach((index, i)=>res.push({date: dateAndTime[i][0], time:  dateAndTime[i][1], temperature: tempr[index], apparentTemperature: apparentTempr[index]}));
    return res;
}

getTemperatures(31.89, 34.81, '2023-05-23', 5, 13, 17).then(resp=>console.log(resp)).catch(er=>console.log(er));



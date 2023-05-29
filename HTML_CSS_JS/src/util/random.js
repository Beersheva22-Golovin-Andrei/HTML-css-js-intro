export function getRandomInt(min, max){
    if(min==max){
        max++;
    } else if (min>max){
        [min,max] = [max,min]
    }
    return Math.trunc(min+Math.random()*(max-min)+1);
}

export function getRandomElement(array){
    return array[getRandomInt(0, array.length-1)]
}

export function getRandomEmployee(){
    const names = ['Fedor','Elen','Itshak','Moshe','Dima','Yosi','Dina','Itan','Elan','Doris','Ina','Ben'];
    const departments = ['Automation', 'PA', 'QA', 'SD'];
    return {id: getRandomInt(100000, 1000000), 
        name: getRandomElement(names), 
        birthYear: getRandomInt(1950,2004), 
        gender: getRandomInt(0,2)>1 ? 'f': 'm', 
        salary:getRandomInt(7000,50000), 
        department: getRandomElement(departments)}
}
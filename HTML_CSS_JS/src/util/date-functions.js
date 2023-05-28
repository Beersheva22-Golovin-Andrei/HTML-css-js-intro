export function  getISODateStr(date){
    return date.toISOString().substring(0,10);
}

export function getEndDateStr(beginDate, days){
    const date = new Date(beginDate);
    const endDate = new Date(date.setDate(date.getDate() + days))
    return getISODateStr(endDate);
}
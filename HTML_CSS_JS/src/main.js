import openMeteoConfig from './config/service-config.json' assert {type: 'json'};
import OpenMeteoService from './service/OpenMeteoService.js';
import DataGrid from './ui/DataGrid.js';

const columns = [{field:'date',headerName:'Date'},
{field:'time',headerName:'Time'},
{field:'temperature',headerName:'Temp'},
{field:'apparentTemperature',headerName:'Fealt Temp'}]

//functions
function  getISODateStr(date){
    return date.toISOString().substring(0,10);
}

function getEndDateStr(beginDate, days){
    const date = new Date(beginDate);
    const endDate = new Date(date.setDate(date.getDate() + days))
    return getISODateStr(endDate);
}

const fromFormData = {city: 'Rehovot', beginDate: getISODateStr(new Date()),
                      days: 10, hourFrom: 15, hourTo: 22};


//objects
const openMeteoService = new OpenMeteoService(openMeteoConfig.basedUrl);
const latLong = openMeteoConfig.cities[fromFormData.city];
const table = new DataGrid("table-place", columns);
const {lat,long} = latLong;
const{beginDate,days,hourFrom,hourTo} = fromFormData;
openMeteoService.getTemperatures(lat, long, beginDate, getEndDateStr(beginDate,days),hourFrom,hourTo).then(data =>table.fillData(data));

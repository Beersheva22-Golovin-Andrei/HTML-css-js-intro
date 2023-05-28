import openMeteoConfig from './config/service-config.json' assert {type: 'json'};
import OpenMeteoService from './service/OpenMeteoService.js';
import DataGrid from './ui/DataGrid.js';
import WeatherForm from './ui/WeatherForm.js';
import {getISODateStr, getEndDateStr} from './util/date-functions.js'

const columns = [{field:'date',headerName:'Date'},
{field:'time',headerName:'Time'},
{field:'temperature',headerName:'Temp'},
{field:'apparentTemperature',headerName:'Fealt Temp'}]

//objects
const openMeteoService = new OpenMeteoService(openMeteoConfig.basedUrl);
const weatherForm = new WeatherForm("form-place", Object.keys(openMeteoConfig.cities), openMeteoConfig.maxDays); 
let table = new DataGrid("table-place", columns);
export function setData (data){
    const{beginDate, city, days, hourFrom, hourTo} = data;
    const cityInfo = openMeteoConfig.cities[city];
    const {lat,long} = cityInfo;
    openMeteoService.getTemperatures(lat, long, beginDate, getEndDateStr(beginDate, +days), +hourFrom, +hourTo).then(data =>table.fillData(data));
}





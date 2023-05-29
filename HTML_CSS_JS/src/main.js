import ApplicationBar from "./ui/ApplicationBar.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeService from "./service/EmployeeService.js";
import tablesColumns from './config/tablesColumns.json' assert {type: 'json'};
import StatisticService from "./service/StatisticService.js";

const menu = new ApplicationBar("menu-place", tablesColumns.sections);
const employeeForm = new EmployeeForm("employees-form-place");
const employeeTable = new DataGrid ("employees-table-place", tablesColumns.employeeColumns);
const statisticTable = new DataGrid ("statistics-place", tablesColumns.statisticsColumns);
const employeeService = new EmployeeService();
const statisticService = new StatisticService();

async function run(){
    while(true){
    await employeeForm.buttonHasPressed();
    employeeService.addNewRandomEmployee();
    console.log("button pressed");
    employeeTable.fillData(employeeService.getAllEmployees());
    statisticTable.fillData(statisticService.getStatisticByAge(employeeService.getAllEmployees()));
}
}
run();





import CompanyService from "./service/CompanyService.js";
import ApplicationBar from "./ui/ApplicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import { getRandomEmployee } from "./util/random.js";
import statisticsConfig from "./config/statistics-config.json" assert{type: 'json'}
import employeesConfig from "./config/employees-config.json" assert{type: 'json'}
import { range } from "./util/number-functions.js";
import Spinner from "./ui/Spinner.js";
import EmployeeFormUpdate from "./ui/EmployeeFormUpdate.js";
import CompanyServiceServer from "./service/CompanyServiceServer.js";

const N_EMPLOYEES = 10;
//employee model
//{id: number of 9 digits, name: string, birthYear: number,
// gender: female | male, salary: number, department: QA, Development, Audit, Accounting, Management}
const sections = [
    { title: "Empolyees", id: "employees-table-place" },
    { title: "Add Employee", id: "employees-form-place" },
    { title: "Statistics", id: "statistics-place" }
];


const spinner = new Spinner();
const { minSalary, maxSalary, departments, minYear, maxYear} = employeesConfig;
const {age, salary} = statisticsConfig;
const statisticsIndex = sections.findIndex(s => s.title == "Statistics");
const employeeIndex = sections.findIndex(s => s.title == "Empolyees");

const employeeColumns = [
    {field: 'id', headerName: 'ID'},
    {field: 'name', headerName: 'Name'},
    {field: 'birthYear', headerName: 'Birth Year'},
    {field: 'gender', headerName: 'Gender'},
    {field: 'salary', headerName: 'Salary (ILS)'},
    {field: 'department', headerName: 'Department'}
];
const statisticsColumns = [
    {field: 'min', headerName: "Min value"},
    {field: 'max', headerName: "Max value"},
    {field: 'count', headerName: "Count"}
]

const menu = new ApplicationBar("menu-place", sections, menuHandler );
//const companyService = new CompanyService();
const companyService = new CompanyServiceServer();
const employeeForm = new EmployeeForm("employees-form-place", departments);
const employeeTable = new DataGrid("employees-table-place", employeeColumns);
const ageStatistics = new DataGrid("age-statistics-place", statisticsColumns );
const salaryStatistics = new DataGrid("salary-statistics-place", statisticsColumns );



employeeForm.addHandler(async (employee) => {
    await action(companyService.addEmployee.bind(companyService, employee));
});

// const employeeFormForUpdate = new EmployeeFormUpdate("employees-form-update", departments);

// employeeFormForUpdate.addHandler(async (employee, id) => {
//    const newObj = await action(companyService.updateEmployee.bind(companyService, employee, id));
//    employeeTable.fillData(await companyService.getAllEmployees(), companyService.removeById.bind(companyService), openAndUpdate.bind(companyService));
   
   
//    employeeTable.insertRow({...newObj, id});
   //employeeFormForUpdate.clearForm();
    // .then(newObj => {employeeTable.insertRow({...newObj, id});
    //     return new Promise(resolve=>resolve())})
    //.then(employeeFormForUpdate.clearForm())
//})

async function menuHandler(index){
    switch (index){
        case 0: {
            const employees = await action (companyService.getAllEmployees.bind(companyService));
            employeeTable.fillData(employees, companyService.removeById.bind(companyService), openAndUpdate.bind(companyService));
            break;
        }
        case 1:{
            // const employee = getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments);
            // await action(companyService.addEmployee.bind(companyService, employee));
             break;
        }

        case statisticsIndex:{
            const ageStatisticsData = await action(companyService.getStatistics.bind(companyService, age.field, age.interval));
            ageStatistics.fillData(ageStatisticsData);
            const salaryStatisticsData = await action(companyService.getStatistics.bind(companyService, salary.field, salary.interval));
            salaryStatistics.fillData(salaryStatisticsData);
            break; 
        }
    }
}

async function createRandomEmplyees(){
    const promises = range(0,N_EMPLOYEES).map(()=>
    companyService.addEmployee(getRandomEmployee(minSalary, maxSalary, minYear,
        maxYear, departments)));
        spinner.stop();
       return Promise.all(promises);
}

async function action(serviceFn){
    spinner.start();
    const res = await serviceFn();
    spinner.stop();
    return res;
}

//action(createRandomEmplyees);
    
// function openAndUpdate (id){
//     const obj = companyService.getById(id);
//     employeeFormForUpdate.updateFormInit(obj, id);
// }


function openAndUpdate (id){
    const obj = companyService.getById(id);
    const newObj = {...obj, id};
    const employeeFormForUpdate = new EmployeeForm("employees-form-update", departments, newObj, id);
    employeeFormForUpdate.addHandler(async (employee, id) => {
    const newObj = await action(companyService.updateEmployee.bind(companyService, employee, id));
    employeeTable.fillData(await companyService.getAllEmployees(), companyService.removeById.bind(companyService), openAndUpdate.bind(companyService));
    employeeFormForUpdate.clearForm();
});
}


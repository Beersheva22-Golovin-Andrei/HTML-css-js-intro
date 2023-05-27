export default class DataGrid {

    #tBodyElement;
    #keys;

    constructor (parentId, columns){
        //columns - array of objects {field: <name of key>, headerName: <column name>}
        this.#keys=columns.map(c=>c.field);
        this.#fillHeader(parentId, columns.map(c=>c.headerName));
    }

    fillData(rowData){
       this.#tBodyElement.innerHTML = rowData.map(element => `<tr>
            <td>${element.date}</td>
            <td>${element.time}</td>
            <td>${element.temperature}</td>
            <td>${element.apparentTemperature}</td>
        </tr>`).join(''); 
    }
    

    #fillHeader(parentId,columnNames){
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML = 
        `<table>
            <thead>
                <tr>
                    ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
                </tr>
            </thead>
            <tbody id="${parentId}-table">
            </tbody>
        </table>`
        this.#tBodyElement = document.getElementById(parentId + "-table");
    }
}
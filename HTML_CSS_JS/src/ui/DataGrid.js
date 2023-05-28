export default class DataGrid {

    #tBodyElement;
    #keys;

    constructor (parentId, columns){
        //columns - array of objects {field: <name of key>, headerName: <column name>}
        this.#keys=columns.map(c=>c.field);
        this.#fillHeader(parentId, columns.map(c=>c.headerName));
    }
       
    fillData(rowData){
        this.#tBodyElement.innerHTML = rowData.map(element => 
            `<tr>
                ${this.#keys.map(key => `<td>${element[key]}</td>`).join('')}
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
export default class DataGrid {
    #tBodyElement
    #keys
    constructor(parentId, columns) {
        //columns - array of objects {field: <name of key>,
        // headerName: <column name>}
        this.#keys = columns.map(c => c.field);
        this.#buildTableHeader(parentId, columns.map(c => c.headerName))

    }
     fillData(rowsData, deleteFunc, updateFunc) {
        this.#tBodyElement.innerHTML = rowsData.map(rd => this.#getRow(rd)).join('');
        const deleteButtons = document.querySelectorAll(".remove-button");
        const updateButtons = document.querySelectorAll(".update-button");
        deleteButtons.forEach(b=>b.addEventListener("click", async function () {
            const row= this.closest('tr');
            const elId = row.querySelector(".rowId").value
            if (confirm(`you are going to delete employee with id = ${elId}`)){
            row.parentElement.removeChild(row);  
            await deleteFunc(elId);
        }
        }))
        updateButtons.forEach(b=>b.addEventListener("click", async function(){
            const row= this.closest('tr');
            const elId = row.querySelector(".rowId").value
            //row.parentElement.removeChild(row);
            await updateFunc(elId);

        }))
    }

    #getRow(obj) {
        const buttons = obj.name ? `<td><button class="remove-button">remove</button></td>
        <td><button class="update-button">update</button></td>
        <input type="hidden" name="rowId" class="rowId" value="${obj.id}"/>` : "";
        return `<tr>
                   ${this.#keys.map(key => `<td>${obj[key]}</td>` ).join('')}
                   ${buttons}
                 </tr>`
    }

    insertRow(obj) {
        this.#tBodyElement.innerHTML += this.#getRow(obj)
    }

    #buildTableHeader(parentId, columnNames) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML =
            `<table>
            <thead>
               <tr>
                   ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
               </tr>
            </thead>
            <tbody id="${parentId}-table" >
            </tbody>
          </table>`
        this.#tBodyElement = document.getElementById(parentId + "-table")
    }
        clearTable(){
            this.#tBodyElement.innerHTML = '';
        }
}
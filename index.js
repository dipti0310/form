document.addEventListener('DOMContentLoaded',function(){
    fetch('http://localhost:3000/getAll')
    .then(response=>response.json())
    .then(data=>loadHTMLTable(data['data']));
    console.log("OOPPPEPENNNDSF")
    console.log(data);
    
});

const addData=()=>{
console.log("HIIII");
// fetch('http://localhost:3000/getAll')
// .then(response=>response.json())
// .then(data=>loadHTMLTable(data['data']));
const lnameInput = document.querySelector('#lname');
    const lname = lnameInput.value;
    const fnameInput = document.querySelector('#fname');
    const fname = fnameInput.value;
    const addressInput = document.querySelector('#address');
    const address = addressInput.value;
    const cityInput = document.querySelector('#city');
    const city = cityInput.value;
    const parentInput = document.querySelector('#parent_name');
    const parent = parentInput.value;
//     console.log(lname);
    const phoneInput = document.querySelector('#phone');
    const phone = phoneInput.value;
    const dobInput = document.querySelector('#dob');
    const dob = dobInput.value;
    lnameInput.value = "";
    fnameInput.value = "";
    addressInput.value = "";
    cityInput.value = "";
    parentInput.value = "";
    phoneInput.value = "";
    dobInput.value = "";
    // console.log(lname);
    // if(lname!=null&&fname!=null&&city!=null&&dob!=null&&address!=null&&phone!=null&&Parent_name!=null){
    fetch('http://localhost:3000/insert', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ FName : fname,
                    LName:lname,
                    Dob:dob,
                    Parent_name:parent,
                    Address:address,
                    city:city,
                    phone:phone
                })
            })
            .then(response => response.json())
            .then(data => insertRowIntoTable(data['data']));
        // }
}

function insertRowIntoTable(data) {
    console.log("ROW-------------------------"+data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'Dob') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }
    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}


function loadHTMLTable(data){
    console.log("LOAD--------------------------------"+data);
    const table=document.querySelector('table tbody');
    if(data.length===0){
        table.innerHTML="<tr><td class='no-data' colspan='5'>No Data</tr></td>";

    }
    
    let tableHtml = "";

    data.forEach(function ({RollNo,FName,LName,Dob,Parent_name,Address,city,phone}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${RollNo}</td>`;
        tableHtml += `<td>${FName}</td>`;
        tableHtml += `<td>${LName}</td>`;
        tableHtml += `<td>${Address}</td>`;
        tableHtml += `<td>${city}</td>`;
        tableHtml += `<td>${Parent_name}</td>`;
        tableHtml += `<td>${phone}</td>`;
        tableHtml += `<td>${new Date(Dob).toLocaleDateString()}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
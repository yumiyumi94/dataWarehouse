/*//buscador
document.getElementById("search").addEventListener("keyup", getContacts)
function getContacts(){
    const inputC = document.getElementById("search").value
    const list = document.getElementsByClassName("autocomplete")

    const url = "./routes/contacs.js"
    const formData = new FormData()
    formData.append("search", inputC)

    fetch(url, {
        method: "POST",
        body: formData,
        mode: "cors"
    }).then(res => res.json())
    .then(data => {
        list.style.display = 'block'
        list.innerHTML = data
    }).catch(err => console.log(err))
}*/
console.log('hola');
const fetchContacts = await fetch('http://localhost:3000/contacts', {
    method:"GET"
});
const dataContacts = await fetchContacts.json();
const tableContacts = document.querySelector(".dataContacts");
const contactsData = Object.values(dataContacts)
console.log(contactsData.length);

function createTableContacts(){
    contactsData.forEach(data =>{
        console.log(data[1]);
        tableContacts.innerHTML +=`
            <td>${data[1].name}</td>
            <td>${data[1].last_name}</td>
            <td>${data[1].company}</td>
        `;
    })
    }
    /*contactsData.forEach(contact => {
        for (const data of contact){
            tableContacts.innerHTML +=`
            <td>${data.name}</td>
            <td>${data.last_name}</td>
            <td>${data.company}</td>
        `;
        }
    });*/
        /*{
        tableContacts.innerHTML +=`
            <td>${data.name}</td>
            <td>${data.last_name}</td>
            <td>${data.company}</td>
        `;
    })*/


createTableContacts();

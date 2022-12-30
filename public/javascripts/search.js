//buscador
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
}

export default {}
let filledStar = `<i class="fa fa-star checked" style="color: rgb(218, 165, 32)"></i>`
let emptyStar = `<i class="fa fa-star" style="color: #000000;"></i>`;
let contenedor = document.getElementById("lista");
let buscador = document.getElementById("btnBuscar");
let inputBuscador = document.getElementById("inputBuscar");
let arreglo = [];
let arrayGeneros = [];

function addData(info) {
    let htmlContentToAppend = "";


    for (const peli of info) {
        let starsHtml = "";
        for (let i = 1; i <= Math.round(peli.vote_average / 2); i++) {
            if (Math.round(peli.vote_average / 2) >= i) {
                starsHtml += filledStar;
            } else {
                starsHtml += emptyStar;
            }
        }

        htmlContentToAppend += `
        <li onclick="offCanvas(${peli.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"">
    <div class="list-group-item list-group-item-action cursor-active dark-mode" >
    <div class="row">
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1"> ${peli.title}</h4>
                <small class="text-muted">${starsHtml}</small>
            </div>
            <br>
            <p>${peli.tagline}</p>
            </div>
            </div>
 </div>
 
</div></li>
<div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
 </div>
 
 `
        contenedor.innerHTML = htmlContentToAppend;
    }
}
function offCanvas(id) {
    let htmlContentToAppend = "";
    let offCanvas = document.getElementById("offcanvasTop");
    for (let i of arreglo) {
        if (id == i.id) {
            htmlContentToAppend = `
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasTopLabel">${i.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
            <p>${i.overview}</p>
            <hr>
            <div class="row">
            <p class="col">${generosDes(i.genres)}</p>
            <div class="dropdown col position-absolute">
  <button class="btn btn-secondary dropdown-toggle position-absolute top-0 end-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown
  </button>
  <ul class="dropdown-menu">
    <li><button class="dropdown-item" type="button">Year: ${i.release_date}</button></li>
    <li><button class="dropdown-item" type="button">Runtime: ${i.runtime} mins.</button></li>
    <li><button class="dropdown-item" type="button">Budget: $${i.budget}</button></li>
    <li><button class="dropdown-item" type="button">Revenue: $${i.revenue}</button></li>
  </ul>
</div>
            
</div>
            </div>

            `
        }
    }

    offCanvas.innerHTML = htmlContentToAppend;

}

function generos(item) {

    for (let genero of item) {
        arrayGeneros += genero.name;

    }
    return arrayGeneros;
}


function generosDes(item) {
    let htmlContentToAppend = "";
    for (let genero of item) {
        htmlContentToAppend += `<span>${genero.name} - </span>`;
    }
    return htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", function () {
    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then(response => response.json())
        .then(data => {

            arreglo = data;
        })
})

buscador.addEventListener('click', function () {
    let arregloFiltrado = arreglo.filter(producto => producto.title.toLowerCase().includes(inputBuscador.value.toLowerCase()) || producto.overview.toLowerCase().includes(inputBuscador.value.toLowerCase()) || producto.tagline.toLowerCase().includes(inputBuscador.value.toLowerCase()) || generos(producto.genres).toLowerCase().includes(inputBuscador.value.toLowerCase()));
    addData(arregloFiltrado);
})
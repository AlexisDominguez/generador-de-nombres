const formulario = document.querySelector("#generar-nombre");
formulario.addEventListener("submit", obtenerUrl);

function obtenerUrl(e){
   e.preventDefault();

   const origen = document.querySelector("#origen");
   const origenSeleccionado = origen.options[origen.selectedIndex].value;

   const genero = document.querySelector("#genero");
   const generoSeleccionado = genero.options[genero.selectedIndex].value;

   const cantidadNombres = document.querySelector("#numero").value;

   let url = "https://uinames.com/api/?";

   if(origenSeleccionado !== ""){
      url += `region=${origenSeleccionado}&`;
   }

   if(generoSeleccionado !== ""){
      url += `gender=${generoSeleccionado}&`;
   }

   if(cantidadNombres !== ""){
      url += `amount=${cantidadNombres}&`;
   }

   generarNombres(url);
}

function generarNombres(url){
   const xhr = new XMLHttpRequest();

   xhr.open("GET", url, true);

   xhr.onload = function(){
      if(this.status === 200){
         const div = document.querySelector("#resultado");
         div.classList.add("lista");
         div.innerHTML = `<h3> Nombres generados </h3>`;

         const nombres = JSON.parse(this.responseText);

         for(let i = 0, n = nombres.length; i<n; i++){
            const li = document.createElement("li");

            li.innerHTML = `
               ${nombres[i].name}
            `

            div.appendChild(li);
         }
      }
   }

   xhr.send();
}
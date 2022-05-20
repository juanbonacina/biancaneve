
let reseña = document.getElementById ("reseñas")

const mostrarReseña = async ()=> {
    const resp = await fetch('./reseñas.json')
    const datos =  await resp.json()

   datos.forEach((post) =>{
        const reseñas = document.createElement ("div")
        reseñas.innerHTML = `
                            <div id="divRese${post.id}" class="divRese">
                                <button id="EliminarRese${post.id}" type="button">X</button>
                                <div id ="div__reseña" class="reseAgregada">
                                    <h3>${post.first_name}</h3>
                                    <p>${post.id}</p>
                                    <p>${post.text}</p>     
                                </div>
                            </div>
                        `
          
        masReseña.append(reseñas)
        
       let contenedorRese = document.getElementById(`divRese${post.id}`)
        let elimReseña = document.getElementById(`EliminarRese${post.id}`)

        elimReseña.addEventListener('click', ()=>{

            elimReseña.parentElement.remove(elimReseña.id == contenedorRese.id);


        })

    })
     
}
reseña.addEventListener('click', mostrarReseña)


const masReseña = document.getElementById("mas")




let stock = document.getElementById("divCatalogo")
let carro = document.getElementById("Carrito")
let precioTotal = document.getElementById("PrecioTotal")
let carrito = []


mostrarCatalogo(Catalogo)

function mostrarCatalogo(array){
    array.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("productos");

        div.innerHTML += `
                        <div class="catalogoCard">
                           <img  class="imgCatalogo" src="${item.imagen}">
                            <div class="items__catalogo">
                                <h3>${item.nombre}</h3>
                                <span>$${item.precio}</span>
                                <button id="agregar${item.id}" type="button">+</button>
                            </div>   
                        </div>   
                            `
        
        stock.appendChild(div);

        let BtnAdd = document.getElementById(`agregar${item.id}`);
        

        BtnAdd.addEventListener('click',() =>{
            agregarCarrito(item.id)
        })
    });
}

function agregarCarrito(id){
    let yaEsta = carrito.find(el=> el.id == id)
     console.log(yaEsta)
    
    if(yaEsta){
 
     yaEsta.unidades = yaEsta.unidades + 1
 
     document.getElementById(`Und${yaEsta.id}`).innerHTML = `<p id="Und${yaEsta.id}">Und: ${yaEsta.unidades}</p>`

     actualizarCarrito()
 
    }
     else{
 
         ProductoAgregar = Catalogo.find(elemento => elemento.id == id);
 
         ProductoAgregar.unidades = 1
         
     
         carrito.push(ProductoAgregar);
     
         mostrarSeleccion(ProductoAgregar);
     }
 
 }

 function mostrarSeleccion(ProductoAgregar){
    let Div = document.createElement("div");
    Div.className = "productosCarro"
    Div.innerHTML = `
                       <p>${ProductoAgregar.nombre}</p>
                       <p id="Und${ProductoAgregar.id}">Und: ${ProductoAgregar.unidades}</p>
                       <p>$${ProductoAgregar.precio}</p>
                       <button id="BtnEliminarCarrito${ProductoAgregar.id}" type="button">X</button>
   `
   
    carro.appendChild(Div)
   
   let BtnEliminar = document.getElementById(`BtnEliminarCarrito${ProductoAgregar.id}`);
   
   BtnEliminar.addEventListener(`click`, ()=>{
       if(ProductoAgregar.unidades == 1){
   
           BtnEliminar.parentElement.remove();
            carrito = carrito.filter(el => el.id != ProductoAgregar.id)
   
       actualizarCarrito()
       }
       else{
           ProductoAgregar.unidades = ProductoAgregar.unidades - 1
   
           document.getElementById(`Und${ProductoAgregar.id}`).innerHTML = `<p id="Und${ProductoAgregar.id}">Und: ${ProductoAgregar.unidades}</p>`
           actualizarCarrito()
   
   
       } 
    })
       
   }
   function actualizarCarrito(){

    precioTotal.innerText = carrito.reduce((acc,el) => acc + (el.precio * el.unidades), 0)
  
}
 
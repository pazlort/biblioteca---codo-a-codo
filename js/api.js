const URL="http://127.0.0.1:5000/"
fetch(URL+'catalogo_completo')
    .then(res => res.json())
    .then(datos => {
        for (let libro of datos) {
            let catalogoCompleto = document.getElementById('cards');
            for(let libro of datos){
                let card= document.createElement('div');
                card.innerHTML = 
                '<h1 class="code_text"> ' + libro.titulo_libro + '</h1>' +
                '<p class="there_text">Autor: ' + libro.autor_libro + '</p>' +
                '<p class="there_text">Colección: ' + libro.coleccion_libro + '</p>' +
                '<p class="there_text">Editorial: ' + libro.editorial_libro + '</p>'+
                '<div class="star_icon">' +
                '</div>'
                catalogoCompleto.appendChild(card);
            }
        }
    })
    .catch(error=>{alert('Error al obtener el catalogo')})

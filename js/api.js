const URL="http://127.0.0.1:5000/"
fetch(URL+'catalogo_completo')
    .then(res => res.json())
    .then(datos => {
        for (let i = 0; i < datos.length; i=i+4) {
            console.log(datos);
            console.log(i);
            let catalogoCompleto = document.getElementById('cards');
            let card= document.createElement('div');
            card.innerHTML = 
                '<div class="row iamge_movies">'+
                    '<div class="col image_3">'+
                        '<img src="images/catalogo/'+ datos[i].url_img + '" class="image">'+
                        '<h1 class="code_text"> ' + datos[i].titulo_libro + '</h1>' +
                        '<p class="there_text">Autor: ' + datos[i].autor_libro + '</p>' +
                        '<p class="there_text">Colección: ' + datos[i].coleccion_libro + '</p>' +
                        '<p class="there_text">Editorial: ' + datos[i].editorial_libro + '</p>'+
                    '</div>'+
                    '<div class="col image_3">'+
                        '<img src="images/catalogo/'+ datos[i+1].url_img + '" class="image">'+
                        '<h1 class="code_text"> ' + datos[i+1].titulo_libro + '</h1>' +
                        '<p class="there_text">Autor: ' + datos[i+1].autor_libro + '</p>' +
                        '<p class="there_text">Colección: ' + datos[i+1].coleccion_libro + '</p>' +
                        '<p class="there_text">Editorial: ' + datos[i+1].editorial_libro + '</p>'+
                    '</div>'+
                    '<div class="col image_3">'+
                        '<img src="images/catalogo/'+ datos[i+2].url_img + '" class="image">'+
                        '<h1 class="code_text"> ' + datos[i+2].titulo_libro + '</h1>' +
                        '<p class="there_text">Autor: ' + datos[i+2].autor_libro + '</p>' +
                        '<p class="there_text">Colección: ' + datos[i+2].coleccion_libro + '</p>' +
                        '<p class="there_text">Editorial: ' + datos[i+2].editorial_libro + '</p>'+
                    '</div>'+
                    '<div class="col image_3">'+
                        '<img src="images/catalogo/'+ datos[i+3].url_img + '" class="image">'+
                        '<h1 class="code_text"> ' + datos[i+3].titulo_libro + '</h1>' +
                        '<p class="there_text">Autor: ' + datos[i+3].autor_libro + '</p>' +
                        '<p class="there_text">Colección: ' + datos[i+3].coleccion_libro + '</p>' +
                        '<p class="there_text">Editorial: ' + datos[i+3].editorial_libro + '</p>'+
                    '</div>'+
                '</div>'
            catalogoCompleto.appendChild(card);
        }
    })
    .catch(error=>{alert('Error al obtener el catalogo')})
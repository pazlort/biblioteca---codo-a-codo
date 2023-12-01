const URL="http://pazlort.mysql.pythonanywhere-services.com"
fetch(URL+'catalogo_completo')
    .then(res => res.json())
    .then(datos => {
        for (let i = 0; i < 9; i=i+4) {
            let nros=[i,i+1,i+2,i+3]
            console.log(nros);
            let catalogo = document.getElementById('cards_catalogo');
            let card= document.createElement('div');
            card.innerHTML = 
                '<div class="row iamge_movies">'+
                    '<div class="col image_3" id="columna">'+
                    '</div>'
            let columnas = document.getElementById('columna');
            let columns= document.createElement('div');
            for (let nro = nros[0]; nro < nros.length; nro++) {
                console.log( datos[nro].url_img);
                columnas.innerHTML=
                '<img src="images/catalogo/'+ datos[nro].url_img + '" class="image">'+
                '<h1 class="code_text"> ' + datos[nro].titulo_libro + '</h1>' +
                '<p class="there_text">Autor: ' + datos[nro].autor_libro + '</p>' +
                '<p class="there_text">Colección: ' + datos[nro].coleccion_libro + '</p>' +
                '<p class="there_text">Editorial: ' + datos[nro].editorial_libro + '</p>'+
                '</div>'
            }
            catalogo.appendChild(card);
            columnas.appendChild(columnas);
        }
    })
    .catch(error=>{alert('Error al obtener el catalogo')})


/* 
PARA CONTINUAR
    *cargar todo a la db
    *hace que se haga un for dentro de otro asi no queda choclo esta parte de la api
    *en el index hacer que aparezcan random los libros
    *crear dbs con crud

    *Database host address:pazlort.mysql.pythonanywhere-services.com
    *Username:pazlort
    *db = Database(host="pazlort.mysql.pythonanywhere-services.com", user="pazlort", password="bookbuster", database="pazlort$bookbuster")
s
*/
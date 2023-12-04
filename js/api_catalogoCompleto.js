const URL="https://pazlort.pythonanywhere.com/"
//const URL="http://127.0.0.1:5000/"
fetch(URL+'catalogo_completo')
    .then(res => res.json())
    .then(datos => {
        for (let nro = 0; nro < datos.length; nro=nro+4){
            let cardscatalogo = document.getElementById('cards');
            let row= document.createElement('div');
            row.classList.add('row', 'iamge_movies');
            row.setAttribute('id', 'create_row_catalogo'+nro);
            cardscatalogo.appendChild(row);
            for (let i = 0; i < 4; i++) {
                let rowcards = document.getElementById('create_row_catalogo'+nro);
                let col= document.createElement('div');
                col.classList.add('col', 'image_3');
                col.innerHTML = 
                        '<img src="images/catalogo/'+ datos[nro+i].url_img + '" class="image">'+
                        '<h1 class="code_text"> ' + datos[nro+i].titulo_libro + '</h1>' +
                        '<p class="there_text">Autor: ' + datos[nro+i].autor_libro + '</p>' +
                        '<p class="there_text">Colección: ' + datos[nro+i].coleccion_libro + '</p>' +
                        '<p class="there_text">Editorial: ' + datos[nro+i].editorial_libro + '</p>'
                rowcards.appendChild(col);
            }

        }
    })
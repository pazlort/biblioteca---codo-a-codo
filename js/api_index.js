const URL="http://pazlort.mysql.pythonanywhere-services.com"
//const URL="http://127.0.0.1:5000/"
fetch(URL+'catalogo_completo')
    .then(res => res.json())
    .then(datos => {
        arrayNros=[]
        for (let i = 0; i < 8; i++) {
            nrosRandom=Math.floor(Math.random() * datos.length)
            arrayNros.push(nrosRandom)
        }
        for (let nro = 0; nro < arrayNros.length; nro=nro+4){
            let cardscatalogo = document.getElementById('cards_catalogo');
            let row= document.createElement('div');
            row.classList.add('row', 'iamge_movies');
            row.setAttribute('id', 'create_row'+nro);
            cardscatalogo.appendChild(row);
            for (let i = 0; i < 4; i++) {
                let rowcards = document.getElementById('create_row'+nro);
                let col= document.createElement('div');
                col.classList.add('col', 'image_3');
                col.innerHTML = 
                        '<img src="images/catalogo/'+ datos[arrayNros[nro]+i].url_img + '" class="image">'+
                        '<h1 class="code_text"> ' + datos[arrayNros[nro]+i].titulo_libro + '</h1>' +
                        '<p class="there_text">Autor: ' + datos[arrayNros[nro]+i].autor_libro + '</p>' +
                        '<p class="there_text">Colección: ' + datos[arrayNros[nro]+i].coleccion_libro + '</p>' +
                        '<p class="there_text">Editorial: ' + datos[arrayNros[nro]+i].editorial_libro + '</p>'
                rowcards.appendChild(col);
            }

        }
    })
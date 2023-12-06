const URL = "https://pazlort.pythonanywhere.com/";
// const URL = "http://127.0.0.1:5000/"

let objeto = 'titulo_libro';
let orden = 'ASC';

fetch(URL + "/catalogo_completo/" + objeto + '/' + orden)
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

    document.getElementById('filter').addEventListener('click', function (event) {
        event.preventDefault();
        let filtro = document.getElementById('filter').value;
        if (filtro == '1') {
            objeto = 'titulo_libro';
            orden = 'ASC';
        } else if (filtro == '2') {
            objeto = 'titulo_libro';
            orden = 'DESC';
        } else if (filtro == '3') {
            objeto = 'autor_libro';
            orden = 'ASC';
        } else if (filtro == '4') {
            objeto = 'coleccion_libro';
            orden = 'ASC';
        } else if (filtro == '5') {
            objeto = 'editorial_libro';
            orden = 'ASC';
        }
        fetch(URL + "/catalogo_completo/" + objeto + '/' + orden)
            .then(res => res.json())
            .then(datos => {
                const padre = document.getElementById('padre_cards');
                const child = document.getElementById("cards");
                padre.removeChild(child);
                let card= document.createElement('div');
                card.classList.add('container', 'text-center');
                card.setAttribute('id', 'cards');
                padre.appendChild(card);
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

});
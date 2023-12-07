const URL="https://pazlort.pythonanywhere.com/"
//const URL="http://127.0.0.1:5000/"

let objeto = 'titulo_libro';
let orden = 'ASC';

fetch(URL + "/catalogo_completo/" + objeto + '/' + orden)
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
                        '<a href="libros.html/'+datos[arrayNros[nro]+i].id_libro+'"><img src="images/catalogo/'+ datos[arrayNros[nro]+i].url_img + '"class="image"></a>'+
                        '<h1 class="code_text"> ' + datos[arrayNros[nro]+i].titulo_libro + '</h1>'
                rowcards.appendChild(col);
            }

        }
    })
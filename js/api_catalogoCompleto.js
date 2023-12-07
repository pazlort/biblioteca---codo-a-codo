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
                col.setAttribute('id', ('select_img_'+datos[nro+i].id_libro));
                col.innerHTML = 
                        '<img src="images/catalogo/'+ datos[nro+i].url_img + '" class="image">'+
                        '<h1 class="code_text"> ' + datos[nro+i].titulo_libro + '</h1>'
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
                    col.setAttribute('id', ('select_img_'+datos[nro+i].id_libro));
                    col.innerHTML = 
                            '<img src="images/catalogo/'+ datos[nro+i].url_img + '" class="image">'+
                            '<h1 class="code_text"> ' + datos[nro+i].titulo_libro + '</h1>'
                    rowcards.appendChild(col);
                }
    
            }
        })

        setTimeout(() => {
            botones=document.querySelectorAll('div');
            for (let i = 0; i < botones.length; i++) {
                let id_libro= (botones[i].id).split('_')[2];
                let accion = (botones[i].id.split('_'))[0];
                if (accion == 'select') {
                    document.getElementById(botones[i].id).addEventListener('click', function (event) {
                        event.preventDefault();
                        fetch(URL + ('libro/'+id_libro))
                            .then(res => res.json())
                            .then(datos => {
                                console.log(datos);
                                const padre = document.getElementById('container_catalogo');
                                const child = document.getElementById("title");
                                padre.removeChild(child);
                                const child_2 = document.getElementById("catalogo_completo");
                                padre.removeChild(child_2);
                                let libro= document.createElement('div');
                                libro.classList.add('card', 'mb-3');
                                libro.setAttribute('style', 'max-width: 540px;');
                                libro.innerHTML = 
                                    '<div class="row g-0">'+
                                        '<div class="col-md-4">'+
                                            '<img src="images/catalogo/'+ datos.url_img + '" class="img-fluid rounded-start">'+
                                        '</div>'+
                                        '<div class="col-md-8">'+
                                            '<div class="card-body">'+
                                                '<h3 class="card-title">' + datos.titulo_libro + '</h3>'+
                                                '<p class="card-text">ID: ' + datos.id_libro + '</p>'+
                                                '<p class="card-text">Autor: ' + datos.autor_libro + '</p>'+
                                                '<p class="card-text">Colección: ' + datos.coleccion_libro + '</p>'+
                                                '<p class="card-text">Editorial: ' + datos.editorial_libro + '</p>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'
                                padre.appendChild(libro);
                            })
                    })
                }
            }
        }, "1000");
});
setTimeout(() => {
    botones=document.querySelectorAll('div');
    for (let i = 0; i < botones.length; i++) {
        let id_libro= (botones[i].id).split('_')[2];
        let accion = (botones[i].id.split('_'))[0];
        if (accion == 'select') {
            document.getElementById(botones[i].id).addEventListener('click', function (event) {
                event.preventDefault();
                fetch(URL + ('libro/'+id_libro))
                    .then(res => res.json())
                    .then(datos => {
                        console.log(datos);
                        const padre = document.getElementById('container_catalogo');
                        const child = document.getElementById("title");
                        padre.removeChild(child);
                        const child_2 = document.getElementById("catalogo_completo");
                        padre.removeChild(child_2);
                        let libro= document.createElement('div');
                        libro.classList.add('card', 'mb-3');
                        libro.setAttribute('style', 'max-width: 540px;');
                        libro.innerHTML = 
                            '<div class="row g-0">'+
                                '<div class="col-md-4">'+
                                    '<img src="images/catalogo/'+ datos.url_img + '" class="img-fluid rounded-start">'+
                                '</div>'+
                                '<div class="col-md-8">'+
                                    '<div class="card-body">'+
                                        '<h3 class="card-title">' + datos.titulo_libro + '</h3>'+
                                        '<p class="card-text">ID: ' + datos.id_libro + '</p>'+
                                        '<p class="card-text">Autor: ' + datos.autor_libro + '</p>'+
                                        '<p class="card-text">Colección: ' + datos.coleccion_libro + '</p>'+
                                        '<p class="card-text">Editorial: ' + datos.editorial_libro + '</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
                        padre.appendChild(libro);
                    })
            })
        }
    }
}, "1000");
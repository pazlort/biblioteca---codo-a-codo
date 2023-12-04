//const URL="http://pazlort.mysql.pythonanywhere-services.com"
const URL="http://127.0.0.1:5000/"
fetch(URL+'users')
    .then(res => res.json())
    .then(datos => {
        let rol_name
        for (let nro = 0; nro < datos.length; nro=nro+3){
            let list_user = document.getElementById('users_list');
            let row= document.createElement('div');
            row.classList.add('row', 'iamge_movies');
            row.setAttribute('id', 'create_row_users'+nro);
            list_user.appendChild(row);
            for (let i = 0; i < 3; i++) {
                if (datos[nro+i].id_rol == 1) {
                    rol_name='Adminitrador'
                } else if (datos[nro+i].id_rol == 2) {
                    rol_name='Gestor'
                } else if (datos[nro+i].id_rol == 3) {
                    rol_name='Usuario'
                }
                let rowusers = document.getElementById('create_row_users'+nro);
                let col= document.createElement('div');
                col.classList.add('col-sm-3', 'image_3');
                col.innerHTML =
                   ' <div class="card" style="width: 18rem;">'+
                    ' <div class="card-body">'+
                        ' <h5 class="card-title"> USUARIO: '+datos[nro+i].id_user + ' - '+ datos[nro+i].username+'</h5>'+
                        '</div>'+
                        ' <ul class="list-group list-group-flush">'+
                                '<li class="list-group-item">NOMBRE COMPLETO : '+datos[nro+i].firstname + ' '+ datos[nro+i].lastname+'</li>'+
                                '<li class="list-group-item">E-MAIL : '+datos[nro+i].email +'</li>'+
                                '<li class="list-group-item">ROL : '+datos[nro+i].id_rol +' - '+rol_name+'</li>'+
                            '</ul>'+
                        '<div class="card-body">'+
                            '<a href="#" class="card-link">Modificar</a>'+
                            '<button type="submit" class="card-link" id="eliminar_user'+(nro+i)+'">Eliminar</button>'+
                        '</div>'+
                    '</div>'
                rowusers.appendChild(col);
            }
        }
    })

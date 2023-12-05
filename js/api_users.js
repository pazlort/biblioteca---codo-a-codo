const URL="https://pazlort.pythonanywhere.com/"
//const URL="http://127.0.0.1:5000/"
let botones=[]

fetch(URL+'users')
    .then(res => res.json())
    .then(datos => {
        let rol_name
        for (let nro = 0; nro < datos.length; nro=nro+2){
            let list_user = document.getElementById('users_list');
            let row= document.createElement('div');
            row.classList.add('row', 'iamge_movies');
            row.setAttribute('id', 'create_row_users'+nro);
            list_user.appendChild(row);
            for (let i = 0; i < 2; i++) {
                var rol=datos[nro+i].id_rol;
                if (rol == 1) {
                    rol_name='Adminitrador'
                } else if (rol == 2) {
                    rol_name='Gestor'
                } else if (rol == 3) {
                    rol_name='Usuario'
                }
                let nro_id= datos[nro+i].id_user
                let rowusers = document.getElementById('create_row_users'+(nro));
                let col= document.createElement('div');
                col.classList.add('col-sm-4', 'image_3');
                col.setAttribute('id', 'create_col_users_'+nro_id);
                col.innerHTML =
                   ' <div class="card" style="width: 25rem;">'+
                    ' <div class="card-body">'+
                        ' <h5 class="card-title"> USUARIO: '+datos[nro+i].id_user + ' - '+ datos[nro+i].username+'</h5>'+
                        '</div>'+
                        ' <ul class="list-group list-group-flush">'+
                                '<li class="list-group-item">NOMBRE COMPLETO : '+datos[nro+i].firstname + ' '+ datos[nro+i].lastname+'</li>'+
                                '<li class="list-group-item">E-MAIL : '+datos[nro+i].email +'</li>'+
                                '<li class="list-group-item">ROL : '+rol +' - '+rol_name+'</li>'+
                            '</ul>'+
                        '<div class="card-body">'+
                        '<button class="card-link" id="edit_user_'+(nro_id)+'">Editar</button>'+
                        '<button class="card-link" id="eliminar_user_'+(nro_id)+'">Eliminar</button>'+
                        '</div>'+
                    '</div>'
                rowusers.appendChild(col);
            }
        }

    })

setTimeout(() => {
    botones=document.querySelectorAll('button.card-link');
    for (let i = 0; i < botones.length; i++) {
        let id_user= (botones[i].id).split('_')[2];
        document.getElementById(botones[i].id).addEventListener('click', function (event) {
            event.preventDefault();
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                fetch(URL + ('users/'+id_user), {method: 'DELETE' })
                .then(res => {
                    console.log(res);
                    if (res.ok) {
                        alert('User eliminado correctamente.');
                        location.reload()
                    }
                })
            }
        })
    }
}, "2000");

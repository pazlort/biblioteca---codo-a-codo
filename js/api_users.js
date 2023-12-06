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
                    rol_name='Administrador'
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
        let accion = (botones[i].id.split('_'))[0];
        if (accion == 'eliminar') {
            document.getElementById(botones[i].id).addEventListener('click', function (event) {
                event.preventDefault();
                if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                    fetch(URL + ('users/'+id_user), {method: 'DELETE' })
                    .then(res => {
                        if (res.ok) {
                            alert('User eliminado correctamente.');
                            location.reload()
                        }
                    })
                }
            })
        }else if (accion == 'edit') {
            document.getElementById(botones[i].id).addEventListener('click', function (event) {
                event.preventDefault('users_list');
                fetch(URL + ('users/'+id_user))
                    .then(res => res.json())
                    .then(res => {
                        const update_form = document.getElementById("users");
                        const child = document.getElementById("container");
                        update_form.removeChild(child);
                        let form= document.createElement('form');
                        form.classList.add('formulario');
                        form.setAttribute('id', 'edit_form');
                        form.setAttribute('style','background-color:#E5E5E5;')
                        update_form.appendChild(form);
                        form.innerHTML =
                            '<div class="formulario__grupo" id="grupo__nombre">'+
                                '<label for="nombre" class="formulario__label">Nombre</label>'+
                                '<div class="formulario__grupo-input">'+
                                    '<input type="text" class="formulario__input" name="nombre" id="nombre" value="'+res.firstname+'">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="formulario__grupo" id="grupo__apellido">'+
                                    '<label for="apellido" class="formulario__label">Apellido</label>'+
                                    '<div class="formulario__grupo-input">'+
                                    '<input type="text" class="formulario__input" name="apellido" id="apellido" value="'+res.lastname+'">'+
                                '</div>'+
                            '</div>'+
                            '<div class="formulario__grupo" id="grupo__usuario">'+
                                '<label for="usuario" class="formulario__label">Nombre de Usuario</label>'+
                                '<div class="formulario__grupo-input">'+
                                    '<input type="text" class="formulario__input" name="usuario" id="usuario" value="'+res.username+'">'+
                                '</div>'+
                            '</div>'+
                            '<div class="formulario__grupo" id="grupo__correo">'+
                                '<label for="correo" class="formulario__label">Correo Electrónico</label>'+
                                '<div class="formulario__grupo-input">'+
                                    '<input type="email" class="formulario__input" name="correo" id="correo" value="'+res.email+'">'+
                                '</div>'+
                            '</div>'+
                            '<div class="formulario__grupo" id="grupo__password">'+
                                '<label for="password" class="formulario__label">Contraseña</label>'+
                                '<div class="formulario__grupo-input">'+
                                    '<input type="password" class="formulario__input" name="password" id="password" value="'+res.pass_user+'">'+
                                '</div>'+
                            '</div>'+
                            '<div class="formulario__grupo" id="grupo__password2">'+
                                '<label for="password2" class="formulario__label">Repetir Contraseña</label>'+
                                '<div class="formulario__grupo-input">'+
                                    '<input type="password" class="formulario__input" name="password2" id="password2" value="'+res.pass_user+'">'+
                                '</div>'+
                            '</div>'+
                            '<div class="formulario__grupo" id="grupo__rol_id">'+
                                '<label for="rol_id" class="formulario__label">Rol asignado</label>'+
                                '<div class="formulario__grupo-input">'+
                                    '<select class="formulario__input" name="rol_id" id="rol_id" value="'+res.id_rol+'">'+
                                        '<option value="" selected="selected">Seleccione un Rol</option>'+
                                        '<option value="1">Administrador</option>'+
                                        '<option value="2">Gestor</option>'+
                                        '<option value="3">Usuario</option>'+
                                    '</select>'+
                                '</div>'+
                            '</div>'+
                            '<div class="formulario__grupo formulario__grupo-btn-enviar" id="boton">'+
                                '<button type="submit" class="formulario__btn">Enviar</button>'+
                            ' </div>'+
                            '<br>'
                        document.getElementById('boton').addEventListener('click', function (event) {
                            event.preventDefault(); 
                            var formData = new FormData();
                            formData.append('nombre', document.getElementById('nombre').value);
                            formData.append('apellido', document.getElementById('apellido').value);
                            formData.append('usuario', document.getElementById('usuario').value);
                            formData.append('correo', document.getElementById('correo').value);
                            formData.append('password', document.getElementById('password').value);
                            formData.append('rol_id', document.getElementById('rol_id').value);
                            if (confirm('¿Estás seguro de que quieres modificar este usuario?')) {
                                fetch(URL + ('users/'+res.id_user),{method:'PUT', body: formData})
                                    .then(res => res.json())
                                    .then(res => {
                                        alert('Se actualizo el User correctamente');
                                        location.reload();
                                    })
                                    .catch(function (error) {
                                        alert('Error al agregar el user.');
                                    });
                            }
                        })
                        
                    })
            })
        }
    }
}, "2000");




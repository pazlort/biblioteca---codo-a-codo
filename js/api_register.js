const URL="https://pazlort.pythonanywhere.com/"
//const URL="http://127.0.0.1:5000/"

document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); 
    var formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('apellido', document.getElementById('apellido').value);
    formData.append('usuario', document.getElementById('usuario').value);
    formData.append('correo', document.getElementById('correo').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('rol_id', document.getElementById('rol_id').value);
    if (confirm('¿Estás seguro de que quieres agregar este usuario?')) {
        fetch(URL+'users',{method:'POST', body: formData})
            .then(res => res.json())
            .then(datos => {
                alert('User agregado correctamente')
                document.getElementById('nombre').value="";
                document.getElementById('apellido').value="";
                document.getElementById('usuario').value="";
                document.getElementById('correo').value="";
                document.getElementById('password').value="";
                document.getElementById('password2').value="";
                document.getElementById('rol_id').value="";
            })
            .catch(function (error) {
                alert('Error al agregar el user.');
            });
    }
})
//const URL="https://pazlort.pythonanywhere.com/"
const URL="http://127.0.0.1:5000/"



document.getElementById('eliminar_user_1').addEventListener('submit', function (event) {
    event.preventDefault(); 
    var formData = new FormData();
    let imp=document.getElementById('eliminar_user_1')
    console.log(imp);
    formData.append('id', document.getElementById('nombre').value);
    formData.append('apellido', document.getElementById('apellido').value);
    formData.append('usuario', document.getElementById('usuario').value);
    formData.append('correo', document.getElementById('correo').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('rol_id', document.getElementById('rol_id').value);
    console.log(formData);


    fetch(URL+'users/<int:id_user>', {method:'DELETE', body: formData})
        .then(res => res.json())
        .then(datos => {
            console.log(datos);
        })
    })

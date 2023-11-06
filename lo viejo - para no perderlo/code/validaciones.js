const { createApp } = Vue 
createApp({
    data(){
        return{
            nombreContacto: '',
            email:'',
            comentario:'',
        }
    },
    methods:{
        validarNombre: function() {
            if (this.nombreContacto == '') {
                alert("Por favor ingrese su nombre");
                return false;
            }
            return true;
        },
        validarEmail: function () {
            let arroba=false;
            let punto= false;
            for (let i = 0; i < this.email.length; i++) {
                if (this.email[i] == '@') {
                    arroba=true;
                }
                if (this.email[i] == '.') {
                    punto=true;
                }
            }
            if (arroba == false || punto == false) {
                alert("Por favor ingrese un e-mail valido");
                return false;
            }
            return true;
        },
        validarTodo: function() {
            let validoNombre = this.validarNombre();
            let validoEmail = this.validarEmail();
            if (validoNombre && validoEmail && response.ok) {
                    this.nombreContacto = '';
                    this.email = '';
                    this.comentario = '';
                    alert('Gracias por ponerse en contacto');
                }
        }  
    },
}).mount('#app');
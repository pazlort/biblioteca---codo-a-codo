


const { createApp } = Vue 
createApp({
    data(){
        return{
            nombreDeBusqueda: '',
            arrayNombre:[],
            url:'',
            libro:{},
            librosEncontrados:[],
        }
    },
    methods:{
        buscarLibros() {
            librosEncontrados=[]
            arrayNombre=this.nombreDeBusqueda.split(' ')
            for (let i = 0; i < arrayNombre.length; i++) {
                i<(arrayNombre.length-1)?this.url+=arrayNombre[i]+'+':this.url+=arrayNombre[i];
            }
            this.url="https://openlibrary.org/search.json?q="+this.url
            fetch(this.url)
                .then(res => res.json())
                .then(datos => {
                    for (let i = 0; i < 21; i++) {
                        const libros = datos.docs[i];
                        if (libros.cover_i !== undefined) {
                            this.libro={
                                nombre: libros.title,
                                autor:libros.author_name[0],
                                anioPrimerPublicacion: libros.first_publish_year,
                                isbn: libros.isbn[0],
                                editorial: libros.publisher[0],
                                imagen: "https://covers.openlibrary.org/b/id/"+libros.cover_i+"-L.jpg",
                            }
                            this.librosEncontrados.push(this.libro)
                        }
                    }
                })
        },
    },
}).mount('#app')
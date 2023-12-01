let footer = document.getElementById('footer');
let contenido= document.createElement('div');
contenido.classList.add('container');
contenido.innerHTML =
'<div class="footer_menu">'+
   '<ul>'+
      '<li><a href="index.html">Inicio</a></li>'+
      '<li><a href="catalogoCompleto.html">Catálogo</a></li>'+
      '<li><a href="prestamos.html">Prestamos</a></li>'+
      '<li><a href="devolucion.html">Devoluciones</a></li>'+
      '<li><a href="merch.html">Merchandising</a></li>'+
      '<li><a href="index.html#contacto">Contacto</a></li>'+
      '<li><a href="login.html">Login</a></li>'+
    '</ul>'+
'</div>'+
'<div class="social_icon">'+
    '<ul>'+
      '<li><a href="#"><img src="images/fb-icon.png"></a></li>'+
      '<li><a href="#"><img src="images/twitter-icon.png"></a></li>'+
      '<li><a href="#"><img src="images/linkedin-icon.png"></a></li>'+
      '<li><a href="#"><img src="images/instagram-icon.png"></a></li>'+
    '</ul>'+
'</div>'
footer.appendChild(contenido);

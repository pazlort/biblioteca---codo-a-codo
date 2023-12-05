let navbar = document.getElementById('navbarSupportedContent');
let links= document.createElement('ul');
links.classList.add('navbar-nav', 'mr-auto');
links.innerHTML =
'<li class="nav-item">'+
    '<a class="nav-link" href="index.html">Inicio</a>'+
'</li>'+
'<li class="nav-item">'+
    '<a class="nav-link" href="/catalogoCompleto.html">Catálogo</a>'+
'</li>'+
'<li class="nav-item">'+
    '<a class="nav-link" href="prestamos.html">Préstamos</a>'+
'</li>'+
'<li class="nav-item">'+
    '<a class="nav-link" href="devolucion.html">Devoluciones</a>'+
'</li>'+
'<li class="nav-item">'+
    '<a class="nav-link" href="users.html">Users</a>'+
'</li>'+
'<li class="nav-item">'+
    '<a class="nav-link" href="merch.html">Merchandising</a>'+
'</li>'+
'<li class="nav-item">'+
    '<a class="nav-link" href="index.html#contacto">Contacto</a>'+
'</li>'+
'<div class="search_icon"><a href="login.html"><img src="images/user-icon.png">'+
    '<span class="padding_left_15">Login</span></a>'+
'</div>'
navbar.appendChild(links);
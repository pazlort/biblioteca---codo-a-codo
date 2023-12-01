--USE ESTE PORQUE ME TIRABA ERROR AL AGREGAR EL NOW Y DE AHI SE ME ARMO UN CHOCLO ENORME DE ERRORES

CREATE DATABASE IF NOT EXISTS miapp CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI; USE miapp;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
	id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	username VARCHAR(50) NOT NULL,
    pass_user VARCHAR(100) NOT NULL,
	firstname VARCHAR(50) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
    id_rol TINYINT(1)
) ENGINE=INNODB CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Crear la tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id_rol INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
) ENGINE=INNODB CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Crear la tabla de libros
CREATE TABLE IF NOT EXISTS libros (
    id_libro INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo_libro VARCHAR(100) NOT NULL,
    autor_libro VARCHAR(100) NOT NULL,
    coleccion_libro VARCHAR(100) NOT NULL,
    editorial_libro VARCHAR(50) NOT NULL,
    url_img VARCHAR(100) NOT NULL
) ENGINE=INNODB CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Crear la tabla de prestamos
CREATE TABLE IF NOT EXISTS prestamos (
    id_prestamo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_libro INT NOT NULL,
    fecha_desde DATETIME NOT NULL,
    fecha_hasta INT NOT NULL,
    observaciones VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES prestamos(id_prestamo)
) ENGINE=InnoDB CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

INSERT INTO usuarios
    (email, username, pass_user, firstname, lastname, id_rol)
    VALUES
    ('pazmarialort@gmail.com', 'pazlort', 'bookbuster', 'Paz', 'Lort', '1'),
    ('margheritisvaleria@gmail.com', 'valeriamargheritis', 'bookbuster', 'Valeria', 'Margheritis', '1'),
    ('cristianmanchadomdq@gmail.com', 'cristianmanchado', 'bookbuster', 'Cristian', 'Manchado', '1'),
    ('jonathan.flys@gmail.com', 'jonathanflys', 'bookbuster', 'Jonathan', 'Flys', '1'),
    ('stefaniazlopez@gmail.com', 'stefaniazlopez', 'bookbuster', 'Stefania', 'Lopez', '1');

INSERT INTO roles
    (name)
    VALUES
    ('Administrador'),
    ('Gestor'),
    ('Usuario');

INSERT INTO libros
    (titulo_libro, autor_libro,coleccion_libro, editorial_libro, url_img)
    VALUES
    ('¿De qué color es un beso?', 'Rocio Bonill', '-', 'ALgar América', 'de que color es un beso.webp'),
    ('¡No!', 'Marta Altés', '-', 'Thule', 'no.jpg'),
    ('¡SIlencio niños! y otros cuentos', 'Ema Wolf', 'Torre de papel azul', 'Grupo Norma', 'Silencio niños y otros cuentos.jpg'),
    ('¿A donde está la corona?', 'Silvia Schujer', 'La valija encantada', 'La Valijita', 'A donde esta la corona.jpeg'),
    ('Una noche sin dormir', 'Micaela Chirif y Joaquin Camp', '-', 'Lecturita', 'una noche sin dormir.webp'),
    ('¿qué hace la gata por las noches?', 'Katrin Wiehle', 'Buenas Noches', 'Norma', 'que hace la gata por las noches.jpg'),
    ('101 dalmatas', 'Dodie Smith (adaptación Peter Bently)', '-', 'El Ateneo', '101 dalmatas.jpg'),
    ('Ahora que lo pienso', 'Martín Blasco', 'Buenas Noches', 'Norma', 'ahora que lo pienso.jpg'),
    ('Ahora ya soy Pérez', 'Margarita Mainé', 'Abrazo de letras', 'Hola chicos', 'ahora ya soy perez.webp'),
    ('Aquí estamos (notas para vivir en el planeta tierra)', 'Oliver Jeffers', '-', 'FCE', 'aqui estamos.webp'),
    ('Cereza y el río', 'Didi Grau y Jimena Tello', 'peque letra', 'Edelvives', 'Cereza y el rio.jpg'),
    ('Choco encuentra una mamá', 'Keiko Kasza', 'Buenas Noches', 'Norma', 'choco encuentra una mama.jpg'),
    ('Clarita fue a la China', 'Graciela Montes', 'Nivel Lector I', 'Loqueleo/ Santillana', 'Clarita fue a la China.jpg'),
    ('Cómo educar al monstruo del armario', 'Antoine Dole y Bruno Salamone', '-', 'Algar América', 'Como educar almonstruo del armario.webp'),
    ('Cómo reconocer un monstruo', 'Gustavo Roldán', '-', 'Caleidoscopio', 'Como reconocer un monstruo.jpg'),
    ('Cuentos en pijamas', 'Florencia Suarez', '-', 'Orsai', 'Cuentos en pijamas.png'),
    ('Cuero negro, vaca blanca', 'Pablo Bernasconi', '-', 'La brujita de Papel', 'cuero negro vaca blanca.jpg'),
    ('De duendes y gaviotas ', 'María ANdreolli', '-', 'Dunken', 'de duendes y gaviotas.jpg'),
    ('Disculpe... ¿Es usted una bruja?', 'Emily Horn', 'Buenas Noches', 'Norma', 'Disculpe...Es usted una bruja.jpg'),
    ('Disparates (Rimas y adivinanzas)', 'Julia Chaktoura', 'Alfaguara infantil', 'Alfaguara', 'Disparates (Rimas y adivinanzas).jpg'),
    ('Donde viven los monstruos', 'Maurice Sendak', '-', 'Kalandraka', 'donde viven los monstruos.webp'),
    ('El árbol de las siete brujas', 'Silvia Schujer', 'La valija encantada', 'La Valijita', 'El arbol de las siete brujas.jpeg'),
    ('El baúl de mis fiestas - un libro sobre colores', '-', 'Colección El baúl', 'Santillana', 'El baul de mis fiestas.Un libro sobre los colores.jpg'),
    ('El club de los perfectos', 'Graciela Montes', 'Cuentos del Pajarito Remendado', 'Colihue', 'El club de los perfectos.jpg'),
    ('El día que mamá se transformó en dragón', 'Belen Lopez Medus', '-', 'Triñanes gráfica', 'El dia en que mama se trasnformo en un dragon.webp'),
    ('El dragón en la montaña', 'Silvia Schujer', 'La valija encantada', 'La Valijita', 'El dragon en la montania.jpeg'),
    ('El gran Isumbochi - El tambor de las brujas', 'Margarita Mainé', 'Cuentos tradicionales del mundo', 'Uranito', 'El gran Isumbochi - Cuento tradicional Japones.jpg'),
    ('EL hilo invisible', 'Patricia Karst', '-', 'Océano', 'el hilo invisible.webp'),
    ('El león miedoso', 'María Mañeru y Sandra Aguilar', '-', 'm4', 'el leon miedoso.jpg'),
    ('El misterio del mayordomo', 'Norma Huidobro', 'Torre de papel azul', 'Grupo Norma', 'el misterio del mayordomo.jpg'),
    ('El monstruo de colores', 'Anna Llenas', '-', 'Flamboyant', 'El monstruo de colores.webp'),
    ('El muy Magnífico grandulón', 'Silvia Schujer', 'La valija encantada', 'La Valijita', 'El muy Magnifico grandulon.jpeg'),
    ('El plan', 'Ethel Batista y Eva Mastrogiulio', '-', 'Caleidoscopio', 'El plan.webp'),
    ('El príncipe de otro pozo', 'Silvia Schujer', 'La valija encantada', 'La Valijita', 'El principe de otro pozo.jpeg'),
    ('El regalo maravilloso', 'Silvia Schujer', 'La valija encantada', 'La Valijita', 'El regalo maravilloso.jpeg'),
    ('El reino de Malumort', 'Silvia Schujer', 'La valija encantada', 'La Valijita', 'El reino de Malumort.jpeg'),
    ('El rey de los duendes - La pastora y el principe', 'Margarita Mainé', 'Cuentos tradicionales del mundo', 'Uranito', 'El rey de los duendes - La pastora y el principe.jpeg'),
    ('El tiburón en la bañera', 'David machado', 'Torre de papel roja', 'Norma', 'El tiburon en la banera.jpg'),
    ('Engaños', 'Ilan Brenman y Guilherme KArsten', '-', 'Capicua', 'Engaños.jpg'),
    ('Eugenio está... ¡enojado!', 'Vic Parsons', '-', 'Multiverso', 'eugenio esta enojado.jpg'),
    ('Helado de dragón', 'María Emilia ALcoba y  Cecilia Varela', '-', 'del Naranjo', 'helado de dragon.jpg'),
    ('Historia del Pajarito Remendado', 'Gustavo Roldán', 'Cuentos del Pajarito Remendado', 'Colihue', 'Historia del Pajarito Remendado.jpg'),
    ('La canción de las pulgas', 'Gustavo Roldán', 'Cuentos del Pajarito Remendado', 'Colihue', 'la cancion de las pulgas.png'),
    ('La familia Delasoga', 'Graciela Montes', 'Cuentos del Pajarito Remendado', 'Colihue', 'la familia de la soga.webp'),
    ('La familia López', 'Margarita Mainé', 'Torre de papel roja', 'Grupo Norma', 'la familia lopez.jpg'),
    ('La mesa, el burro y el bastón', 'Hermanos Grimm', 'Cuentos del Pajarito Remendado', 'Colihue', 'La mesa, el burro y el baston.jpg'),
    ('La muñeca de Yací - El poder de Kimikú', 'Margarita Mainé', 'Cuentos tradicionales del mundo', 'Uranito', 'La muñeca de Yaci - El poder de Kimiku.jpeg'),
    ('La planta maravillosa - Cuento tradicional indonesio', 'Margarita Mainé', 'La vuelta al mundo con La Valijita', 'La Valijita', 'La planta maravillosa - Cuento tradicional indonesio.jpeg'),
    ('La princesa inquieta - Cuento tradicional checho', 'Margarita Mainé', 'La vuelta al mundo con La Valijita', 'La Valijita', 'La princesa inquieta - Cuento tradicional checho.jpeg'),
    ('La princesa y el jardinero', 'Silvia Schujer', 'La valija encantada', 'La Valijita', 'La princesa y el jardinero.jpeg'),
    ('La sopa mas rica', 'Maríana Ruiz Johnson', '-', 'Ojoreja', 'la sopa mas rica.jpg'),
    ('La vaca y la espinaca', 'Agustina Lynch', '-', 'El Ateneo', 'La vaca y la espinaca.jpg'),
    ('Las aventuras del Sapo Ruperto', 'Roy Berocay', 'Narrativa Lila', 'Loqueleo/ Santillana', 'las aventuras del sapo ruperto.jpg'),
    ('Las babuchas de Ahman - Cuento tradicional árabe', 'Margarita Mainé', 'La vuelta al mundo con La Valijita', 'La Valijita', 'Las babuchas de Ahman - Cuento tradicional arabe.jpeg'),
    ('Las interrupciones', 'Nicolas Schuff', '-', 'Galería', 'las interrupciones.jpg'),
    ('león pirata', 'Christine Nöstlinger', 'Torre de papel naranja', 'Grupo Norma', 'Leon pirata.jpg'),
    ('Los embrollos de Winnie y WIlbur', 'Laura Owen y Korky Paul', '-', 'Océano', 'los embrollos de winni y wilbur.jpg'),
    ('Los niños no existen y otros cuentos con monstruos', 'Gabriela Keselman', 'Torre de papel roja', 'Grupo Norma', 'Los ninos no existen y otros cuentos con monstruos.jpg'),
    ('Los pasteles de mashenka - Cuento tradicional ruso', 'Margarita Mainé', 'La vuelta al mundo con La Valijita', 'La Valijita', 'Los pasteles de mashenka - Cuento tradicional ruso.jpeg'),
    ('Mariposa con hipo', 'Ana María Shua', 'Buenas Noches', 'Grupo Norma', 'Mariposa con hipo.webp'),
    ('Mascotas de cuento', 'María Ines Falconi', 'Torre de papel azul', 'Norma', 'mascotas de cuento.jpg'),
    ('Me llamo Franciquio - Centro tradicional mexicano', 'Margarita Mainé', 'La vuelta al mundo con La Valijita', 'La Valijita', 'Me llamo Franciquio - Centro tradicional mexicano.jpeg'),
    ('Mi papá estuvo en la selva', 'Gusti y Anne Decis', '-', 'Pequeño editor', 'Mi papa estuvo en la selva.jpg'),
    ('Nabuco, etc.', 'Ema Wolf', 'Torre de papel azul', 'Grupo Norma', 'Nabuco, etc.jpg'),
    ('Nina El peor enojo La mejor sorpresa', 'Gabriela Keselman', 'Torre de papel naranja', 'Grupo Norma', 'nina el peor enojo la mejor sorpresa.jpg'),
    ('Paisaje secreto', 'Silvia Schujer', 'La valija encantada', 'La Valijita', 'Paisaje secreto.jpeg'),
    ('Pájaro de nueve colores', 'Gustavo Roldán', 'Torre de papel naranja', 'Grupo Norma', 'Pajaro de nueve colores.jpg'),
    ('Para esconderse de un monstruo ', 'Gustavo Roldán', '-', 'Thule', 'Para esconderse de un monstruo.jpg'),
    ('Pequeño dragón aprende a echar fuego', 'Gabriela Perez Aguilar y Natalia Colombo', 'peque Letra', 'Edelvives', 'Pequeño dragon aprende a echar fuego.jpg'),
    ('Pequeño dragón aprende a volar', 'Graciela Pérez Aguilar', 'peque letra', 'edelvives', 'Pequeño dragon aprende a volar.jpg'),
    ('Piojo caminador', 'Gustavo Roldán', 'peque letra', 'edelvives', 'Piojo caminador.jpg'),
    ('Puro ojos', 'Elsa Bornemann', 'Narrativa Lila', 'Loqueleo/ Santillana', 'Puro ojos.jpg'),
    ('Quiero ser Perez', 'margarita Mainé', 'Abrazo de letras', 'Hola chicos', 'quiero ser perez.webp'),
    ('Regalo de Navidad - Cuento tradicional Norteamericano', 'Margarita Mainé', 'La vuelta al mundo con La Valijita', 'La Valijita', 'Regalo de Navidad - Cuento tradicional Norteamericano.jpeg'),
    ('Soy', 'Raquel Cané', '-', 'V&R', 'soy.jpg'),
    ('Todavía quiero ser Perez', 'Margarita Mainé', 'Abrazo de letras', 'Hola chicos', 'todavia quiero ser perez.webp'),
    ('Tres hadas entrelazadas', 'Silvia Schujer', 'La valija encantada', 'La Valijita', 'Tres hadas entrelazadas.jpeg'),
    ('Un cuento ¡puajjj! y otros cuentos', 'Laura Devetach', 'Narrativa Amarilla', 'Loqueleo/ Santillana', 'un cuento puaj y otros cuentos.jpg'),
    ('Un gato como cualquiera', 'Graciela Montes', 'Cuentos del Pajarito Remendado', 'Colihue', 'Un gato como cualquiera.jpg'),
    ('Un incendio desastroso', 'Margarita Mainé', 'Torre de papel azul', 'Grupo Norma', 'un incendio desastroso.jpg'),
    ('Un pajarito de papel', 'Gustavo Roldán', 'Cuentos del Pajarito Remendado', 'Colihue', 'Un pajarito de papel.jpg'),
    ('Un viaje por el campo', 'Margarita Mainé', 'La Valijita viajera', 'La Valijita', 'Un viaje por el campo.jpeg'),
    ('Un viaje por el delta', 'Margarita Mainé', 'La Valijita viajera', 'La Valijita', 'Un viaje por el delta.jpeg'),
    ('Un viaje por la estepa', 'Margarita Mainé', 'La Valijita viajera', 'La Valijita', 'Un viaje por la estepa.jpeg'),
    ('Un viaje por la laguna', 'Margarita Mainé', 'La Valijita viajera', 'La Valijita', 'Un viaje por la laguna.jpeg'),
    ('Un viaje por las montañas', 'Margarita Mainé', 'La Valijita viajera', 'La Valijita', 'Un viaje por las montañas.jpeg'),
    ('Un viaje por los hielos', 'Margarita Mainé', 'La Valijita viajera', 'La Valijita', 'Un viaje por los hielos.jpg'),
    ('Veo veo conjeturas de un conejo', 'Laura Wittner', '-', 'Tres en línea', 'veo veo conjeturas de un conejo.png'),
    ('Versos tradicionales para cebollitas', 'María Elene Walsh', '-', 'Alfawalsh', 'versos tradicionales para cebollitas.jpg'),
    ('Voy, ven y vas - Los tres vampiros', 'Cecilia Blanco', 'Cuentos fantásticos', 'La Valijita', 'Voy, ven y vas.jpg'),
    ('Winnie y Wilbur - El caballero revoltoso', 'Valerie Thomas y Korky Paul', '-', 'Océano', 'Winnie y Wilbur - El caballero revoltoso.jpeg'),
    ('Winnie y Wilbur - El dragón de medianoche', 'Valerie Thomas y Korky Paul', '-', 'Océano', 'Winnie y Wilbur - EL dragón de medianoche.jpeg'),
    ('Winnie y Wilbur - El invierno', 'Valerie Thomas y Korky Paul', '-', 'Océano', 'Winnie y Wilbur - El invierno.jpeg'),
    ('Winnie y Wilbur - El misterio del monstruo', 'Valerie Thomas y Korky Paul', '-', 'Océano', 'Winnie y Wilbur - El misterio del monstruo.jpeg'),
    ('Yaci', 'Maríana Ruiz Johnson', '-', 'musarañita', 'yaci.png'),
    ('Zipo - El dragón', 'Cecilia Blanco', 'Cuentos fantásticos', 'La Valijita', 'Zipo, el dragon.jpg'),
    ('Zoo Loco', 'María Elene Walsh', '-', 'Alfaguara', 'zoo loco.jpg'),
    ('Zorro y medio', 'Gustavo Roldán', 'Cuentos del Pajarito Remendado', 'Colihue', 'Zorro y medio.jpg');

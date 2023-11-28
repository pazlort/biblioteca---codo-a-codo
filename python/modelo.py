# --------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify, render_template

# from flask import request

# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# No es necesario instalar, es parte del sistema standard de Python
import os
import time

# --------------------------------------------------------------------


app = Flask(__name__)
CORS(app)  # Esto habilitará CORS para todas las rutas


class DataBase:
    def __init__(self, host, user, password, database):
        self.database = database
        self.conn = mysql.connector.connect(host=host, user=user, password=password)
        self.cursor = self.conn.cursor()

    # crear base
    def create_db(
        self,
    ):
        try:
            self.cursor.execute(f"USE {self.database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {self.database}")
                self.conn.database = self.database
            else:
                raise err

    # crear tabla
    def crear_tabla(
        self,
    ):
        self.cursor.execute(
            """CREATE TABLE IF NOT EXISTS libros (
            id INT,
            titulo_libro VARCHAR(255) NOT NULL,
            titulo_libro VARCHAR(255) NOT NULL,
            editorial_libro VARCHAR(255) NOT NULL,
            coleccion VARCHAR(255),
            url_img VARCHAR(255) NOT NULL,
            """
        )
        self.conn.commit()
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)


class Crud(DataBase):
    def agregar_libro(
        self, id, titulo_libro, autor_libro, editorial_libro, coleccion, url_img
    ):
        self.cursor.execute(f"SELECT * FROM libros WHERE id = {id}")
        producto_existe = self.cursor.fetchone()
        if producto_existe:
            return False

        sql = "INSERT INTO libros (id, titulo_libro, autor_libro, editorial_libro, coleccion, url_img) VALUES (%s, %s, %s, %s, %s)"
        data = (id, titulo_libro, autor_libro, editorial_libro, coleccion, url_img)
        self.cursor.execute(sql, data)
        self.conn.commit()
        return True

    def consultar_libro(self, id):
        self.cursor.execute(f"SELECT * FROM libros WHERE id = {id}")
        return self.cursor.fetchone()

    def modificar_libro(
        self,
        id,
        nuevo_titulo_libro,
        nuevo_autor_libro,
        nuevo_editorial_libro,
        nuevo_coleccion,
        nuevo_url_img,
    ):
        sql = "UPDATE libros SET titulo_libro = %s, autor_libro = %s, editorial_libro = %s, coleccion =%s, url_img = %s WHERE id = %s"
        data = (
            nuevo_titulo_libro,
            nuevo_autor_libro,
            nuevo_editorial_libro,
            nuevo_coleccion,
            nuevo_url_img,
            id,
        )
        self.cursor.execute(sql, data)
        self.conn.commit()
        return self.cursor.rowcount > 0

    def listar_libro(self):
        self.cursor.execute("SELECT * FROM libros")
        return self.cursor.fetchall()

    def eliminar_libro(self, id):
        self.cursor.execute(f"DELETE FROM libros WHERE id = {id}")
        self.conn.commit()
        return self.cursor.rowcount > 0

    def mostrar_libro(self, id):
        libros = self.consultar_libro(id)
        if libros:
            print("-" * 40)
            print(f"id.....: {libros['id']}")
            print(f"titulo_libro: {libros['titulo_libro']}")
            print(f"autor_libro...: {libros['autor_libro']}")
            print(f"editorial_libro.....: {libros['editorial_libro']}")
            print(f"coleccion.....: {libros['coleccion']}")
            print(f"url_img.....: {libros['url_img']}")
            print("-" * 40)
        else:
            print("Libro no encontrado.")


crud = Crud(host="localhost", user="root", password="", database="miapp")
# catalogo = Catalogo(host='arielfsp.mysql.pythonanywhere-services.com', user='arielfsp', password='1234qw12', database='arielfsp$miapp')


crud.agregar_libro(
    3, "Mariposa con hipo", "Ana María Shua", "Buenas Noches", "Grupo Norma", "/img"
)


# Carpeta para guardar las imagenes.
RUTA_DESTINO = "./static/imagenes/"


# --------------------------------------------------------------------
@app.route("/libros", methods=["GET"])
def listar_libro():
    libros = crud.listar_libro()
    return jsonify(libros)


# --------------------------------------------------------------------
@app.route("/libros/<int:id>", methods=["GET"])
def mostrar_libro(id):
    libros = crud.consultar_libro(id)
    if libros:
        return jsonify(libros), 201
    else:
        return "Producto no encontrado", 404


# --------------------------------------------------------------------
@app.route("/libro", methods=["POST"])
def agregar_libro():
    # Recojo los datos del form
    id = request.form["id"]
    titulo_libro = request.form["titulo_libro"]
    autor_libro = request.form["autor_libro"]
    editorial_libro = request.form["editorial_libro"]
    coleccion = request.form["coleccion"]
    # imagen = request.files['imagen']
    url_img = ""

    # Me aseguro que el producto exista
    libro = crud.consultar_libro(id)
    # if not producto: # Si no existe el producto...
    #     # Genero el nombre de la imagen
    #     nombre_imagen = secure_filename(imagen.filename)
    #     nombre_base, extension = os.path.splitext(nombre_imagen)
    #     nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

    if crud.agregar_libro(
        id, titulo_libro, autor_libro, editorial_libro, coleccion, url_img
    ):
        # imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))
        return jsonify({"mensaje": "Producto agregado"}), 201
    else:
        return jsonify({"mensaje": "Producto ya existe"}), 400


# --------------------------------------------------------------------
@app.route("/libro/<int:id>", methods=["PUT"])
def modificar_libro(id):
    # Recojo los datos del form
    nuevo_titulo_libro = request.form.get("titulo_libro")
    nuevo_autor_libro = request.form.get("autor_libro")
    nuevo_editorial_libro = request.form.get("editorial_libro")
    nuevo_coleccion = request.form.get("coleccion")
    # imagen = request.files['imagen']
    url_img = ""

    # Procesamiento de la imagen
    # nombre_imagen = secure_filename(imagen.filename)
    # nombre_base, extension = os.path.splitext(nombre_imagen)
    # nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    # imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))

    # Busco el producto guardado
    # producto = producto = catalogo.consultar_producto(codigo)
    # if producto: # Si existe el producto...
    #     imagen_vieja = producto["imagen_url"]
    #     # Armo la ruta a la imagen
    #     ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)

    #     # Y si existe la borro.
    #     if os.path.exists(ruta_imagen):
    #         os.remove(ruta_imagen)

    if crud.modificar_libro(
        id,
        nuevo_titulo_libro,
        nuevo_autor_libro,
        nuevo_editorial_libro,
        nuevo_coleccion,
        nuevo_url_img,
    ):
        return jsonify({"mensaje": "Producto modificado"}), 200
    else:
        return jsonify({"mensaje": "Producto no encontrado"}), 403


# --------------------------------------------------------------------
@app.route("/libro/<int:id>", methods=["DELETE"])
def eliminar_libro(id):
    # Busco el producto guardado
    # producto = producto = catalogo.consultar_producto(codigo)
    # if producto: # Si existe el producto...
    #     imagen_vieja = producto["imagen_url"]
    #     # Armo la ruta a la imagen
    #     ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)

    #     # Y si existe la borro.
    #     if os.path.exists(ruta_imagen):
    #         os.remove(ruta_imagen)

    # Luego, elimina el producto del catálogo
    if crud.eliminar_libro(id):
        return jsonify({"mensaje": "Producto eliminado"}), 200
    else:
        return jsonify({"mensaje": "Error al eliminar el producto"}), 500


# --------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from modelo import Catalogo, Database

app = Flask(__name__)
CORS(app)
# db = Database(host="pazlort.mysql.pythonanywhere-services.com", user="pazlort", password="bookbuster", database="pazlort$bookbuster")
db = Database(host="localhost", user="root", password="", database="miapp")
catalogo = Catalogo(db)


@app.route("/catalogo_completo", methods=["GET"])
def catalogo_completo():
    catalogo_completo = catalogo.listar("libros")
    return jsonify(catalogo_completo), 201


@app.route("/catalogo_completo/<int:id_libro>", methods=["GET"])
def mostrar_libro(id_libro):
    libro = catalogo.ver(id_libro, "libros")
    if libro:
        return jsonify(libro), 201
    else:
        return "Libro no encontrado", 404


@app.route("/catalogo_completo", methods=["POST"])
def agregar_libro():
    titulo_libro = request.form["titulo_libro"]
    autor_libro = request.form["autor_libro"]
    coleccion_libro = request.form["coleccion_libro"]
    editorial_libro = request.form["editorial_libro"]
    url_img = request.form["url_img"]
    sql = "INSERT INTO libros (titulo_libro, autor_libro, coleccion_libro, editorial_libro, url_img) VALUES(%s, %s, %s, %s, %s)"
    if catalogo.agregar(
        sql, titulo_libro, autor_libro, coleccion_libro, editorial_libro, url_img
    ):
        return jsonify({"mensaje": "Libro agregado"}), 201
    else:
        return jsonify({"mensaje": "Libro ya existe"}), 400


@app.route("/catalogo_completo/<int:id_libro>", methods=["PUT"])
def modificar_libro(id_libro):
    data = request.form
    new_titulo_libro = data.get("titulo_libro")
    new_autor_libro = data.get("autor_libro")
    new_coleccion_libro = data.get("coleccion_libro")
    new_editorial_libro = data.get("editorial_libro")
    new_url_img = data.get("url_img")
    sql_edit = "UPDATE libros SET titulo_libro = %s, autor_libro = %s, coleccion_libro = %s, editorial_libro = %s, url_img = %s WHERE id_libro = %s"
    if catalogo.editar(
        sql_edit,
        new_titulo_libro,
        new_autor_libro,
        new_coleccion_libro,
        new_editorial_libro,
        new_url_img,
        id_libro,
    ):
        return jsonify({"mensaje": "Libro modificado"}), 200
    else:
        return jsonify({"mensaje": "Libro no encontrado"}), 404


@app.route("/catalogo_completo/<int:id_libro>", methods=["DELETE"])
def eliminar_libro(id_libro):
    libro = catalogo.ver(id_libro, "libros")
    if libro:
        if catalogo.borrar(id_libro, "libros"):
            return jsonify({"mensaje": "Libro eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el libro"}), 500
    else:
        return jsonify({"mensaje": "Libro no encontrado"}), 404

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import time
from modelo import Catalogo

app = Flask(__name__)
CORS(app)
catalogo = Catalogo()


@app.route("/catalogo_completo", methods=["GET"])
def catalogo_completo():
    catalogo_completo = catalogo.listar_libros()
    return jsonify(catalogo_completo), 201


@app.route("/catalogo_completo/<int:id_libro>", methods=["GET"])
def mostrar_libro(id_libro):
    libro = catalogo.ver_libro(id_libro)
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

    if catalogo.agregar_libro(
        titulo_libro, autor_libro, coleccion_libro, editorial_libro, url_img
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

    if catalogo.edit_libros(
        id_libro,
        new_titulo_libro,
        new_autor_libro,
        new_coleccion_libro,
        new_editorial_libro,
        new_url_img,
    ):
        return jsonify({"mensaje": "Libro modificado"}), 200
    else:
        return jsonify({"mensaje": "Libro no encontrado"}), 404


@app.route("/catalogo_completo/<int:id_libro>", methods=["DELETE"])
def eliminar_libro(id_libro):
    libro = catalogo.ver_libro(id_libro)
    if libro:
        if catalogo.borrar_libros(id_libro):
            return jsonify({"mensaje": "Libro eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el libro"}), 500
    else:
        return jsonify({"mensaje": "Libro no encontrado"}), 404

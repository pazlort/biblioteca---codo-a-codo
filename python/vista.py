from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from modelo import Crud, Database

app = Flask(__name__)
CORS(app, supports_credentials=True)
db = Database(
    host="pazlort.mysql.pythonanywhere-services.com",
    user="pazlort",
    password="bookbuster",
    database="pazlort$bookbuster",
)
crud = Crud(db)


#################################################
###                CATALOGO                   ###
#################################################
@app.route("/catalogo_completo/<string:objeto>/<string:orden>", methods=["GET"])
def catalogo_completo(objeto, orden):
    catalogo_completo = crud.ordenar("libros", objeto, orden)
    return jsonify(catalogo_completo), 201


@app.route("/catalogo_completo/<int:id_libro>", methods=["GET"])
def mostrar_libro(id_libro):
    libro = crud.ver(
        "libros",
        "id_libro",
        id_libro,
    )
    if libro:
        return jsonify(libro), 201
    else:
        return "Libro no encontrado", 404


#################################################
###                CATALOGO                   ###
#################################################

@app.route("/libro/<int:id_libro>", methods=["GET"])
def mostrar_libro_ind(id_libro):
    libro = crud.ver(
        "libros",
        "id_libro",
        id_libro,
    )
    if libro:
        return jsonify(libro), 201
    else:
        return "Libro no encontrado", 404


#################################################
###                USERS                      ###
#################################################


@app.route("/users", methods=["GET"])
def users():
    user_list = crud.listar("usuarios")
    return jsonify(user_list), 201
    #agregar le un if para que sino estas logueado te redirija a login


@app.route("/users/<int:id_user>", methods=["GET"])
def mostrar_user(id_user):
    user = crud.ver("usuarios", "id_user", id_user)
    if user:
        return jsonify(user), 201
    else:
        return "Usuario no encontrado", 404


@app.route("/users", methods=["POST"])
def agregar_user():
    nombre = request.form["nombre"]
    apellido = request.form["apellido"]
    usuario = request.form["usuario"]
    correo = request.form["correo"]
    password = request.form["password"]
    rol_id = request.form["rol_id"]
    sql = "INSERT INTO usuarios (email, username, pass_user, firstname, lastname, id_rol) VALUES(%s, %s, %s, %s, %s, %s)"
    if crud.agregar(sql, correo, usuario, password, nombre, apellido, rol_id):
        print("user agregado")
        return jsonify({"mensaje": "User agregado"}), 201
    else:
        return jsonify({"mensaje": "User ya existe"}), 400


@app.route("/users/<int:id_user>", methods=["PUT"])
def modificar_user(id_user):
    new_email = request.form["correo"]
    new_username = request.form["usuario"]
    new_pass_user = request.form["password"]
    new_firstname = request.form["nombre"]
    new_lastname = request.form["apellido"]
    new_id_rol = request.form["rol_id"]
    sql_edit = "UPDATE usuarios SET email = %s, username = %s, pass_user = %s, firstname = %s, lastname = %s, id_rol = %s WHERE id_user = %s"
    if crud.editar(
        sql_edit,
        new_email,
        new_username,
        new_pass_user,
        new_firstname,
        new_lastname,
        new_id_rol,
        id_user,
    ):
        return jsonify({"mensaje": "User modificado"}), 200
    else:
        return jsonify({"mensaje": "User no encontrado"}), 404


@app.route("/users/<int:id_user>", methods=["DELETE"])
def eliminar_user(id_user):
    user = crud.ver("usuarios", "id_user", id_user)
    if user:
        if crud.borrar("usuarios", "id_user", id_user):
            return jsonify({"mensaje": "User eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el user"}), 500
    else:
        return jsonify({"mensaje": "User no encontrado"}), 404

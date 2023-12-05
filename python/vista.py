from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from modelo import Crud, Database

app = Flask(__name__)
CORS(app)
db = Database(
    host="pazlort.mysql.pythonanywhere-services.com",
    user="pazlort",
    password="bookbuster",
    database="pazlort$bookbuster",
)
crud = Crud(db)


#################################################
###                LIBROS                     ###
#################################################
@app.route("/catalogo_completo", methods=["GET"])
def catalogo_completo():
    catalogo_completo = crud.listar("libros")
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
###                USERS                      ###
#################################################


@app.route("/users", methods=["GET"])
def users():
    user_list = crud.listar("usuarios")
    return jsonify(user_list), 201


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
    print(nombre, apellido, usuario, password, correo, rol_id)
    sql = "INSERT INTO usuarios (email, username, pass_user, firstname, lastname, id_rol) VALUES(%s, %s, %s, %s, %s, %s)"
    if crud.agregar(sql, correo, usuario, password, nombre, apellido, rol_id):
        print("user agregado")
        return jsonify({"mensaje": "User agregado"}), 201
    else:
        return jsonify({"mensaje": "User ya existe"}), 400


@app.route("/users/<int:id_user>", methods=["PUT"])
def modificar_user(id_user):
    data = request.form
    new_titulo_libro = data.get("titulo_libro")
    new_autor_libro = data.get("autor_libro")
    new_coleccion_libro = data.get("coleccion_libro")
    new_editorial_libro = data.get("editorial_libro")
    new_url_img = data.get("url_img")
    sql_edit = "UPDATE libros SET titulo_libro = %s, autor_libro = %s, coleccion_libro = %s, editorial_libro = %s, url_img = %s WHERE id_libro = %s"
    if crud.editar(
        sql_edit,
        new_titulo_libro,
        new_autor_libro,
        new_coleccion_libro,
        new_editorial_libro,
        new_url_img,
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


#################################################
###                ROLES                      ###
#################################################


@app.route("/roles", methods=["GET"])
def roles():
    roles_list = crud.listar("roles")
    return jsonify(roles_list), 201


@app.route("/roles/<int:id_rol>", methods=["GET"])
def mostrar_rol(id_rol):
    rol = crud.ver(id_rol, "roles")
    if rol:
        return jsonify(rol), 201
    else:
        return "Usuario no encontrado", 404

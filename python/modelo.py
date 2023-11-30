import mysql.connector


class Database:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host, user=user, password=password, database=database, port=3307
        )
        self.cursor = self.conn.cursor(dictionary=True)
        sql_libros = """CREATE TABLE IF NOT EXISTS libros (
            id_libro INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            titulo_libro VARCHAR(100) NOT NULL,
            autor_libro VARCHAR(100) NOT NULL,
            coleccion_libro VARCHAR(100) NOT NULL,
            editorial_libro VARCHAR(50) NOT NULL,
            url_img VARCHAR(100) NOT NULL)"""
        self.crear_tabla(sql_libros)

    def crear_tabla(self, sql):
        self.cursor.execute(sql)
        self.conn.commit()


class Catalogo:
    libros = []

    def agregar_libro(
        self,
        titulo_libro,
        autor_libro,
        coleccion_libro,
        editorial_libro,
        url_img,
    ):
        sql = "INSERT INTO libros (titulo_libro, autor_libro, coleccion_libro, editorial_libro, url_img) VALUES(%s, %s, %s, %s, %s)"
        data = (
            titulo_libro,
            autor_libro,
            coleccion_libro,
            editorial_libro,
            url_img,
        )
        db.cursor.execute(sql, data)
        db.conn.commit()
        return True

    def listar_libros(self):
        db.cursor.execute("SELECT * FROM libros")
        productos = db.cursor.fetchall()
        return productos

    def ver_libro(self, id_libro):
        db.cursor.execute(f"SELECT * FROM libros WHERE id_libro = {id_libro}")
        resq = db.cursor.fetchone()
        if resq:
            return resq
        else:
            return False

    def borrar_libros(self, id_libro):
        db.cursor.execute(f"DELETE FROM libros WHERE id_libro = {id_libro}")
        db.conn.commit()
        return db.cursor.rowcount > 0

    def edit_libros(
        self,
        id_libro,
        new_titulo_libro,
        new_autor_libro,
        new_coleccion_libro,
        new_editorial_libro,
        new_url_img,
    ):
        sql = "UPDATE libros SET titulo_libro = %s, autor_libro = %s, coleccion_libro = %s, editorial_libro = %s, url_img = %s WHERE id_libro = %s"
        data = (
            new_titulo_libro,
            new_autor_libro,
            new_coleccion_libro,
            new_editorial_libro,
            new_url_img,
            id_libro,
        )
        db.cursor.execute(sql, data)
        db.conn.commit()
        return db.cursor.rowcount > 0


db = Database(host="localhost", user="root", password="", database="miapp")

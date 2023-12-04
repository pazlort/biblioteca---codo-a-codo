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
        sql_roles = """CREATE TABLE IF NOT EXISTS roles (
            id_rol INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL)"""
        sql_user = """CREATE TABLE IF NOT EXISTS usuarios (
            id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            username VARCHAR(50) NOT NULL,
            pass_user VARCHAR(100) NOT NULL,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            id_rol TINYINT(1))"""
        sql_prestamo = """CREATE TABLE IF NOT EXISTS prestamos (
            id_prestamo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            id_user INT NOT NULL,
            id_libro INT NOT NULL,
            fecha_desde DATETIME NOT NULL,
            fecha_hasta INT NOT NULL,
            observaciones VARCHAR(255),
            FOREIGN KEY (id_user) REFERENCES prestamos(id_prestamo))"""
        self.crear_tabla(sql_libros)
        self.crear_tabla(sql_user)
        self.crear_tabla(sql_roles)
        self.crear_tabla(sql_prestamo)

    def crear_tabla(self, sql):
        self.cursor.execute(sql)
        self.conn.commit()


class Crud:
    def __init__(self, db):
        self.db = db

    def agregar(self, sql, *data):
        print("sql", sql)
        print("sql0", sql[0])
        print("data", data)
        self.db.cursor.execute(sql, data)
        self.db.conn.commit()
        return True

    def listar(self, table_db):
        self.db.cursor.execute(f"SELECT * FROM {table_db}")
        elemento = self.db.cursor.fetchall()
        return elemento

    def ver(self, id_libro, table_db):
        self.db.cursor.execute(f"SELECT * FROM {table_db} WHERE id_libro = {id_libro}")
        resq = self.db.cursor.fetchone()
        if resq:
            return resq
        else:
            return False

    def borrar(self, id_libro, table_db):
        self.db.cursor.execute(f"DELETE FROM {table_db} WHERE id_libro = {id_libro}")
        self.db.conn.commit()
        return self.db.cursor.rowcount > 0

    def editar(
        self,
        sql,
        *data,
    ):
        self.db.cursor.execute(sql, data)
        self.db.conn.commit()
        return self.db.cursor.rowcount > 0

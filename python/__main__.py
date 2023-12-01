from modelo import Catalogo
from modelo import Database
from vista import app

if __name__ == "__main__":
    # db = Database(host="pazlort.mysql.pythonanywhere-services.com", user="pazlort", password="bookbuster", database="pazlort$bookbuster")
    db = Database(host="localhost", user="root", password="", database="miapp")
    Catalogo(db)
    app.run(debug=True)


# PARA CONTINUAR
#    *poner control de errores
#    *Database host address:pazlort.mysql.pythonanywhere-services.com
#    *Username:pazlort
#    *db = Database(host="pazlort.mysql.pythonanywhere-services.com", user="pazlort", password="bookbuster", database="pazlort$bookbuster")

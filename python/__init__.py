from modelo import Crud
from modelo import Database
from vista import app


if __name__ == "__main__":
    db = Database(
        host="http://pazlort.mysql.pythonanywhere-services.com",
        user="pazlort",
        password="bookbuster",
        database="pazlort$bookbuster",
    )
    Crud(db)
    app.run(debug=True)


# PARA CONTINUAR
#    *poner control de errores
#    *ver validacion de forms
#    *Database host address:pazlort.mysql.pythonanywhere-services.com
#    *Username:pazlort
#    *db = Database(host="pazlort.mysql.pythonanywhere-services.com", user="pazlort", password="bookbuster", database="pazlort$bookbuster")

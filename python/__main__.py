from modelo import Catalogo
from modelo import Database
from vista import app

if __name__ == "__main__":
    db = Database(host="pazlort.mysql.pythonanywhere-services.com", user="pazlort", password="bookbuster", database="pazlort$bookbuster")
    Catalogo(db)
    app.run(debug=True)

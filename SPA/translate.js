
let translationWords = {
    "Products": "Produse",
    "Date": "Data",
    "Login": "Logheaza-te",
    "Cart": "Cos de Cumparaturi",
    "Change Language": "Schimba Limba",
    "Logout": "Delogheaza-te",
    "Orders": "Comenzi",
    "Add Product": "Adauga Produs",
    "Price": "Pret",
    "Add": "Adauga",
    "Please enter your username and password!": "Introdu utilizatorul si parola!",
    "Username": "Utilizatorul",
    "Password": "Parola",
    "Remove": "Elimina",
    "Edit": "Editeaza",
    "Name": "Nume",
    "Email": "Email",
    "Comments and details": "Comentarii si detalii",
    "Checkout": "Plaseaza Comanda",
    "No products in cart!": "Nu sunt produse in cos!",
    "No products in shop!": "Nu sunt produse in magazin!",
    "Order": "Comanda",
    "Payment": "Plata",
    "Go to Order": "Mergi la comanda",
    "Title of Product": "Titlul Produsului",
    "Description": "Descriere",
    "Input your image": "Selecteaza imaginea",
    "Wrong credentials!": "Credentiale gresite!",
    "Product Title": "Titlu produs",
    "Product Description": "Descriere Produs",
    "Product Price": "Pret Produs",
    "Print": "Printeaza",
    "Total": "Total",
    "Delete": "Sterge",
    "Please provide the correct input!": "Te rugam sa introduci input-ul corect!",
    "Wrong Credentials!": "Credentiale gresite!",
    "Shop":"Magazin"
}

function translate(word) {
    if (word in translationWords) {
        return translationWords[word];
    } else {
        return word;
    }
}
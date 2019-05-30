const fs = require('fs'); //importamos fileSystem


//obtenemos los valores de la primera fila que en este caso seran nuestras keys
function headbord() {
    let doc = fs.readFileSync('./file/mentorsList.csv', 'utf8');
    doc = doc.split("\n");
    doc = doc.shift()
    doc = doc.split(",");
    let [name, course] = doc;
    return { name, course };
}

//Escribimos el archivo y responde con esxito 
function writeJson(data) {
    fs.writeFileSync('./file/mentoresbyMap.json', data);
    return {
        status: 200,
        massage: "escritura correcta"
    };
}

//funcion principal
function CreatJson() {

    let jsonDoc = []; //variable donde se almacenara el JSON resultane
    let doc = fs.readFileSync('./file/mentorsList.csv', 'utf8'); //lee el archivo
    doc = doc.split("\n"); //separamos elementos por un salto de linea
    doc.shift(); //elimina la primera fila
    //por cada elemento se guardara en jsoDoc
    jsonDoc = doc.map(elem => {
        let head = headbord(); //obtenemos las cabeceras
        let { name, course } = head; //las guardamos en cada variable que seran las key
        elem = elem.split(','); //cada fila, separamos sus elementos
        let [mentorName, courseName] = elem; //el contenido de cada elemento lo guardamos en cada variable
        let obj = {}; //constuyo un objeto para poder utilizar las variables como Key
        obj[name] = mentorName; //se le asigna el valor a cada key								
        obj[course] = courseName;
        return obj; //retorna el objeto contruido
    });
    let json = { "mentors": jsonDoc } //al obeto se le asigna una llave
    json = JSON.stringify(json, null, 2); //convetir el objeto a formato JSON con identacion de 2 espacios
    let res = writeJson(json); //llama la funcion para guardar nuestra informacion en un .json y espera la respuesta
    if (res.status === 200) console.log(res.massage); //si es exitoso imprime el mensaje
    else console.log("error en la escritura"); //si hay un error muestra mensaje de error
}


function main() {
    CreatJson();
}



main();
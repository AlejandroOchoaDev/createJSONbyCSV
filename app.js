const fs = require('fs'); //modulo fileSystem

let jsonDoc = []; //variable donde se almacenara el JSON resultane
let doc = fs.readFileSync('./file/mentorsList.csv', 'utf8'); //lee el archivo
doc = doc.split("\n"); //separar los mentores
doc.shift(); //eliminar la primera fila


//utilizar map--observacion
//por cada fila se itera para crear el json
doc.forEach(elem => {
    elem = elem.split(',') //separamos el nombre, del curso
    let [mentorName, courseName] = elem //sugerencia de charls--observacion
    let obj = { "name": elem[0], "course": elem[1] } //estructura del json se le asignan valores
        //keys desde el archivo--observacion
    jsonDoc.push(obj); //agregan al json resultante
});


let json = { "mentors": jsonDoc } //asigna la key principal
json = JSON.stringify(json, '\n'); //convertimos a formato json
fs.writeFileSync('./file/mentoresbyforeach.json', json); //se guarda el archivo
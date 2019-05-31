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

    let jsonDoc = [];
    let doc = fs.readFileSync('./file/mentorsList.csv', 'utf8');
    doc = doc.split("\n");
    doc.shift();
    jsonDoc = doc.map(elem => {
        let head = headbord();
        let { name, course } = head;
        elem = elem.split(',');
        let [mentorName, courseName] = elem;
        return {
            [name]: mentorName,
            [course]: courseName
        }
    });
    let json = { "mentors": jsonDoc }
    json = JSON.stringify(json, null, 2);
    let res = writeJson(json);
    if (res.status === 200) console.log(res.massage);
    else console.log("error en la escritura");
}


function main() {
    CreatJson();
}



main();
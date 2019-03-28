const fs = require('fs');

let listadoPorHacer = [];

const guardarBD = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('Error al guardar::: ', err)
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarBD();
    return porHacer;

}

const getListado = () => {
    try {
        listadoPorHacer = require('../db/data.json');
        return listadoPorHacer;
    } catch {
        listadoPorHacer = [];
        return listadoPorHacer;
    }
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarBD();
        return true;
    } else {
        return false;
    }

}

const getBorrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        delete listadoPorHacer[index]; // no funciono, ocupar el filter es mejor
        guardarBD();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    guardarBD,
    getListado,
    actualizar,
    getBorrar
}
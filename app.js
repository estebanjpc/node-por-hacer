const argv = require('./config/yargs').argv;
var colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log('Crear Hacer::::: ', tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('========== Por Hacer =========='.green);
            console.log(`Descripcion: ${tarea.descripcion}`);
            console.log(`Estado     : ${tarea.completado}`);
            console.log('==============================='.green);
        }
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado)
        console.log(`La actualizacion resulto: ${actualizado}`);
        break;
    case 'borrar':
        let borrado = porHacer.getBorrar(argv.descripcion);
        console.log(`Se borro: ${borrado}`);
        break;
    default:
        console.log('Comando no reconocido');
}
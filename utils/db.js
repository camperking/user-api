const loki = require('lokijs');
const { dbCollections, dbFile, saveInterval } = require('../conf/config');


let db;
const collections = {};
exports.collections = collections;

exports.dbInit = () => {
    return new Promise(resolve => {
        db = new loki(dbFile, {
            autoload: true,
            autoloadCallback: () => {
                checkCollections(dbCollections);
                resolve();
            },
            autosave: true,
            autosaveInterval: saveInterval
        });
    });
}

function checkCollections(dbCollections) {
    dbCollections.forEach(element => {
        const collection = element.collection;
        const unique = element.unique;

        collections[collection] = db.getCollection(collection);

        if (collections[collection] === null) {
            collections[collection] = db.addCollection(collection, { unique });
        }
    });
}
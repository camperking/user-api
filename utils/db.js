const loki = require('lokijs');
const { dbCollections, saveInterval } = require('../conf/config');
let { dbFile } = require('../conf/config');
const { LokiFsAdapter, LokiMemoryAdapter } = require('lokijs');


let db;
const collections = {};

let adapter = new LokiFsAdapter();
function dbInit() {
    return new Promise(resolve => {
        if (process.env.NODE_ENV === 'testing') {
            dbFile = 'test.db';
            adapter = new LokiMemoryAdapter();
        }
        
        db = new loki(dbFile, {
            adapter: adapter,
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

exports.dbTestReset = async () => {
    await db.close();

    await db.deleteDatabase(dbFile);
}

exports.collections = collections;

exports.dbInit = dbInit;
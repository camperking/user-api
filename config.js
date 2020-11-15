// Server
exports.PORT = 3000;

// Database
exports.dbCollections = [
    {
        collection: 'users',
        unique: 'name'
    }
];
exports.dbFile = 'users.db';
exports.saveInterval = 10000;   // 10 seconds autosave
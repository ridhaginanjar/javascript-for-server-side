const { addNoteHandler, 
    getAllNotesHandler,
    getNotesByidHandler,
    editNoteByidHandler,
    deleteNoteByidHandler } = require('./handler.js');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesByidHandler
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByidHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByidHandler
    }
];

module.exports = routes;
const { nanoid } = require('nanoid');
const notes = require('./notes.js');

const addNoteHandler = (request, h) => {
    const { title,tags,body } = request.payload; //"tags" not "tag"
    const id = nanoid(16);
    const createdAt = new Date().toISOString(); //".toISOString()" not ".toISOString"
    const updatedAt = createdAt;

    const newNote = {
        title,tags,body,id,createdAt,updatedAt //"tags" not "tag"
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId:id
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'Fail',
        message: 'Catatan gagal ditambahkan',
        data: {
            noteId:id
        }
    });
    response.code(500);
    return response;    
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes
    },
    //You don't have to include response.code(); because it's for show the data and not create data
    // And return, because it's already return. Sedangkan yang fungsi getNotesByidHandler menggunakan if (kondisi) sehingga perlu return
});

const getNotesByidHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((note) => note.id === id)[0]; //Get Notes by ID

    if(note != undefined) {
        const response = h.response({
            status: 'Success',
            data: {
                note //Disini gunakan "note" bukan "notes" karena sudah di filter by id
            }
        });
        //You don't have to include response.code(); because it's for show the data and not create data
        return response; //Always return in "Handler"
    }
    const response = h.response({
        status: 'Fail',
        message: 'Catatan Not Found',
    });
    response.code(404);
    return response;
};

const editNoteByidHandler = (request, h) => {
    const { id } = request.params;
    const { title,tags,body } = request.payload;

    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };
        const response = h.response({
            status: 'success',
            message: 'Catatan has been added',
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: "Catatan fail to added"
    });
    response.code(404);
    return response
};

const deleteNoteByidHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index,1);

        const response = h.response({
            status: 'success',
            message: 'Catatan has been deleted'
        })
        response.code(200);
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal dihapus. Id not found'
    })
    response.code(404);
    return response
};

module.exports = { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNotesByidHandler,
    editNoteByidHandler,
    deleteNoteByidHandler
};
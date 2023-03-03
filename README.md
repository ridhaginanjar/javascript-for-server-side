# RESTful-API
This project is documentation for the implementation of Nodejs as Server-side development, Create RESTful-API. 

# Requirement
- Hapi Framework
- Nodemon for auto run server --DevDependencies
- nanoid for unique id

# Course Note 
## Step 1: add Note (POST)
- [server.js](server.js):
    - This file will create server
    - CORS (Cross-Origin Resource Sharing) will set in here
    - Need variable called routes from [routes.js](routes.js)
- [routes.js](routes.js):
    - This file will create routes that needed for [server.js](server.js)
    - Need variable called addNoteHandler from [handler.js](handler.js)
- [handler.js](handler.js):
    - This file will store all of handler (A handler is a function that is called whenever a specific route is requested. It is **responsible for handling the request and returning a response.**)
    - All of handler in this file will be export to [routes.js](routes.js)
    - Need variable called notes from [notes.js](note.js) because it's for save notes
- [note.js](notes.js):
    - This file will store all of notes that has been added
> **Same-Origin Policy**: is security measure that web browsers use to prevent scripts or content from one website or domain
> from accessing or interacting with content from another website or domain. 

This means that, by default, web pages can only access resources (like images, scripts,**port**, or other content) that originate from the same domain or website. If a website tries to access resources from a different domain, the browser will block it and display an error message.

```
response.header('Access-Control-Allow-Origin', '*');
```

## Step 2: Show Notes (GET)
In this step, i also find some problem from previous step.
I have resolved this problem and the comment with **//** in handler.js is debug code
- [routes.js](routes.js):
    - Add GET method
    - add path to /notes and /notes/{id}
    - add handler getAllNotesHandler and getNotesByidHandler
- [handler.js](handler.js):
    - create getAllNotesHandler to get all notes data.
    this just return data: {notes} with status: "success".
    - create getNotesByidHandler to get notes by id. 
    It will return spesific notes, so i use filter method to filter notes by id.

There is another method to show data. In this step i just set:

```
data: {
    notes
},
```

But, you can use .map to iterate and select some spesific data:

```
const getAllNotesHandler = (request,h) => {
    const response = h.response({
        status: 'success',
        data: {
            notes: notes.map(({ id, title, tags, body, createdAt, updatedAt }) => ({
                id,
                title,
                tags,
                body,
                createdAt,
                updatedAt,
            })),
        },
    });
    response.code(200);
    return response;
};

```

## Step 3: Edit Note (PUT)
In this step, we will edit spesific note that filtered by id. 
- [routes.js](routes.js):
    - add PUT method
    - add path to /notes/{id}
    - add handler editNoteByidHandler
- [handler.js](handler.js):
    - create editNoteByidHandler to edit note by id.
    First find id,title,tag,body by request.params/request.payload.

    Find index, if index is -1 then it's fail and index != -1 is success.

## Step 4: Delete Note (DELETE)
In this step, we will delete spesific note.
- [routes.js](routes.js):
    - add DELETE method
    - add path to /notes/{id}
    - add handler deleteNoteByidHandler
- [handler.js](handler.js):
    - create deleteNoteByidHandler to delete note by id
    First find id and use :

    ```
    notes.splice(index,1)
    ```
    The code above means that we delete notes in "index", 1 items.

# Note for all Step
Don't forget to create response because we need alert that our action 
is success or fail.

# Automation Testing with POSTMAN
In this step, we will try to make API with POSTMAN and also doing automation testing.

## POSTMAN Collection
Collection in Postman is a group of API requests that are organized together for easier management and testing.

Collections in Postman allow you to group together a set of API requests that are related to a specific API or project. For example, you might create a collection called "My API" that contains all of the API requests for a particular API that you are developing or testing.

Here is the step of how to create collection:

1. Create Collection

![Create Collection](postman-images/create_collection.png)

Here, you can select "Create a new Collection" OR "+" button on the top left (near of Collections button)

2. Rename Collection

![Rename Collection](postman-images/rename_collection.png)

Right click on collection name and click Rename

Here is the example of API Requests :

![Example request](postman-images/example_request.png)

Based on that request, here is the response.

![Example response](postman-images/example_response.png)


## POSTMAN Environment
Environment in POSTMAN is a set of key-value pairs that allows you to manage variables used in your API requests and tests.

An environment in Postman is like a container for a set of variables. You can create an environment for each of your APIs or projects, and use it to store variables that are specific to that API or project. Variables can be things like API keys, tokens, URLs, or any other values that you need to use in your requests.

Here is the step of how to create Environment:

1. Create Environment

![Create Environment](postman-images/create_environment.png)

Click "Environments" Button and click "Create a new Environment"

2. Rename Environment

![Rename Environment](postman-images/rename_environment.png)

Write your own name of Environment

3. Example Environment

![Example Environment](postman-images/example_environment.png)

Here is example of environment, in here we use "noteId" and we let it's null because we will 
initiate it later after we "PUT" some data. So, it's not manually but automatically later

4. Choose Environment
In here, it's mean that which **collection** that we used to implement **this environment**.

![Chose Environment](postman-images/chose_environment.png)

Click the dropdown on the top of the right Environment table, and Click Save.

## Automation Testing Scenario

This automation is used for create automatic testing. The purpose is our API's are match with the requirements.

1. Add notes Scenario
Here is the list of scenario testing:
- Pastikan response memiliki status code 201.
- Pastikan header response Content-Type memiliki nilai application/json.
- Pastikan body response adalah object.
- Pastikan body response memiliki properti dan nilai yang sesuai.
- Pastikan data pada response body memiliki noteId dan nilainya tidak kosong.

Find more about the command in [adding-notes-scenario.js](postman-command-automation/adding-notes-scenario.js)

**NOTE:** This Automation is very tough, so that's why in the code I specify :

```
pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
```

NOT, **application/json**

2. Getting All Notes
The scenario:
- Pastikan response memiliki status code 200.
- Pastikan header response Content-Type memiliki nilai application/json.
- Pastikan body response adalah object.
- Pastikan body response memiliki properti dan nilai atau tipe data yang sesuai.
- Pastikan data pada response body memiliki array notes dan terdapat minimal 1 item di dalamnya.

Find more about the command in [getall-notes-scenario.js](postman-command-automation/getall-notes-scenario.js)

3. Get Specified Notes
The scenario:
- Pastikan response memiliki status code 200.
- Pastikan header response Content-Type memiliki nilai application/json.
- Pastikan body response merupakan object.
- Pastikan body response memiliki properti dan nilai atau tipe data yang sesuai.
- Pastikan data pada response body memiliki properti note yang merupakan sebuah objek.
- Pastikan objek note di dalam data memiliki properti id, title, body, dan tags dengan nilai yang sesuai.

Find more about the command in [getting-specified-notes-scenario.js](postman-command-automation/getting-specified-notes-scenario.js)

4. Update Specified Note
The Scenario:
- Pastikan response memiliki status code 200.
- Pastikan header response Content-Type memiliki nilai application/json.
- Pastikan body response adalah object.
- Pastikan body response memiliki properti dan nilai yang sesuai.
- Ketika mengakses catatan yang diperbaharui, pastikan catatan yang diperbarui memiliki nilai terbaru.

Find more about the command in [update-specified-notes-scenario.js](postman-command-automation/update-specified-notes-scenario.js)

5. Delete Specified Note
The scenario:
- Pastikan response memiliki status code 200.
- Pastikan header response Content-Type memiliki nilai application/json.
- Pastikan body response adalah object.
- Pastikan body response memiliki properti dan nilai yang sesuai.
    - Ketika mengakses catatan yang dihapus, pastikan catatan yang dihapus tidak ditemukan.

Find more about the command in [delete-specified-notes-scenario.js](postman-command-automation/delete-specified-notes-scenario.js)

# Full Course :
- [Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud](https://www.dicoding.com/academies/342)
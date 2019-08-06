const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes...'

// function to add a note to the notes array 
const addNote = (title, body) => {
    // load in any existing notes to not override what is currently in our notes
    const notes = loadNotes();
    // pushing new note to the notes array if not a duplicate
    const duplicateNote = notes.find((note => note.title === title))
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'))            
    } else {
        console.log(chalk.red.inverse('Note title is already taken.'));
    }
}

// if a note meets the standards to be saved, we stringify the json coming in and write the json object to notes.json
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}

// fucntion to load in existing notes into notes.json
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

// fucntion to remove a note
const removeNote = (title) => {
    // load in all existing notes available
    const notes = loadNotes();
    // fucntion to filter our notes for the title used in the argument 
    const existingNotes = notes.filter((note) => note.title !== title)
    saveNotes(existingNotes);
    
    if (notes.length > existingNotes.length) {
        console.log(chalk.green.inverse(`A note with the title of ${title} has been removed.`));
        saveNotes(existingNotes);
    } else {
        console.log(chalk.red.inverse("This note does not exist."))
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Here are your notes'));

    // loop through all notes and display the note title and body
    notes.forEach(note => {
        console.log('The title of this note is:', note.title);
        console.log('The body of this note is:', note.body);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    console.log('Checking your notes...');

    const note = notes.find((note => note.title === title))
    if(note) {
        console.log(chalk.yellow.inverse('Found your note! The title is ', note.title));
        console.log('The body is', note.body);
    } else {
        console.log(chalk.red.inverse('Note does not exist'));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}

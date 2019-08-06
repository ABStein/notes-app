const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// customize yargs verison
yargs.version('1.1.0');

// create add command 
yargs.command({
    command: 'add', 
    describe: 'Adding a new note',
    builder: {
        title: {
            descibe: 'Note title',
            demandOption: true, 
            type: 'string'
        },
        body: {
            descibe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body) 
})

// create remove command
yargs.command({
    command: 'remove',
    descibe: 'Removing a note',
    builder: {
        title: {
            descibe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler: (argv) => notes.removeNote(argv.title)
})

// create list command
yargs.command({
    command: 'list',
    descibe: 'Listing your notes',
    handler() {
        notes.listNotes();
    }
})

// create read command
yargs.command({
    command: 'read',
    descibe: 'Reading a note',
    builder: {
        title: {
            descibe: 'Note title',
            demandOption: true, 
            type: 'string'
        }
    },
    handler: (argv) => notes.readNote(argv.title)
})

yargs.parse();


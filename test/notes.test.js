const notes = require('../notes.js');

describe('Testing notes functions', () => {
    const sandbox = sinon.createSandbox();
    // let notesMock;

    beforeEach(() => {
        // notesMock = sandbox.mock(notes);
    });

    afterEach(() => {
        sinon.restore();
        sandbox.restore();
    });

    it('should get notes',() => {
        const getNotesSpy = sinon.spy(notes.getNotes);
        const response = 'Your notes...';
        
        console.log(notes.getNotes());
        expect(getNotesSpy.returned(response));
    });

    // it('should add a note', () => {
    //     const addNotesSpy = sinon.spy(notes.addNote)
    //     const 
    // });
})

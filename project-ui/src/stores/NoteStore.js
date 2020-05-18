import {EventEmitter} from 'fbemitter'

const SERVER = 'http://18.220.130.149:8080';

class NoteStore{
    constructor(){
        this.notes = []
        this.emitter = new EventEmitter()
    }
    async getNotes(userId){
        try{
            let response = await fetch(`${SERVER}/users/${userId}/notes`)
            let data = await response.json()
            this.notes = data
            this.emitter.emit('GET_NOTES_SUCCESS')
        }catch(err){
            console.warn(err)
            this.emitter.emit('GET_NOTES_ERROR')
        }
    }
    
    async getNotesWithTag(userId, tag){
        try{
            let response = await fetch(`${SERVER}/users/${userId}/notes/${tag}`)
            let data = await response.json()
            this.notes = data
            this.emitter.emit('GET_NOTES_SUCCESS')
        }catch(err){
            console.warn(err)
            this.emitter.emit('GET_NOTES_ERROR')
        }
    }
    
    async addNote(userId, note){
        try{
            await fetch(`${SERVER}/users/${userId}/notes`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(note)
            })
            this.getNotes(userId)
        }catch(err){
             console.warn(err)
             this.emitter.emit('ADD_NOTES_ERROR')
        }
    }
    
    async shareNote(noteId, userId){
        let req ={
            noteId: noteId,
            userId: userId
        }
        try{
            await fetch(`${SERVER}/usernote`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(req)
            })
        }catch(err){
             console.warn(err)
        }
    }
    
    async shareNoteToGroup(noteId, groupId){
        try{
            await fetch(`${SERVER}/groupnote/${groupId}/${noteId}`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
        }catch(err){
             console.warn(err)
        }
    }
    
    async deleteNote(userId, noteId){
        try{
            await fetch(`${SERVER}/users/${userId}/notes/${noteId}`, {
                method : 'delete'
            })
            this.getNotes(userId)
        }catch(err){
            console.warn(err)
            this.emitter.emit('DELETE_NOTE_ERROR')
        }
    }

    async saveNote(userId, noteId, note){
        try{
            await fetch(`${SERVER}/users/${userId}/notes/${noteId}`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json'  
                }, 
                body : JSON.stringify(note)
            })
            this.getNotes(userId)
        }catch(err){
            console.warn(err)
            this.emitter.emit('SAVE_NOTE_ERROR')
        }
    }
}

export default NoteStore
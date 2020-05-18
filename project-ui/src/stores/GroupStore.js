import {EventEmitter} from 'fbemitter'

const SERVER = 'http://18.220.130.149:8080';

class GroupStore{
    constructor(){
        this.groups = []
        this.notes = []
        this.emitter = new EventEmitter()
    }
    
    async getGroups(userId){
        try{
            let response = await fetch(`${SERVER}/user/${userId}/groups`)
            let data = await response.json()
            this.groups = data
            this.emitter.emit('GET_GROUPS_SUCCESS')
        }catch(err){
            console.warn(err)
            this.emitter.emit('GET_GROUPS_ERROR')
        }
    }
    
     async getNotesForGroup(groupId){
        try{
            let response = await fetch(`${SERVER}/group/${groupId}/notes`)
            let data = await response.json()
            this.notes = data
            this.emitter.emit('GET_NOTES_SUCCESS')
        }catch(err){
            console.warn(err)
            this.emitter.emit('GET_NOTES_ERROR')
        }
    }
    
    async addGroup(userId, group){
        try{
            await fetch(`${SERVER}/user/${userId}/group`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(group)
            })
            this.getGroups(userId)
        }catch(err){
             console.warn(err)
             this.emitter.emit('ADD_GROUP_ERROR')
        }
    }
    
    async addUserToGroup(userId, groupId){
        try{
            await fetch(`${SERVER}/groupsubscription/${userId}/${groupId}`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
        }catch(err){
             console.warn(err)
        }
    }
    
    async deleteGroup(userId, groupId){
        try{
            await fetch(`${SERVER}/user/${userId}/groups/${groupId}`, {
                method : 'delete'
            })
            this.getGroups(userId)
        }catch(err){
            console.warn(err)
            this.emitter.emit('DELETE_GROUP_ERROR')
        }
    }

}

export default GroupStore
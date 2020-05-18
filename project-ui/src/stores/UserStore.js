import {EventEmitter} from 'fbemitter'
const SERVER = 'http://18.220.130.149:8080'

class UserStore{
    constructor(){
        this.users = []
        this.emitter = new EventEmitter()
    }

    async getAll(){
        try{
            let response = await fetch(`${SERVER}/users`)
            let data = await response.json()
            this.users = data
            this.emitter.emit('GET_USERS_SUCCESS')
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('GET_USERS_ERROR')
        }
    }
    
     async getOne(userId){
        try{
            let response = await fetch(`${SERVER}/users/${userId}`)
            let data = await response.json()
            this.users = data
            this.emitter.emit('GET_USERS_SUCCESS')
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('GET_USERS_ERROR')
        }
    }
    
    async addOne(user){
        try{
            await fetch(`${SERVER}/register`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)           
            })
            this.getAll() 
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('ADD_USER_ERROR')
        }
    } 
    async deleteOne(id){
        try{
            await fetch(`${SERVER}/users/${id}`, {
                method : 'delete',
            })
            this.getAll() 
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('DELETE_USER_ERROR')
        }
    }
    async saveOne(id, user){
        try{
            await fetch(`${SERVER}/users/${id}`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)           
            })
            this.getAll() 
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('SAVE_USER_ERROR')
        }
    }
    
}

export default UserStore
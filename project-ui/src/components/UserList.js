import React from 'react';
import {Component} from 'react';
import UserStore from '../stores/UserStore'
import User from './User'
import NoteList from './NoteList'

class UserList extends Component {
    constructor(){
        super()
        this.state = {
            users : [],
            showNotesFor : -1,
            selectedUser : null
        }

        this.store = new UserStore()

        this.add = (user) => {
            this.store.addOne(user)
        }

        this.delete = (id) => {
            this.store.deleteOne(id)
        }

        this.save = (id, user) => {
            this.store.saveOne(id, user)
        }

        this.select = (id) => {
            let selected = this.state.users.find((e) => e.id === id)
            this.setState({
                showNotesFor : id,
                selectedUser : selected
            })
        }
        this.cancel = (id) => {
            this.setState({
                showNotesFor : -1,
            })
        }

    }

    componentDidMount(){
        this.store.getAll()
        this.store.emitter.addListener('GET_USERS_SUCCESS', () => {
            this.setState({
                users : this.store.users
            })
        })
    }

    render(){
        if (this.state.showNotesFor === -1){
            return <div>
                {
                    this.state.users.map((e, i) => <User key={i} item={e} onDelete={this.delete} onSave={this.save} onSelect={this.select} />)
                }
                
            </div>
        }
        else{
            return <NoteList item={this.state.selectedUser} onCancel={this.cancel} />
        }
    }
}

export default UserList

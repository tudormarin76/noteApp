import React from 'react';
import {Component} from 'react';
import GroupStore from '../stores/GroupStore'
import Group from './Group'
import GroupNoteList from './GroupNoteList'


class GroupList extends Component {
    constructor(){
        super()
        this.state = {
            groups : [],
            showNotesFor : -1,
            selectedGroup : null,
            createGroupForm:false,
            title:''
        }

        this.store = new GroupStore()
        this.delete = (groupId) => {
            this.store.deleteGroup(this.props.item, groupId)
        }
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            })
        }
        this.add = () => {
            let note = {
                title:this.state.title
            }
            this.store.addGroup(this.props.item, note)
            this.setState({
                createGroupForm : false
            })
        }
        
        this.select = (id) => {
            let selected = this.state.groups.find((e) => e.id === id)
            this.setState({
                showNotesFor : id,
                selectedGroup: selected
            })
        }
        
        this.addUser = (userId, groupId) =>{
            this.store.addUserToGroup(userId, groupId)
        }
        
        this.cancel = () => {
            this.setState({
                showNotesFor : -1,
            })
        }
        
    }

    componentDidMount(){
        this.store.getGroups(this.props.item)
        this.store.emitter.addListener('GET_GROUPS_SUCCESS', () => {
            this.setState({
                groups : this.store.groups
            })
        })
    }

    render(){
           if (this.state.showNotesFor === -1){
            return <div>
            <div className="navbar-addButton">
            <input type="button" value="create group" onClick={()=>{this.setState({createGroupForm: !this.state.createGroupForm})}}/>
            </div>
            {
                  this.state.createGroupForm === true &&
                        <div className="editContainer">
                            <div className="editMode">
                                <div className="edit-upContent">
                                    <div className="navbar-search">
                                        <input type="text" placeholder="title" name="title" onChange={this.handleChange} />
                                    </div>
                                    <div className="main-bottomContent">
                                        <input className="contentButton cancel-button" type = "button" value="cancel" onClick={() => this.setState({
                                            createGroupForm : false
                                        })} />
                                        <input className="contentButton save-button" type="button" value="save" onClick={this.add} />
                                    </div>
                                </div>
                            </div>
                        </div>
              }
                {
                    this.state.groups.map((e, i) => <Group key={i} item={e} onDelete={this.delete} onSelect={this.select} onAddUser={this.addUser}/>)
                }
              
            </div>
        }
        else{
            return <div>
                <GroupNoteList item={this.state.selectedGroup} mode={false}/>
                <div className="navbar-logOutButton">
                    <input type="button" value="cancel" onClick={this.cancel}/>
                </div>
            </div>
        }
       
    }
}

export default GroupList

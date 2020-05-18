import React, { Component } from 'react'
import UserStore from '../stores/UserStore'
import GroupStore from '../stores/GroupStore'
import ReactMarkdown from 'react-markdown'

class Note extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            isSharing:false,
            isSharingToGroup:false,
            viewNote: false,
            users:[],
            groups:[],
            title: this.props.item.title,
            content: this.props.item.content,
            tag: this.props.item.tag,
            subject: this.props.item.subject,
            data: this.props.item.data
        }
        this.store = new UserStore()
        this.groupStore = new GroupStore()
        
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            })
        }
        this.save = () => {
            this.props.onSave(this.props.item.id, {
                title: this.state.title,
                content: this.state.content,
                tag: this.state.tag,
                subject: this.state.subject
            })
            this.setState({
                isEditing : false
            })
        }
        
        this.share = (user) => {
            this.props.onShare(this.props.item.id, user)
            this.setState({
                isSharing : false
            })
        }
        
        this.shareToGroup = (group) => {
            
            this.props.onShareToGroup(this.props.item.id, group)
            this.setState({
                isSharingToGroup : false
            })
        }

    }
    componentDidMount(){
          this.store.getAll()
          this.groupStore.getGroups(this.props.user)
    }
    render() {
        if (this.state.isEditing) {
            return <div className="container-noteItem">
                <div className="editContainer">
                    <div className="editMode">
                        <div className="edit-upContent">
                            <div className="edit-subject">
                                <input type="text" placeholder="title" name="title" onChange={this.handleChange} value={this.state.title} />
                            </div>
                            <div className="edit-subject">
                                <input type="text" placeholder="tag" name="tag" onChange={this.handleChange} value={this.state.tag}/>
                            </div>
                            <div className="edit-subject">
                                <input type="text" placeholder="subject" name="subject" onChange={this.handleChange} value={this.state.subject}/>
                            </div>
                            <div className="main-content">
                                <input type="text" placeholder="content" name="content" onChange={this.handleChange} value={this.state.content}/>
                            </div>
                            <div className="main-bottomContent">
                                <input className="contentButton cancel-button" type = "button" value="cancel" onClick={() => this.setState({
                                    isEditing : false
                                })} />
                                <input className="contentButton save-button" type="button" value="save" onClick={this.save} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        else{
            return  <div className="container-noteItem" >
            {
                this.state.viewNote === true &&
                <div className="editContainer">
                    <div className="editMode">
                        <div className="edit-upContent">
                            
                                <p> Title: {this.state.title} </p>
                          
                                <p>Tag: {this.state.tag}</p>
                            
                                <p>Subject: {this.state.subject}</p>
                            
                            <div className="main-content">
                                <ReactMarkdown source={this.state.content}></ReactMarkdown>
                            </div>
                            <div className="main-bottomContent">
                                <input className="contentButton cancel-button" type = "button" value="cancel" onClick={() => this.setState({
                                    viewNote: !this.state.viewNote
                                })} />
                                
                            </div>
                        </div>
                    </div>
                </div>
            }
                <div >
                        <div className="container-noteItem-tag">
                            <p>{this.props.item.tag}</p>
                        </div>
                        <div onClick={()=>{this.setState({viewNote: !this.state.viewNote})}}>
                        <h3>{this.props.item.title} </h3>
                        </div>
                        
                      {
                        this.state.isSharing === true &&
                        <select onChange={(e) => this.share(e.target.value)}>
                        <option value="" selected disabled hidden>Choose</option>
                            {this.state.users.map((user) => <option key={user.id} value={user.id}>{user.firstName}</option>)}
                        </select>
                      }
                      {
                        this.state.isSharingToGroup === true &&
                        <select onChange={(e) => this.shareToGroup(e.target.value)}>
                        <option value="" selected disabled hidden>Choose</option>
                            {this.state.groups.map((group) => <option key={group.id} value={group.id}>{group.title}</option>)}
                        </select>
                      }
                      </div>
                      {
                        this.props.mode !== false &&
                        <div className="noteButtons">
                            <input className="input-button edit-button" type="button" value="edit" onClick={() => this.setState({
                                isEditing : true,
                            })}/>
                            <input className="input-button share-button" type="button" value="share" onClick={() => {
                                this.setState({
                                    isSharing : !this.state.isSharing,
                                    users : this.store.users
                            })}}/>
                            <input className="input-button delete-button" type="button" value="delete" onClick={() => this.props.onDelete(this.props.item.id)}/>
                            <input className="input-button group-button" type="button" value="add to group" onClick={() => {
                                this.setState({
                                    isSharingToGroup : !this.state.isSharingToGroup,
                                    groups : this.groupStore.groups
                            })}}/>
                            
                        </div>
                      }
                    </div>
             
        }
    }
}

export default Note
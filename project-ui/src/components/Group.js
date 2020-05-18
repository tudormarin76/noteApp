import React,{Component} from 'react'
import UserStore from '../stores/UserStore'

class Group extends Component{
    constructor(props){
        super(props)
        this.state = {
            title : this.props.item.title,
            notes:[],
            isAdding:false
        }
        this.store = new UserStore()
        
    }
    componentDidMount(){
        this.store.getAll()
        
    }
    render(){
      
            return <div className="container-noteItem">
                <h3>
                    {this.props.item.title}
                </h3>
                {
                    this.state.isAdding === true &&
                    <div>
                        <select onChange={(e) => this.props.onAddUser(e.target.value, this.props.item.id)}>
                        <option value="" selected disabled hidden>Choose</option>
                            {this.store.users.map((user) => <option key={user.id} value={user.id}>{user.firstName}</option>)}
                        </select>
                    </div>
                }
                <div className="noteButtons">
                    <input className="input-button delete-button" type="button" value="delete" onClick={() => this.props.onDelete(this.props.item.id)} />
                    <input className="input-button share-button" type="button" value="details" onClick={() => this.props.onSelect(this.props.item.id)} />
                    <input className="input-button edit-button" type="button" value="add user" onClick={() => this.setState({isAdding: !this.state.isAdding})} />
                </div> 
            </div>
        }
    

}

export default Group
import React,{Component} from 'react'

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            isEditing : false,
            firstName : this.props.item.firstName,
            lastName : this.props.item.lastName,
            email : this.props.item.email,
            password : this.props.item.password,
            faculty : this.props.item.faculty,
            classNr : this.props.item.classNr
        }
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name] : evt.target.value
            })
        }
        this.save = () => {
            this.props.onSave(this.props.item.id, {
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                email : this.state.email,
                password : this.state.password,
                faculty : this.state.faculty,
                classNr : this.state.classNr

            })
            this.setState({
                isEditing : false
            })
        }
    }
    render(){
        if (this.state.isEditing){
            return <div>
                <h3>
                    <input type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName} />
                </h3>
                <h3>
                    <input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} />
                </h3>
                <h3>
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email} />
                </h3>
                <h3>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                </h3>
                <h3>
                    <input type="text" name="faculty" onChange={this.handleChange} value={this.state.faculty} />
                </h3>
                <h3>
                    <input type="text" name="classNr" onChange={this.handleChange} value={this.state.classNr} />
                </h3>
                <div>
                <input type="button" value="cancel" onClick={() => this.setState({
                    isEditing : false
                })} />
                <input type="button" value="save" onClick={this.save} />
            </div> 

            </div>
        }
        else{
            return <div>
                <h3>
                    {this.props.item.firstName}
                </h3>
                <h3>
                    {this.props.item.lastName}
                </h3>
                <h3>
                    {this.props.item.email}
                </h3>
                <h3>
                    {this.props.item.password}
                </h3>
                <h3>
                    {this.props.item.faculty}
                </h3>
                <h3>
                    {this.props.item.classNr}
                </h3>   
                <div>
                    <input type="button" value="edit" onClick={() => this.setState({
                        isEditing : true
                    })} />
                    <input type="button" value="delete" onClick={() => this.props.onDelete(this.props.item.id)} />
                    <input type="button" value="details" onClick={() => this.props.onSelect(this.props.item.id)} />
                </div> 
            </div>
        }
    }

}

export default User
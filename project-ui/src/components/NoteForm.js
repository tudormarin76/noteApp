import React, {Component} from 'react'

class NoteForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            content:'',
            tag :'',
            subject:'',
            show: true
        }
        this.handleChange = (evt) =>{
            this.setState({
                [evt.target.name] : evt.target.value
            })
        }
        this.handleClick = () => {
            this.props.onAdd({
                title: this.state.title,
                content: this.state.content,
                tag:this.state.tag,
                subject:this.state.subject
            })
           
        }
    }
    render(){
        return <div>
        {
        this.state.show === true &&
            <div className="container-main">
                <div className="main-upContent">
                    <div className="main-tag">
                        <input type="text" placeholder="title" name="title" onChange={this.handleChange}/>
                    </div>
                    <div className="main-tag">
                        <input type="text" placeholder="tag" name="tag" onChange={this.handleChange}/>
                    </div>
                    <div className="main-tag">
                        <input type="text" placeholder="subject" name="subject" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="main-content">
                    <input type="text" placeholder="content" name="content" onChange={this.handleChange}/>
                </div>
                <div className="main-bottomContent">
                {
                    this.props.width <=1000 &&
                    <input className="contentButton cancel-button" type="button" value="Cancel" onClick={()=>{this.setState({
                        show:!this.state.show
                    })}}/>
                }
                    <input className="contentButton save-button" type="button" value="Add" onClick={this.handleClick}/>
                </div>
            </div>
        }
        </div>
    }
}

export default NoteForm
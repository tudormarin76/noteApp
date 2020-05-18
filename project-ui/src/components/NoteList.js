import React,{Component} from 'react'
import NoteStore from '../stores/NoteStore'
import Note from './Note'
import NoteForm from './NoteForm'
import GroupList from './GroupList'

class NoteList extends Component{
    constructor(props){
        super(props)

        this.state= {
            notes : [],
            isVisible:true,
            width: 0, 
            height: 0,
            mobile: false
        }
        this.store = new NoteStore()
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.add = (note) => {
            this.store.addNote(this.props.item.id, note)
        }

        this.delete = (noteId) => {
            this.store.deleteNote(this.props.item.id, noteId)
        }

        this.save = (noteId, note) => {
            this.store.saveNote(this.props.item.id, noteId, note)
        }
        
        this.share = (noteId, userId) => {
            this.store.shareNote(noteId, userId)
        }
        
         this.shareToGroup = (noteId, groupId) => {
            this.store.shareNoteToGroup(noteId, groupId)
        }
        
        this.filterNotes = (tag) =>{
            this.store.getNotesWithTag(this.props.item.id, tag)
        }
        this.handleCheckbox = () => {
            this.setState({isVisible: !this.state.isVisible});
        }
        

    }
    
    
    componentDidMount(){
        window.addEventListener('resize', this.updateWindowDimensions)
        this.setState({ width: window.innerWidth, height: window.innerHeight })
        this.store.getNotes(this.props.item.id)
        this.store.emitter.addListener('GET_NOTES_SUCCESS', () => {
            this.setState({
                notes : this.store.notes
            })
        })
    }
    
        
    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight })
    }
    
    render(){
        return <div>
        
        {
            (this.state.mobile || this.state.width >=1000) &&
            <NoteForm onAdd={this.add} width={this.state.width}/>
        }
        
            <div className="navbar-title">
                <h1>
                    NoteApp
                </h1>
                <p>powered by Undefined</p>
            </div>
            <label className="switch switch-flat">
				<input className="switch-input" type="checkbox" onChange={ this.handleCheckbox }/>
				<span className="switch-label" data-on="Notes" data-off="Groups"></span> 
				<span className="switch-handle"></span> 
			</label>
			{
                this.state.width <= 1000 &&
                <div className="navbar-addButton">
                <input type="button" value="Add note" onClick={ () =>{
                    this.setState({
                        mobile:!this.state.mobile
                    })
                        
                    }
                }/>
                </div>
            }
			{
			this.state.isVisible === true &&
			<div>
                <div className="navbar-search">
                    <input type="text" placeholder="Search note by tag" name="faculty" onChange={(e) => this.filterNotes(e.target.value)}/>
                </div>
                    {
                        this.state.notes.map((e, i) => <Note key={i} user={this.props.item.id} item={e} onDelete={this.delete} onSave={this.save} onShare={this.share} onShareToGroup={this.shareToGroup}/>)
                    }
            </div>
			}
			{
			    this.state.isVisible === false &&
			    <GroupList item={this.props.item.id}/>
			}
			
        </div>
    }
}

export default NoteList
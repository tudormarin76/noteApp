import React,{Component} from 'react'
import GroupStore from '../stores/GroupStore'
import Note from './Note'

class GroupNoteList extends Component{
    constructor(props){
        super(props)

        this.state= {
            notes : []
        }
        this.store = new GroupStore()
    }
    
    
    componentDidMount(){
        this.store.getNotesForGroup(this.props.item.id)
        this.store.emitter.addListener('GET_NOTES_SUCCESS', () => {
            this.setState({
                notes : this.store.notes
            })
        })
    }
    render(){
        return <div>
        
            <div>
                {
                    this.state.notes.map((e, i) => <Note key={i} item={e} mode={false}/>)
                }
            </div>
            
           
        </div>
    }
}

export default GroupNoteList
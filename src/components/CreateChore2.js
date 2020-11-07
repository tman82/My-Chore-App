import React, { Component } from 'react'
import plusImage from '../assets/images/plus4.png'
import axios from 'axios'
import './CreateChoreForm.css'


export class CreateChore2 extends Component {
   constructor(props) {
       super(props)

       this.state = {
           choreTitle: '',
           chorePerson: '',
           choreCompleted: '',
           modalState: false
       }

       this.onChangeAddChore = this.onChangeAddChore.bind(this)
       this.onChangeChorePerson = this.onChangeChorePerson.bind(this)
       this.onChangechoreCompleted = this.onChangechoreCompleted.bind(this)
       this.toggleModalState = this.toggleModalState.bind(this)
       this.showModal = this.showModal.bind(this)
       this.hideModal = this.hideModal.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
   }

   /*toggleModalState() {
        this.setState({ modalState: true })
   }*/

   showModal = () => {
       this.setState({
           modalState: true
       })
   }

   hideModal = () => {
        this.setState({
            modalState: false
        })
    }

   onChangeAddChore(e) {
        this.setState({
            choreTitle: e.target.value
        })
   }

   onChangeChorePerson(e) {
        this.setState({
            chorePerson: e.target.value
        })
    } 
    
    onChangechoreCompleted(e) {
        this.setState({
            choreCompleted: e.target.value
        })
    }



   handleSubmit(e) {
        e.preventDefault()
        const newChore = {
            choreTitle: this.state.choreTitle,
            chorePerson: this.state.chorePerson,
            choreCompleted: this.state.choreCompleted,
        }
        console.log(newChore)

        axios.post(`http://localhost:4000/chores/addchore`, newChore)
            .then(res => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
   }

    render() {
        const { choreTitle, chorePerson, choreCompleted, modalState } = this.state
        return (
            <div className="create-div">
                <div className="Modal">
                    <div className={`modalBackground modalShowing-${modalState}`}>
                        <div className="modalInner">
                            <div className="modalText">
                                <form onSubmit={this.handleSubmit}>
                                    <input type="text" className="add-chore-input" value={choreTitle} onChange={this.onChangeAddChore} placeholder="Chore"/>
                                    <br/>
                                    <input type="text" value={chorePerson} onChange={this.onChangeChorePerson} placeholder="Person"/>
                                    <br/>
                                    <input type="text" value={choreCompleted} onChange={this.onChangechoreCompleted} placeholder="Chore Completion"/>
                                    <br/>
                                    <input type="submit" value="Add"/>
                                </form>
                                <button className="exitButton">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <img onClick={() => toggleModalState()} className="plusImage"  src={plusImage} alt="pic" title="Add Chore" />
            </div>
        )
    }
}

export default CreateChore2

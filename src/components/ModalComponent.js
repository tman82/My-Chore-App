import React from 'react';
import 'react-responsive-modal/styles.css';
import axios from 'axios'
import { Modal } from 'react-responsive-modal';
import plusImage from '../assets/images/plus4.png'
import './CreateChoreForm.css'

 
export default class ModalComponent  extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      choreTitle: '',
      chorePerson: '',
      choreCompleted: '',
      addChoreError: '',
      chorePersonError: '',
      choreCompletedError: ''
    }

    this.onChangeAddChore = this.onChangeAddChore.bind(this)
    this.onChangeChorePerson = this.onChangeChorePerson.bind(this)
    this.onChangechoreCompleted = this.onChangechoreCompleted.bind(this)
    this.refreshPage = this.refreshPage.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
 
  onOpenModal = () => {
    this.setState({ open: true });
  }
 
  onCloseModal = () => {
    this.setState({ open: false });
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

  refreshPage() {
    window.location.reload(false)
  }

  validate = () => {
    let addChoreError = ''
    let chorePersonError = ''
    let choreCompletedError = ''

    if(!this.state.choreTitle) {
        addChoreError = 'Please enter a chore title'
    }

    if(!this.state.chorePerson) {
      chorePersonError = 'Please enter a person\'s name'
    }

    if(!this.state.choreCompleted) {
        choreCompletedError = 'Please enter Done or Undone'
    }


    if(addChoreError || chorePersonError || choreCompletedError) {
        this.setState({ addChoreError, chorePersonError, choreCompletedError})
        return false
    }
    return true
  }

  handleSubmit(e) {
    e.preventDefault()
    const newChore = {
        choreTitle: this.state.choreTitle,
        chorePerson: this.state.chorePerson,
        choreCompleted: this.state.choreCompleted
    }
    console.log(newChore)

    axios.post(`http://localhost:4000/chores/addchore`, newChore)
        .then(res => {
            console.log(res.data)
        })
        .catch((error) => {
            console.log(error)
        })

    const isValid = this.validate()
    
    if(isValid) {
      this.setState({
        open: false,
        choreTitle: '',
        chorePerson: '',
        choreCompleted: '',
        addChoreError: '',
        chorePersonError: '',
        choreCompletedError: ''
      })  
      this.refreshPage()
    } 
  } 

  render() {
    const { open, choreTitle, chorePerson, choreCompleted } = this.state
    return (
      <div>
        <img onClick={this.onOpenModal} className="plusImage" src={plusImage} alt='pic' title="Add Chore"/>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="modal-style">
                <div className="Modal">
                    <div>
                        <div className="">
                            <div className="modalText">
                                <form onSubmit={this.handleSubmit}>
                                    <input type="text" className="add-chore-input" value={choreTitle} onChange={this.onChangeAddChore} placeholder="Chore"/>
                                    <div style={{ fontSize: 12, color: "red" }}>{this.state.addChoreError}</div>
                                    <br/>
                                    <input type="text" value={chorePerson} onChange={this.onChangeChorePerson} placeholder="Person"/>
                                    <div style={{ fontSize: 12, color: "red" }}>{this.state.chorePersonError}</div>
                                    <br/>
                                    <input type="text" value={choreCompleted} onChange={this.onChangechoreCompleted} placeholder="Done or Undone"/>
                                    <div style={{ fontSize: 12, color: "red" }}>{this.state.choreCompletedError}</div>
                                    <br/>
                                    <input className="modal-button" type="submit" value="Add"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
      </div>
    );
  }
}


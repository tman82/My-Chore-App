import React, { Component } from 'react'
import axios from 'axios'
import deleteIcon from '../assets/images/delete.png'


export class Chore extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allChores: []
        }

        this.delete = this.delete.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:4000/chores')
            .then(res => {
                this.setState({
                    allChores: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    refreshPage() {
        window.location.reload(false)
    }

    delete(id) {
        axios.delete('http://localhost:4000/chores/'+id)
            .then(response => {
                this.setState({
                    allChores: this.state.allChores.filter(el => el._id !== id)
                })
            })
            .catch(err => console.log(err))

        this.refreshPage()
    }

    render() {
        let choreItems = this.props.choreData
        let completed = this.props.chores.map(chore => {
            return <div key={chore._id}>
                        <p>{chore.name}</p>
                   </div>    
        })

        return (
            <div className="chore-data-div">
                <h4 className="title">{choreItems.choreTitle}</h4>
                <p><span className="badge">{choreItems.chorePerson}</span></p>
                <p className="completed">
                    {choreItems.choreCompleted}
                </p>
                <div className="delete-button float-right">
                    <img onClick={() => { this.delete(this.props.choreData._id)}} src={deleteIcon} alt="pic" title="Delete"/>
                </div>
            </div>
        )
    }
}

export default Chore

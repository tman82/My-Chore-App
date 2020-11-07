import React, { useState } from 'react'
import './CreateChoreForm.css'


function CreateChoreForm() {
    const [modalState, setModalState] = useState(false)

    const toggleModalState = () => {
        setModalState(!modalState)
    }

    return (
        <div className="Modal">
            <div className={`modalBackground modalShowing-${modalState}`}>
                <div className="modalInner">
                    <div className="modalText">
                        <form action="">
                            <input type="text" placeholder="Chore"/>
                            <br/>
                            <input type="text" placeholder="Person"/>
                            <br/>
                            <input type="text" placeholder="Chore Completion"/>
                            <br/>
                            <input type="submit" value="Add"/>
                        </form>
                        <button className="exitButton" onClick={() => toggleModalState()}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
    
            <button onClick={() => toggleModalState()}>
                Add Chore
            </button>
        </div>
    )
}

export default CreateChoreForm

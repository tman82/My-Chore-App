import React, { Component } from 'react';


export default class InputComponent extends Component {
    render() {
        return(
            <div className="search-bar-div">
                <input type="text" placeholder="Person" onKeyUp={event =>
                        this.props.onTextChange(event.target.value)
                    }
                />
            </div>
        )
    }
}
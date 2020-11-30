import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import InputComponent from './components/InputComponent';
import Chore from './components/Chore';
import ModalComponent from './components/ModalComponent'
import axios from 'axios';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        chores: [],
        filterString: ''
      };
  }
  
  componentDidMount() {
    axios.get('http://localhost:4000/chores')
      .then(res => {
        const choresData = res.data;
        this.setState({ chores: choresData });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
    const { filterString, chores } = this.state;
    let choreToRender = chores ? chores.filter(chore =>
      chore.chorePerson.toLowerCase().includes(
        filterString.toLowerCase()
      )
    ) : []
    
    return (
      <div className="container-fluid">
        <div className="row" id="main-div">
          <div className="col main-col">

            <HeaderComponent />
            <ModalComponent />
            {chores ?
              <div className="container-fluid">
                <InputComponent onTextChange={text => {
                  this.setState({ filterString: text })
                }}/>
                <div className="row chore-component-div">
                  {choreToRender.map(choreData =>
                    <Chore key={choreData._id} choreData={choreData} chores={chores} delete={this.delete} />
                  )}
                </div>
              </div> : <h3>Loading...</h3>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;

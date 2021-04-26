import './App.css';
import { Component } from 'react';
import ExpenseRegister from './ExpenseRegister/ExpenseRegister';


class App extends Component {

  render() {
    return (
        <div >          
          <div>
            <ExpenseRegister/>
          </div>
        </div>    
    );
  }
}

export default App;

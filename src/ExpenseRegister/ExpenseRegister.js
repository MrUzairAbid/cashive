import { Component } from 'react';
import ExpenseDetails from '../ExpenseDetails/ExpenseDetails';
import CashListing from '../CashListing/CashListing';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpenseAPI from '../api/ExpenseAPI';


class ExpenseRegister extends Component {

  componentDidMount()
  {
    this.refreshRegister();
  }

  state = {
    cashEntries: []
  }

  addCashEntryToState = async (cashEntry) => {
    const response = await ExpenseAPI.post(
      '/expense/save', cashEntry,{}
    );
    this.refreshRegister();
  }

  removeCashEntryFromState = async (id) => {
    const response = await ExpenseAPI.delete(
      '/expense/delete/' + id,{}
    );
    this.refreshRegister();
  }

  async refreshRegister()
  {
    const response = await ExpenseAPI.get(
      '/expense/all',{}
    );
    this.setState({cashEntries: response.data});
  }

  render() {

    return (
      <Container maxWidth="lg">
        <div>
          <div>
            <Card variant="outlined" style={{backgroundColor: '#d3c1d4'}}>
              <CardContent>
                <ExpenseDetails add={this.addCashEntryToState.bind(this)} />
              </CardContent>
            </Card>
          </div>
          <div style={{ paddingTop: '4%' }}>
            <CashListing entries={this.state.cashEntries} remove={this.removeCashEntryFromState.bind(this)} />
          </div>
        </div>
      </Container>
    );
  }
}

export default ExpenseRegister;

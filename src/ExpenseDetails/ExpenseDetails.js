import React, { useState } from 'react';
import { CashEntry } from '../Models/ExpenseEntry';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));


const ExpenseRegister = (props) => {

    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(false);
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState(null);

    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState(false);
    const [amountErrorMessage, setAmountErrorMessage] = useState(null);

    const [date, setDate] = useState(null);
    const [dateError, setDateError] = useState(false);
    const [dateErrorMessage, setDateErrorMessage] = useState(null);

    const [type, setType] = useState(null);
    const [typeError, setTypeError] = useState(false);
    const [typeErrorMessage, setTypeErrorMessage] = useState(null);

    const expenseTypes = [
        { title: 'Medical', code: 'ET1'},
        { title: 'Utility Bills', code: 'ET2' },
        { title: 'Bank Transfer', code: 'ET3' },
        { title: 'Cinema', code: 'ET4' },
        { title: 'Restaurant Bill', code: 'ET5' },
        { title: "Grocery", code: 'ET6' }
    ];
    const classes = useStyles();

    let submitExpense = (event) => {
        event.preventDefault();
        if(validateForm())
        {
            var formattedAmount = amount.replace(',','').replace("Rs. ","");
            var moment = require('moment');
            var formattedDate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
            console.log(formattedDate);
            let cashEntry = new CashEntry(description, parseFloat(formattedAmount), formattedDate, type.title);
            resetForm();
            props.add(cashEntry);
        }    
    }

    let resetForm = () => {
        setDescription("");
        setAmount("");
        setDate(null);
        setType(null);
        setDescriptionError(false);
        setDescriptionErrorMessage(null);
        setAmountError(false);
        setAmountErrorMessage(null);
        setDateError(false);
        setDateErrorMessage(null);
        setTypeError(false);
        setTypeErrorMessage(null);
        document.getElementById("description").value = null;
        document.getElementById("date").value = null;
        document.getElementById("amount").value = null;
    }

    let validateForm = () => {
        let isValid = true;
        if (!description)
        {
            setDescriptionError(true);
            setDescriptionErrorMessage("Description cannot be empty");
            isValid = false;
        }
        else
        {
            setDescriptionError(false);
            setDescriptionErrorMessage(null);
        }
        if(!amount)
        {
            setAmountError(true);
            setAmountErrorMessage("Amount cannot be empty");
            isValid = false;
        }
        else
        {
            setAmountError(false);
            setAmountErrorMessage(null);
        }
        if(!date)
        {
            setDateError(true);
            setDateErrorMessage("Date cannot be empty");
            isValid = false;
        }
        else
        {
            setDateError(false);
            setDateErrorMessage(null);
        }
        if(!type)
        {
            setTypeError(true);
            setTypeErrorMessage("Type cannot be empty");
            isValid = false;
        }
        else
        {
            setTypeError(false);
            setTypeErrorMessage(null);
        }
        
        return isValid;
    }

    return (
        <form id="expenseFillForm" onSubmit={submitExpense.bind(this)}>
            <div  className={classes.root}>
                <div>
                    <div style={{ marginBottom: '2%' }}>
                        <span>
                            <TextField id="description" label="Description" placeholder="Add Expense Description Here" value={description} error={descriptionError} helperText={descriptionErrorMessage}
                                style={{ width: '70%', paddingRight: '2%' }} onChange={(event) => {setDescription(event.target.value)}} autoComplete="off"/>
                        </span>
                        <span>
                            <NumberFormat thousandSeparator={true} prefix={'Rs. '} allowNegative={false} customInput={TextField} style={{ width: '28%' }} id="amount" label="Amount" error={amountError} 
                                helperText={amountErrorMessage}  autoComplete="off" value={amount} onChange={(event) => {setAmount(event.target.value)}} />
                        </span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>
                            <TextField id="date" label="Date" type="date" variant="outlined" InputLabelProps={{ shrink: true }} error={dateError} helperText={dateErrorMessage}
                                style={{ width: '50%', paddingRight: '3%' }} onChange={(event) => {setDate(event.target.value)}} autoComplete="off" className={classes.textField}/>
                        </span>
                        <span>
                                <Autocomplete id="type" 
                                    options={expenseTypes} 
                                    getOptionLabel={(option) => option.title} 
                                    getOptionSelected={(option) => option.title}
                                    style={{ width: '47%', display: 'inline-block' }} 
                                    value={type} 
                                    onChange={(event, option) => {setType(option);}}
                                    renderInput={(params) => <TextField id="typeText" {...params} label="Expense Type" variant="outlined" error={typeError} helperText={typeErrorMessage}/>} 
                                />
                        </span>
                    </div>
                </div>
            </div>

            <div >
                <div style={{paddingTop: '1%'}} className={classes.root} align="right">
                    <Button variant="contained" type="submit" color="primary">Add Expense</Button>
                    <Button onClick={resetForm} variant="outlined" color="primary">Reset</Button>
                </div>
            </div>
        </form>
    )
};

export default ExpenseRegister;
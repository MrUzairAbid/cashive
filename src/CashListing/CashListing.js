import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const CashListing = (props) => {

    const [open, setOpen] = React.useState(false);
    const [indexToDelete, setIndexToDelete] = React.useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (index) => {
        setIndexToDelete(index);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    let removeEntry = () => {
        if(indexToDelete != null)
        {
            props.remove(indexToDelete);
            setIndexToDelete(null);
            setOpen(false);
        }
    }

    let cashlist = (
            <TableBody>            
                {props.entries.map((entries, index) => {
                    return (
                        <TableRow key={index} id={index}>
                                <TableCell >{entries.description}</TableCell>
                                <TableCell>{entries.amount}</TableCell>
                                <TableCell>{entries.date}</TableCell>
                                <TableCell>{entries.type.title}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="expand row" size="small" onClick={handleClickOpen.bind(this, index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                    ); 
                })}
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Delete expense confirmation"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this expense?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button autoFocus onClick={removeEntry} color="primary">
                        Delete
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Cancel
                    </Button>
                    </DialogActions>
                </Dialog>
             </TableBody>
    )

    
    
    
    return (
        <TableContainer component={Paper} >
            <Table stickyHeader aria-label="sticky table" id="expensesTable">
                <TableHead>
                    <TableRow>
                        <TableCell width="65%">Description</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                {cashlist}
            </Table>
        </TableContainer>
    )
};

export default CashListing;
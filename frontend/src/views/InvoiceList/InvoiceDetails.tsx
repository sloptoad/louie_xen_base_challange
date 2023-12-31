import { TableContainer, Paper, Table, TableRow, TableCell, TableBody, Button, Box, Modal, Typography, Input, IconButton, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react";
import { Invoice, InvoiceStateTypes } from "../../types/Invoice.type";
import { completeInvoice, payInvoice, shipInvoice, updateInvoice } from "../../utils/api";
import SnackBar from "../../components/Snackbar";
import Edit from '@mui/icons-material/Edit';
import { formatter } from "../../utils/common/formatter";

const InvoiceDetails = ({ viewInvoice, invoiceDetail, setInvoiceDetail }: InvoiceDetailsProps) => {
    const [open, setOpen] = useState(false);
    const [invoiceState, setInvoiceState] = useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isEditable, setIsEditable] = useState(false);

    const handleAmountChange = (value: string) => {
        setInvoiceDetail((prevInvoiceDetail: Invoice) => ({
            ...prevInvoiceDetail,
            amount: value
        }));
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const handleSubmit = (state: InvoiceStateTypes) => {
        if (state === InvoiceStateTypes.PAID) {
            payInvoice(invoiceDetail.id);
            setInvoiceState(InvoiceStateTypes.PAID);
            handleClose();
        }
        if (state === InvoiceStateTypes.SHIPPED) {
            shipInvoice(invoiceDetail.id);
            setInvoiceState(InvoiceStateTypes.SHIPPED)
        }
        if (state === InvoiceStateTypes.COMPLETE) {
            completeInvoice(invoiceDetail.id);
            setInvoiceState(InvoiceStateTypes.COMPLETE)
        }
        setOpenSnackbar(true)
    };
    const refreshPage = () => {
        // refresh page on back button to sync data
        window.location.reload();
    }
    useEffect(() => {
        viewInvoice()
    }, [invoiceState])
    return (
        <TableContainer data-testid="invoice-details" sx={{ minWidth: 480, border: '2px solid grey' }} component={Paper}>
            <Button onClick={() => refreshPage()}>
                Back To Invoices
            </Button>
            <Typography>
                Invoice Details
            </Typography>
            <Table sx={{ minWidth: 480 }} aria-label="invoices">
                <TableBody>
                    <TableRow>
                        <TableCell align="left">Invoice Number</TableCell>
                        <TableCell align="right">{invoiceDetail.invoice_number}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Amount</TableCell>
                        <TableCell align="right">
                            {isEditable && invoiceDetail.state === InvoiceStateTypes.CREATED ? (
                                <>
                                    <Button sx={{ height: '5px', textTransform: 'none' }} onClick={() => { setIsEditable(false); updateInvoice(invoiceDetail.id, invoiceDetail.amount ? invoiceDetail.amount : 1) }}
                                    >
                                        Update Price
                                    </Button>
                                    <Input
                                        sx={{ height: '15px', width: '80px', textAlign: 'center', fontSize: '0.875rem' }}
                                        type="text"
                                        value={invoiceDetail.amount}
                                        onChange={(event) => handleAmountChange(event.target.value)}
                                    />
                                </>

                            ) : (
                                <>
                                    {invoiceDetail.state === InvoiceStateTypes.CREATED &&
                                        <IconButton data-testid="edit-button"
                                            sx={{ height: '15px' }}
                                            onClick={() => setIsEditable(true)}>
                                            <Edit />
                                        </IconButton>
                                    }
                                    <span >
                                        {formatter.format(invoiceDetail.amount)}
                                    </span>
                                </>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">State</TableCell>
                        <TableCell align="right">{invoiceState.length ? invoiceState : invoiceDetail.state}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Due Date</TableCell>
                        <TableCell align="right">{invoiceDetail.due_date}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            {/* different invoice state scenarios */}
            {invoiceDetail.state === InvoiceStateTypes.CREATED &&
                <>
                    <Button sx={{ m: 1, height: '40px' }} variant="outlined" data-testid="submit-button" onClick={() => { handleOpen(); () => payInvoice(invoiceDetail.id) }}>PAY</Button>
                    {/* use modal only to confirm payment of invoice, other actions submitted with one button click */}
                    {/* pass appropriate data to show correct snackbar depending on invoice state */}
                    <Modal
                        data-testid="modal"
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography sx={{ fontSize: '0.875rem' }} id="modal-modal-title" variant="h6" component="h2">
                                Are you sure you want to mark Invoice {invoiceDetail.invoice_number} as paid?
                            </Typography>
                            <Button onClick={() => handleSubmit(InvoiceStateTypes.PAID)}>Confirm</Button>
                            <Button onClick={() => handleClose()}>Cancel</Button>
                        </Box>
                    </Modal>
                    <SnackBar open={openSnackbar} handleClose={handleCloseSnackbar} message={`Invoice ${invoiceDetail.invoice_number} is Paid`} />
                </>
            }
            {invoiceDetail.state === InvoiceStateTypes.PAID &&
                <>
                    <Button disabled={openSnackbar} sx={{ m: 1, height:'40px' }} variant="outlined" data-testid="submit-button" onClick={() => handleSubmit(InvoiceStateTypes.SHIPPED)}> {openSnackbar ? <CircularProgress size='1.5rem' /> : 'SHIP'}</Button>
                    <SnackBar open={openSnackbar} handleClose={handleCloseSnackbar} message={`Invoice ${invoiceDetail.invoice_number} is Paid`} />
                </>
            }
            {invoiceDetail.state === InvoiceStateTypes.SHIPPED &&
                <>
                    <Button disabled={openSnackbar} sx={{ m: 1, height:'40px' }} variant="outlined" data-testid="submit-button" onClick={() => handleSubmit(InvoiceStateTypes.COMPLETE)}>{openSnackbar ? <CircularProgress size='1.5rem' /> : 'COMPLETE'}</Button>
                    <SnackBar open={openSnackbar} handleClose={handleCloseSnackbar} message={`Invoice ${invoiceDetail.invoice_number} is Shipped`} />
                </>
            }
            {(invoiceDetail.state === InvoiceStateTypes.COMPLETE) &&
                <>
                    <Button variant="outlined" data-testid="submit-button" disabled sx={{ '&:hover': { backgroundColor: 'rgba(149, 157, 197, 0.2)' }, m: 1, height: '40px' }}>{openSnackbar ? <CircularProgress size='1.5rem' /> : 'COMPLETED'}</Button>
                    <SnackBar open={openSnackbar} handleClose={handleCloseSnackbar} message={`Invoice ${invoiceDetail.invoice_number} is Complete`} />
                </>
            }
        </TableContainer>
    );
}

interface InvoiceDetailsProps {
    invoiceDetail: Invoice;
    setInvoiceDetail: any;
    viewInvoice: () => void;
}

export default InvoiceDetails;
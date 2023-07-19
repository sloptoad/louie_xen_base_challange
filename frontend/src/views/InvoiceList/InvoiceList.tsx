import { Suspense, useState } from 'react'
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { Invoice } from '../../types/Invoice.type'
import { fetchInvoices } from '../../utils/fetchInvoices'

import InvoiceDetails from './InvoiceDetails'
import { formatter } from '../../utils/common/formatter'
const initialRows = fetchInvoices()

const InvoiceList = () => {
  const [rows, _setRows] = useState<Invoice[]>(initialRows.read())
  const [invoiceDetail, setInvoiceDetail] = useState<Invoice>()

  const viewInvoice = (id: number) => {
    fetch(`http://localhost:3000/invoices/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setInvoiceDetail(data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <Suspense fallback={<CircularProgress />}>
      {!invoiceDetail &&
        <TableContainer sx={{ minWidth: 480, border:'2px solid grey' }} component={Paper}>
          <Table aria-label="invoices">
            <TableHead>
              <TableRow>
                <TableCell align="left">Invoice ID</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody  >
              {rows.map((row,idx) => (
                <TableRow
                 data-testid={`invoice-${idx}`}
                  onClick={() => viewInvoice(row.id)}
                  key={row.invoice_number}
                  sx={{ '&:last-child td, &:last-child th': { border: 0},cursor:'pointer','&:hover':{backgroundColor:'rgba(149, 157, 197, 0.2)'},  }}
                >
                  <TableCell align="left">{row.invoice_number}</TableCell>
                  <TableCell align="right">{formatter.format(row.amount)}</TableCell>
                  <TableCell align="right">{row.due_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      {invoiceDetail &&
        <InvoiceDetails viewInvoice={()=>viewInvoice(invoiceDetail.id)} setInvoiceDetail={setInvoiceDetail} invoiceDetail={invoiceDetail}></InvoiceDetails>
      }
    </Suspense>
  )
}

export default InvoiceList

// interface and enum for Invoices
export interface Invoice {
  id: number,
  invoice_number: string,
  amount: number,
  due_date: string,
  created_at: string,
  updated_at: string,
  state: string
}
export enum InvoiceStateTypes {
  SHIPPED = 'shipped',
  PAID = 'paid',
  COMPLETE = 'complete',
  CREATED='created',

}

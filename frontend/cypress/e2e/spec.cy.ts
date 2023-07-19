import '../support/commands';
const fakeBody = [{
  id: 1,
  invoice_number: 'INV-001',
  amount: '2689.0',
  due_date: '2023-07-29',
  created_at: '2023-07-19T00:52:57.675Z',
  updated_at: '2023-07-19T00:53:25.167Z',
  state: 'created',
},
{
  id: 2,
  invoice_number: 'INV-002',
  amount: '9238.0',
  due_date: '2023-08-19',
  created_at: '2023-07-19T00:52:57.681Z',
  updated_at: '2023-07-19T00:52:57.681Z',
  state: 'created',
},
{
  id: 3,
  invoice_number: 'INV-003',
  amount: '7892.0',
  due_date: '2023-07-26',
  created_at: '2023-07-19T00:52:57.687Z',
  updated_at: '2023-07-19T00:54:54.238Z',
  state: 'paid',
},
{
  id: 4,
  invoice_number: 'INV-004',
  amount: '1230.0',
  due_date: '2023-07-22',
  created_at: '2023-07-19T00:52:57.692Z',
  updated_at: '2023-07-19T00:52:57.692Z',
  state: 'complete',
},
{
  id: 5,
  invoice_number: 'INV-005',
  amount: '79823.0',
  due_date: '2023-08-02',
  created_at: '2023-07-19T00:52:57.698Z',
  updated_at: '2023-07-19T00:52:57.698Z',
  state: 'paid',
},
{
  id: 6,
  invoice_number: 'INV-006',
  amount: '23489.0',
  due_date: '2023-09-19',
  created_at: '2023-07-19T00:52:57.703Z',
  updated_at: '2023-07-19T00:52:57.703Z',
  state: 'shipped',
}]

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173');

    cy.intercept('GET', 'http://localhost:3000/invoice', {
      statusCode: 200,
      body: fakeBody,
    }).as('getInvoices');
  });

  it('Should load invoices', () => {
    cy.get('[data-testid="invoice-0"]').should('exist');
    cy.get('[data-testid="invoice-1"]').should('exist');
    cy.get('[data-testid="invoice-2"]').should('exist');
    cy.get('[data-testid="invoice-3"]').should('exist');
    cy.get('[data-testid="invoice-4"]').should('exist');
    cy.get('[data-testid="invoice-5"]').should('exist');
  });

  it('Should view invoice details on click', () => {
    cy.get('[data-testid="invoice-5"]').click();
    cy.get('[data-testid="invoice-details"]').should('exist');
  });

  it('Test that on a completed invoice the button is disabled ', () => {
    cy.get('[data-testid="invoice-3"]').click();
    cy.intercept('GET', 'http://localhost:3000/invoices/4', {
      statusCode: 200,
      body: {
        id: 4,
        invoice_number: 'INV-004',
        amount: '1230.0',
        due_date: '2023-07-22',
        created_at: '2023-07-19T00:52:57.692Z',
        updated_at: '2023-07-19T00:52:57.692Z',
        state: 'complete'
      }
    }).as('getInvoiceComplete');
    cy.wait('@getInvoiceComplete')
    cy.get('[data-testid="invoice-details"]').should('exist');
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });

  it('Should be able to pay an invoice', () => {
    cy.get('[data-testid="invoice-0"]').click();
    cy.intercept('GET', 'http://localhost:3000/invoices/1', {
      statusCode: 200,
      body: {
        id: 5,
        invoice_number: 'INV-005',
        amount: '79823.0',
        due_date: '2023-08-02',
        created_at: '2023-07-19T00:52:57.698Z',
        updated_at: '2023-07-19T00:52:57.698Z',
        state: 'created',
      },
    }).as('getInvoicePaying');
    cy.wait('@getInvoicePaying')
    cy.get('[data-testid="invoice-details"]').should('exist');
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="modal"]').should('be.visible');
  });

  it('Invoice in created state should have edit button present', () => {
    cy.get('[data-testid="invoice-0"]').click();
    cy.intercept('GET', 'http://localhost:3000/invoices/1', {
      statusCode: 200,
      body: {
        id: 5,
        invoice_number: 'INV-005',
        amount: '79823.0',
        due_date: '2023-08-02',
        created_at: '2023-07-19T00:52:57.698Z',
        updated_at: '2023-07-19T00:52:57.698Z',
        state: 'created',
      },
    }).as('getInvoicePaying');
    cy.wait('@getInvoicePaying')
    cy.get('[data-testid="invoice-details"]').should('exist');
    cy.get('[data-testid="edit-button"]').click();
  });
  
  it('Should be able to ship an invoice', () => {
    cy.get('[data-testid="invoice-0"]').click();
    cy.intercept('GET', 'http://localhost:3000/invoices/1', {
      statusCode: 200,
      body: {
        id: 5,
        invoice_number: 'INV-005',
        amount: '79823.0',
        due_date: '2023-08-02',
        created_at: '2023-07-19T00:52:57.698Z',
        updated_at: '2023-07-19T00:52:57.698Z',
        state: 'paid',
      },
    }).as('getInvoicePaying');
    cy.wait('@getInvoicePaying')
    cy.get('[data-testid="invoice-details"]').should('exist');
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="snackbar"]').contains('Invoice INV-005 is Shipped');
  });
});



# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

INVOICES = [
  { invoice_number: "INV-001", amount: 2689.00, due_date: Time.now + 10.days, state: 'created' },
  { invoice_number: "INV-002", amount: 9238.00, due_date: Time.now + 1.month, state: 'created' },
  { invoice_number: "INV-003", amount: 7892.00, due_date: Time.now + 7.days, state: 'created' },
  { invoice_number: "INV-004", amount: 1230.00, due_date: Time.now + 3.days, state: 'complete' },
  { invoice_number: "INV-005", amount: 79823.00, due_date: Time.now + 14.days, state: 'paid' },
  { invoice_number: "INV-006", amount: 23489.00, due_date: Time.now + 2.months, state: 'shipped' },
].freeze

Invoice.destroy_all
Invoice.create!(INVOICES)

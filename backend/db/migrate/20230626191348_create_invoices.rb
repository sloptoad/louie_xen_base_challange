class CreateInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :invoices do |t|
      t.string :invoice_number
      t.decimal :amount, precision: 10, scale: 2
      t.date :due_date
      
      t.timestamps
    end
  end
end


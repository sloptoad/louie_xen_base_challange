# frozen_string_literal: true

# Invoice Migration - adds invoice state to invoice table
class AddStateToInvoice < ActiveRecord::Migration[7.0]
  def change
    add_column :invoices, :state, :string, null: false, default: 'created'
  end
end

# frozen_string_literal: true

# Invoice model
class Invoice < ApplicationRecord
  STATES = %w[created paid shipped complete void].freeze

  validates :invoice_number, presence: true, uniqueness: true
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :due_date, presence: true
  validates :state, presence: true, inclusion: { in: STATES }

  def pay!
    update(state: 'paid')
  end

  def ship!
    update(state: 'shipped')
  end

  def complete!
    update(state: 'complete')
  end

  def void!
    update(state: 'void')
  end
end

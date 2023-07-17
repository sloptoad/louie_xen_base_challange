# frozen_string_literal: true

# Invoices Controller
class InvoicesController < ApplicationController
  def index
    @invoices = Invoice.all
    render json: @invoices
  end

  def show
    @invoice = Invoice.find(params[:id])
    render json: @invoice
  end

  def create
    @invoice = Invoice.new(invoice_params)

    if @invoice.save
      render json: @invoice
    else
      render json: { error: 'Error creating invoice' }, status: :bad_request
    end
  end

  def update
    @invoice = Invoice.find(params[:id])

    if !@invoice
      render json: { error: "Could not find invoice id #{params[:id]}" }, status: :not_found
      return
    end

    @invoice.update(invoice_params)

    if @invoice.errors.any?
      render json: { error: 'Error updating invoice', errors: @invoice.errors }, status: :bad_request
    else
      render json: { message: 'Invoice successfully updated', invoice: @invoice }
    end
  end

  def invoice_params
    params.require(:invoice).permit(:invoice_number, :due_date, :amount, :state)
  end

  def complete
    @invoice = Invoice.find(params[:id])

    if !@invoice
      render json: { error: "Could not find invoice id #{params[:id]}" }, status: :not_found
      return
    end

    @invoice.complete!

    if @invoice.errors.any?
      render json: { error: 'Error completing invoice', errors: @invoice.errors }, status: :bad_request
    else
      render json: { message: 'Invoice successfully completed', invoice: @invoice }
    end
  end

  def pay
    @invoice = Invoice.find(params[:id])

    if !@invoice
      render json: { error: "Could not find invoice id #{params[:id]}" }, status: :not_found
      return
    end

    @invoice.pay!

    if @invoice.errors.any?
      render json: { error: 'Error paying invoice', errors: @invoice.errors }, status: :bad_request
    else
      render json: { message: 'Invoice successfully paid', invoice: @invoice }
    end
  end

  def ship
    @invoice = Invoice.find(params[:id])

    if !@invoice
      render json: { error: "Could not find invoice id #{params[:id]}" }, status: :not_found
      return
    end

    @invoice.ship!

    if @invoice.errors.any?
      render json: { error: 'Error shipping invoice', errors: @invoice.errors }, status: :bad_request
    else
      render json: { message: 'Invoice successfully shipped', invoice: @invoice }
    end
  end

  def void
    @invoice = Invoice.find(params[:id])

    if !@invoice
      render json: { error: "Could not find invoice id #{params[:id]}" }, status: :not_found
      return
    end

    @invoice.void!

    if @invoice.errors.any?
      render json: { error: 'Error voiding invoice', errors: @invoice.errors }, status: :bad_request
    else
      render json: { message: 'Invoice successfully voided', invoice: @invoice }
    end
  end
end

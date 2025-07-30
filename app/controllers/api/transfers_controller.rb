class Api::TransfersController < ApplicationController
  def index
    @transfers = Transfer.all
    render json: @transfers
  end

  def create
    ActiveRecord::Base.transaction do
      @transfer = Transfer.create!(sanitized_params)
      is_outbound_of_stop = Stop.find(params[:is_outbound_of])
      is_outbound_of_stop.outbound_id = @transfer.id
      is_outbound_of_stop.save!
      is_inbound_of_stop = Stop.find(params[:is_inbound_of])
      is_inbound_of_stop.inbound_id = @transfer.id
      is_inbound_of_stop.save!
    end
    render json: @transfer, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  def sanitized_params
    params.require(:transfer).permit(:mode, :pickup_point, :departure_time, :arrival_time, :price, :is_outbound_of, :is_inbound_of)
  end
end

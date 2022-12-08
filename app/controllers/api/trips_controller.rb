class Api::TripsController < ApplicationController
  before_action :set_trip, only: %i[show destroy]
  def index
    @trips = Trip.all
    render json: @trips
  end

  def create
    @trip = Trip.new(sanitized_params)
    if @trip.save!
      render json: @trip, status: :created
    else
      render json: @trip.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @trip
  end

  def destroy
    @trip.destroy
  end

  private

  def set_trip
    @trip = Trip.find(params[:id])
  end

  def sanitized_params
    params.require(:trip).permit(:name)
  end
end

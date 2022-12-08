class Api::TripsController < ApplicationController
  before_action :set_trip, only: %i[show]
  def index
    @trips = Trip.all
    render json: @trips
  end

  def show
    render json: @trip
  end

  private

  def set_trip
    @trip = Trip.find(params[:id])
  end
end

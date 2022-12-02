class Api::StopsController < ApplicationController
  def list_per_trip
    @stops = Stop.where(trip_id: params[:trip_id])
    render json: @stops
  end
end

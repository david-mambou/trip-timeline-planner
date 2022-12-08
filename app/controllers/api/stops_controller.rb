class Api::StopsController < ApplicationController
  def list_per_trip
    @stops = Stop.where(trip_id: params[:trip_id])
    render json: @stops
  end

  def list_activities
    @stop = Stop.find(params[:id])
    @activities = @stop.activities
    render json: @activities
  end
end

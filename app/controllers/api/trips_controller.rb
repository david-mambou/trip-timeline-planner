class Api::TripsController < Api::BaseController
  before_action :set_trip, only: %i[show update destroy]
  def index
    @trips = current_user.trips
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

  def update
    @trip.name = sanitized_params[:name]
    if @trip.save!
      render json: @trip, status: :created
    else
      render json: @trip.errors, status: :unprocessable_entity
    end
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

class Api::StopsController < Api::BaseController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  before_action :set_stop, only: %i(add_activity list_activities show update destroy)

  def list_per_trip
    @stops = Stop.where(trip_id: params[:trip_id])
    render json: @stops
  end

  def list_activities
    @activities = @stop.activities
    render json: @activities
  end

  def show
    render json: @stop
  end
  
  def create
    @stop = Stop.new(sanitized_params)

    if @stop.save
      render json: @stop, status: :created
    else
      render json: @stop.errors, status: :unprocessable_entity
    end
  end

  def update
    @stop.update!(sanitized_params)
    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  def add_activity
    @stop.activities << Activity.find(add_remove_activity_params[:activity_id])

    if @stop.save
      render json: @stop, status: :ok
    else
      render json: @stop.errors, status: :unprocessable_entity
    end
  end

  def remove_activity
    activity = Activity.find(add_remove_activity_params[:activity_id])
    @stop.activities.delete(activity) if activity

    if @stop.save
      render json: @stop, status: :ok
    else
      render json: @stop.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @stop = Stop.find(params[:id])
    @stop.destroy
  end

  private

  def set_stop
    @stop = Stop.find(params[:id])
  end

  def add_remove_activity_params
    params.permit(:activity_id)
  end

  def sanitized_params
    params.require(:stop).permit(:name, :start_day, :end_day, :trip_id, :stay_id, :inbound_id, :outbound_id)
  end
end

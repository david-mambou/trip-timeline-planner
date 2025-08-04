class Api::ActivitiesController < Api::BaseController
  def index
    @activities = Activity.all
    render json: @activities
  end

  def create
    @activity = Activity.new(sanitized_params)

    if @activity.save
      render json: @activity, status: :created
    else
      render json: @activity.errors, status: :unprocessable_entity
    end
  end

  private

  def sanitized_params
    params.require(:activity).permit(:name, :price)
  end
end

class Api::StaysController < Api::BaseController
  def index
    @stays = current_user.stays
    render json: @stays
  end

  def create
    @stay = Stay.new(sanitized_params)
    @stay.user = current_user
    @stay.save!
    render json: @stay, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def sanitized_params
    params.require(:stay).permit(:name, :price)
  end
end

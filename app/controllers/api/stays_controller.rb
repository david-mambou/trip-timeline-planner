class Api::StaysController < Api::BaseController
  def index
    @stays = current_user.stays
    render json: @stays
  end
end

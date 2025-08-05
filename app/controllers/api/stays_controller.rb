class Api::StaysController < Api::BaseController
  def index
    @stays = Stay.all
    render json: @stays
  end
end

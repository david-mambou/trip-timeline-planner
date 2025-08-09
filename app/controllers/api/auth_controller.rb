class Api::AuthController < Api::BaseController
  def status
    render json: { logged_in: true }, status: :ok
  end
end

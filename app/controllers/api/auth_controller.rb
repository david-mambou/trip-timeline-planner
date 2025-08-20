class Api::AuthController < Api::BaseController
  def me
    render json: { id: @current_user.id, email: @current_user.email }
  end
  
  def status
    render json: { logged_in: true }, status: :ok
  end
end

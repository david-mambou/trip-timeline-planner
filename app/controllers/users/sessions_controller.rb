class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.find_by(email: params[:user][:email])

    if user&.valid_password?(params[:user][:password])
      sign_in(user)
      render json: {
        message: "Logged in successfully",
        user: user,
        token: request.env['warden-jwt_auth.token']
      }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  private

  def respond_with(resource, _opts = {})
    render json: { token: request.env['warden-jwt_auth.token'], user: resource }
  end

  def respond_to_on_destroy
    head :no_content
  end
end

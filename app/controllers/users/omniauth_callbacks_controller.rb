class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])

    if @user.persisted?
      # For API, you might want to return a JWT token here
      sign_in @user
      render json: { token: current_token, user: @user }, status: :ok
    else
      render json: { error: 'Authentication failed' }, status: :unauthorized
    end
  end

  private

  def current_token
    request.env['warden-jwt_auth.token']
  end
end

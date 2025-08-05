class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])

    if @user.persisted?
      # For API, you might want to return a JWT token here
      sign_in @user
      token = Warden::JWTAuth::UserEncoder.new.call(@user, :user, nil).first
      render json: {
        token: token,
        user: {
          id: @user.id,
          email: @user.email,
          name: @user.name
        }
      }
    else
      render json: { error: 'Authentication failed' }, status: :unauthorized
    end
  end
end

class Api::BaseController < ApplicationController
  before_action :authenticate_user!

  def authenticate_user!
    jwt_secret = Rails.application.credentials.devise_jwt_secret_key
    token = request.headers['Authorization']&.split(' ')&.last
    begin
      payload = JWT.decode(token, jwt_secret, true, algorithm: 'HS256')[0]
      @current_user = User.find(payload["sub"])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      render json: { error: e }, status: :unauthorized
    end
  end
end

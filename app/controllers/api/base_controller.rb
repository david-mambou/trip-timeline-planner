class Api::BaseController < ApplicationController
  before_action :authenticate_user!
  
  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    begin
      payload = JWT.decode(token, Rails.application.secret_key_base)[0]
      @current_user = User.find(payload["sub"])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end

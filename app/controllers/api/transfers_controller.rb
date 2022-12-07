class Api::TransfersController < ApplicationController
  def index
    @transfers = Transfer.all
    render json: @transfers
  end
end

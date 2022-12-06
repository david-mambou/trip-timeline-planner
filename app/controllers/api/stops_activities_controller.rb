class Api::StopsActivitiesController < ApplicationController
  def index
    @stops_activities = StopsActivities.all
    render json: @stops_activities
  end
end

# render the right activities from stops controller instead

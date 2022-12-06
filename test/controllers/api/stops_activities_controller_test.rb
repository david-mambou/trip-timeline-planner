require "test_helper"

class Api::StopsActivitiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_stops_activities_index_url
    assert_response :success
  end
end

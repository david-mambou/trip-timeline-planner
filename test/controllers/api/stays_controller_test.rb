require "test_helper"

class Api::StaysControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_stays_index_url
    assert_response :success
  end
end

require "test_helper"

class Api::TransfersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_transfers_index_url
    assert_response :success
  end
end

require 'test_helper'

class BroadcastersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get broadcasters_index_url
    assert_response :success
  end

  test "should get setup" do
    get broadcasters_setup_url
    assert_response :success
  end

  test "should get show" do
    get broadcasters_show_url
    assert_response :success
  end

  test "should get settings" do
    get broadcasters_settings_url
    assert_response :success
  end

end

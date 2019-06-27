require 'test_helper'

class BroadcastersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @broadcaster = broadcasters(:one)
  end

  test "should get index" do
    get broadcasters_url
    assert_response :success
  end

  test "should get new" do
    get new_broadcaster_url
    assert_response :success
  end

  test "should create broadcaster" do
    assert_difference('Broadcaster.count') do
      post broadcasters_url, params: { broadcaster: { broadcast_key: @broadcaster.broadcast_key, user_id: @broadcaster.user_id } }
    end

    assert_redirected_to broadcaster_url(Broadcaster.last)
  end

  test "should show broadcaster" do
    get broadcaster_url(@broadcaster)
    assert_response :success
  end

  test "should get edit" do
    get edit_broadcaster_url(@broadcaster)
    assert_response :success
  end

  test "should update broadcaster" do
    patch broadcaster_url(@broadcaster), params: { broadcaster: { broadcast_key: @broadcaster.broadcast_key, user_id: @broadcaster.user_id } }
    assert_redirected_to broadcaster_url(@broadcaster)
  end

  test "should destroy broadcaster" do
    assert_difference('Broadcaster.count', -1) do
      delete broadcaster_url(@broadcaster)
    end

    assert_redirected_to broadcasters_url
  end
end

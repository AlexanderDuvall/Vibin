require 'test_helper'

class MusicControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get music_create_url
    assert_response :success
  end

  test "should get edit" do
    get music_edit_url
    assert_response :success
  end

  test "should get new" do
    get music_new_url
    assert_response :success
  end

  test "should get destroy" do
    get music_destroy_url
    assert_response :success
  end

end

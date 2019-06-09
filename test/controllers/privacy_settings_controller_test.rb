require 'test_helper'

class PrivacySettingsControllerTest < ActionDispatch::IntegrationTest
  test "should get edit" do
    get privacy_settings_edit_url
    assert_response :success
  end

  test "should get update" do
    get privacy_settings_update_url
    assert_response :success
  end

end

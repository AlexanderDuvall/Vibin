require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.new(name: "Example",email: "asdf@uh.edu", username: "asdf",password: 'asdf', password_confirmation: "asdf",
                     terms_of_agreement: true , zipcode: 12345, gender: "male", birthday: "11,11,1111")
  end
  test "should get Index" do
    get users_Index_url
    assert_response :success
  end
  test "user_valid" do
   assert @user.valid?
  end


end

require "application_system_test_case"

class BroadcastersTest < ApplicationSystemTestCase
  setup do
    @broadcaster = broadcasters(:one)
  end

  test "visiting the index" do
    visit broadcasters_url
    assert_selector "h1", text: "Broadcasters"
  end

  test "creating a Broadcaster" do
    visit broadcasters_url
    click_on "New Broadcaster"

    fill_in "Broadcast key", with: @broadcaster.broadcast_key
    fill_in "User", with: @broadcaster.user_id
    click_on "Create Broadcaster"

    assert_text "Broadcaster was successfully created"
    click_on "Back"
  end

  test "updating a Broadcaster" do
    visit broadcasters_url
    click_on "Edit", match: :first

    fill_in "Broadcast key", with: @broadcaster.broadcast_key
    fill_in "User", with: @broadcaster.user_id
    click_on "Update Broadcaster"

    assert_text "Broadcaster was successfully updated"
    click_on "Back"
  end

  test "destroying a Broadcaster" do
    visit broadcasters_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Broadcaster was successfully destroyed"
  end
end

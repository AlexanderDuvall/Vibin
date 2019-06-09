class AddTermsOfAgreementToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :Terms_of_Agreement, :boolean, default: true
  end
end

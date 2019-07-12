# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

def time_rand from = 0.0, to = Time.now
    Time.at(from + rand * (to.to_f - from.to_f))
end

genderList = ["Agender","Androgyne","Androgynous",
  "Bigender","Cis","Cisgender","Cis Female","Cis Male",
  "Cis Man","Cis Woman","Cisgender Female",
  "Cisgender Male","Cisgender Man","Cisgender Woman",
  "Female to Male","FTM","Gender Fluid","Gender Nonconforming",
  "Gender Questioning","Gender Variant","Genderqueer",
  "Intersex","Male to Female","MTF","Neither","Neutrois",
  "Non-binary","Other","Pangender","Trans","Trans*",
  "Trans Female","Trans* Female","Trans Male","Trans* Male",
  "Trans Man","Trans* Man","Trans Person","Trans* Person",
  "Trans Woman","Trans* Woman","Transfeminine","Transgender",
  "Transgender Female","Transgender Male","Transgender Man",
  "Transgender Person","Transgender Woman","Transmasculine",
  "Transsexual","Transsexual Female","Transsexual Male",
  "Transsexual Man","Transsexual Person","Transsexual Woman","Two-Spirit"]
puts "llol"
 i = 1000
100.times do
  i  = i + 1
  username = Faker::Science.scientist
  if username.length > 25
    username = username[0..24]
    username = username.gsub(/\s+/, "")
  else
    username = username.gsub(/\s+/, "")
  end
  password = "password"
  location = Faker::Address.full_address #=> "282 Kevin Brook, Imogeneborough, CA 58517"
  locationArray = location.split(",")
  city = locationArray[1].strip
  stateZipcode = locationArray[2].strip
  state = stateZipcode[0,2]
  zipcode = stateZipcode.slice(3..7)
  User.create!({username: "#{username}#{i}", email: Faker::Internet.email,
     name: Faker::Name.name, zipcode: zipcode, password: "#{password}#{i}", password_confirmation: "#{password}#{i}",
      city: city, state: state, birthday: time_rand,
       bio: Faker::Quote.famous_last_words, gender:Faker::Gender.binary_type,
        created_at: time_rand, updated_at: time_rand, Terms_of_Agreement: 1,
         email_confirmed: 1, Verified: 0, activated: 1})
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# create two trips

trip1 = Trip.create(name: "Thailand", user_id: 1)
trip2 = Trip.create(name: "Tohoku", user_id: 1)

# create stays

stay1 = Stay.create(name: "Beach Hotel Patong", price: 1200)
stay2 = Stay.create(name: "Maha Nakhon Hotel", price: 3000)
stay3 = Stay.create(name: "The Hill Chiang Mai", price: 1500)
stay4 = Stay.create(name: "Capsule First Sendai", price: 2500)
stay5 = Stay.create(name: "Business Inn Yamagata", price: 6500)

# create stops

stop1 = Stop.create(name: "Phuket", start_day: Date.new(2024, 4, 8), end_day: Date.new(2024, 4, 14))
stop1.stay = Stay.where(name: "Beach Hotel Patong").first
stop2 = Stop.create(name: "Chiang Mai", start_day: Date.new(2024, 4, 14), end_day: Date.new(2024, 4, 17))
stop2.stay = Stay.where(name: "The Hill Chiang Mai").first
stop3 = Stop.create(name: "Bangkok", start_day: Date.new(2024, 4, 17), end_day: Date.new(2024, 4, 30))
stop3.stay = Stay.where(name: "Maha Nakhon Hotel").first

# associate stops to trips

trip1.stops << [stop1, stop2, stop3]


# create activities

activity1 = Activity.create(name: "Phuket Big Buddha", price: 600,user_id: 1)
activity7 = Activity.create(name: "Freedom Beach", price: 100,user_id: 1)
activity2 = Activity.create(name: "Ayutthaya", price: 1100,user_id: 1)
activity8 = Activity.create(name: "Thai Royal Palace", price: 3000,user_id: 1))
activity3 = Activity.create(name: "Doi Inthanon", price: 900,user_id: 1)
activity4 = Activity.create(name: "Matsushima", price: 1500,user_id: 1)
activity5 = Activity.create(name: "Zao Fox Village", price: 2200,user_id: 1)
activity6 = Activity.create(name: "Yamadera", price: 1300,user_id: 1)

# associate activities to stops

stop1.activities << [activity1, activity7]
stop2.activities << activity3
stop3.activities << [activity2, activity8]

# create transfers

transfer1 = Transfer.create(mode: "flight", departure_time: DateTime.new(2024, 4, 14, 10, 25, 0), arrival_time: DateTime.new(2024, 4, 14, 13, 45, 0), price: 4000, pickup_point: "Chiang Mai Airport")
transfer2 = Transfer.create(mode: "train", departure_time: DateTime.new(2024, 4, 17, 6, 0, 0), arrival_time: DateTime.new(2024, 4, 14, 17, 30, 0), price: 6000, pickup_point: "Chiang Mai Railway Station")

# associate transfers to stops

stop1.outbound = transfer1
stop1.save
stop2.inbound = transfer1
stop2.outbound = transfer2
stop2.save
stop3.inbound = transfer2
stop3.save

print("Successfully seeded!")

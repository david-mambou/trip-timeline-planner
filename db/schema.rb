# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_07_25_152327) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string "name"
    t.float "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stays", force: :cascade do |t|
    t.string "name"
    t.float "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stops", force: :cascade do |t|
    t.string "name"
    t.bigint "trip_id", null: false
    t.date "start_day"
    t.date "end_day"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "stay_id"
    t.index ["stay_id"], name: "index_stops_on_stay_id"
    t.index ["trip_id"], name: "index_stops_on_trip_id"
  end

  create_table "stops_activities", force: :cascade do |t|
    t.bigint "activity_id"
    t.bigint "stop_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_stops_activities_on_activity_id"
    t.index ["stop_id"], name: "index_stops_activities_on_stop_id"
  end

  create_table "stops_transfers", force: :cascade do |t|
    t.bigint "stop_id"
    t.bigint "transfer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stop_id"], name: "index_stops_transfers_on_stop_id"
    t.index ["transfer_id"], name: "index_stops_transfers_on_transfer_id"
  end

  create_table "transfers", force: :cascade do |t|
    t.string "mode"
    t.datetime "departure_time"
    t.datetime "arrival_time"
    t.string "pickup_point"
    t.float "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trips", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "stops", "stays"
  add_foreign_key "stops", "trips"
end

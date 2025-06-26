Rails.application.routes.draw do
  root 'site#index'

  get 'trips', to: 'site#index'
  get 'trips/new', to: 'site#index'
  get 'trips/:id', to: 'site#index'
  get 'trips/:id/stops/:stop_id/activities/add', to: 'site#index'
  get 'trips/:id/stops/new', to: 'site#index'

  namespace :api do
    resources :stops, only: %i(create destroy)
    resources :transfers, only: %i(index)
    resources :stays, only: %i(index)
    resources :activities, only: %i(index create)
    resources :stops_activities, only: %i(index)
    resources :trips, only: %i(index show create)
    get 'stops/:trip_id', to: 'stops#list_per_trip'
    put 'stops/:id/activities/add', to: 'stops#add_activity'
    delete 'stops/:id/activities/:activity_id', to: 'stops#remove_activity'
    get 'stops/:id/activities', to: 'stops#list_activities'
  end
end

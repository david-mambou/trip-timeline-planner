Rails.application.routes.draw do
  root 'site#index'

  get 'trips', to: 'site#index'
  get 'trips/new', to: 'site#index'
  get 'trips/:id', to: 'site#index'
  get 'trips/:id/stops/new', to: 'site#index'

  namespace :api do
    resources :stops, only: %i(create)
    resources :transfers, only: %i(index)
    resources :stays, only: %i(index)
    resources :activities, only: %i(index)
    resources :stops_activities, only: %i(index)
    resources :trips, only: %i(index show create)
    get 'stops/:trip_id', to: 'stops#list_per_trip'
    get 'stops/:id/activities', to: 'stops#list_activities'
  end
end

Rails.application.routes.draw do
  root 'site#index'

  get 'trips', to: 'site#index'
  get 'trips/:id', to: 'site#index'

  namespace :api do
    resources :stays, only: %i(index)
    resources :trips, only: %i(index show)
    get 'stops/:trip_id', to: 'stops#list_per_trip'
  end
end

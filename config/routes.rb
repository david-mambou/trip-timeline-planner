Rails.application.routes.draw do
  root 'site#index'

  namespace :api do
    resources :trips, only: %i(index)
  end
end

MarauderApp::Application.routes.draw do

  root to: "welcome#index"
  resources :users

end

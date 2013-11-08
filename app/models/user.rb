class User < ActiveRecord::Base
  attr_accessible :name, :email, :lat, :lng
end

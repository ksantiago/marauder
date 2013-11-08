class AddLatLong < ActiveRecord::Migration
  def change
    add_column :users, :lat, :float
    add_column :users, :lng, :float


  end

  def down
  end
end

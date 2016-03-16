class CreateGameversions < ActiveRecord::Migration
  def change
    create_table :gameversions do |t|
      t.string :version
      t.timestamps null: false
    end
  end
end

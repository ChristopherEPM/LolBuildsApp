class CreateChampions < ActiveRecord::Migration
  def change
    create_table :champions do |t|

      t.integer :api_id
      t.string :name  
      t.string :key
      t.string :title
      t.string :image 
      t.text :tags 
      t.string :partype 
      t.text :stats
      t.text :spells
      t.text :passive

      t.timestamps null: false
    end
  end
end

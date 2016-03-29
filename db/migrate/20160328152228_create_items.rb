class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|

      t.integer :api_id
      t.string :name
      t.string :group
      t.text :description
      t.text :sanitizedDescription
      t.integer :depth
      t.text :from 
      t.text :into 
      t.text :maps 
      t.string :image 
      t.text :stats 
      t.text :gold 
      t.text :effect

      t.timestamps null: false
    end
  end
end

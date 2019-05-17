class Group < ApplicationRecord
  #Group_userテーブルとのアソシエーション
  has_many :users,through: :group_users  
  has_many :group_users  
  #Comment テーブルのアソシエーション
  has_many :comments
  validates :name, presence: true
end

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  #Group_userテーブルとのアソシエーション
  has_many :groups ,through: :group_users  
  has_many :group_users  
  #Comment テーブルのアソシエーション
  has_many :comments
end

class GroupsController < ApplicationController

  def new
    @group = Group.new
  end
  
  def edit
  end

  def create
    @group = Group.new(group_params)
  end

  def update
  end

  private
  def group_params
    params.require(:user).permit(:name)
  end

end


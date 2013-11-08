class UsersController < ApplicationController

  def index
    @users = User.all

    respond_to do |format|
      format.json { render json: @users }
    end
  end

  def new
    @user = User.new

    respond_to do |format|
      format.json { render json: @user }
    end
  end

  def create
    @user = User.new(params[:user])

    respond_to do |format|
      if @user.save
        format.json { render json: @user }
      else
        format.json { render json: @user.errors, status: unprocessable_entity }
      end
    end
  end

  def show
    @user = User.find(params[:id])

    respond_to  do |format|
      format.json { render json: @user }
    end
  end

  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.json { render json: @user }
      else
        format.json { render json: @user.errors, status: unprocessable_entity }
      end
    end
  end
end

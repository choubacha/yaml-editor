# frozen_string_literal: true

# The strings controller provides basic CRUD functionality for the strings.
class EntitiesController < ApplicationController
  def index
    render json: db.entities.all
  end
end

# frozen_string_literal: true

require 'db'

# The root controller for all other controllers
class ApplicationController < ActionController::API
  rescue_from Dry::Struct::Error, with: :render_input_error

  def db
    @db ||= Db.new([])
  end

  def render_input_error(exception)
    render json: { message: exception.message }, status: 422
  end
end

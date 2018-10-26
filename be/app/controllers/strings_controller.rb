# frozen_string_literal: true

# The strings controller provides basic CRUD functionality for the strings.
class StringsController < ApplicationController
  def index
    render json: db.strings.all
  end

  def create
    attrs = params.permit(%i[key value entity_slug])

    str = Types::Str[attrs.to_h.symbolize_keys]

    db.strings.add(str)
  end

  def show
    str = db.strings.find(params[:id])
    if str
      render json: str
    else
      render json: {}, status: 404
    end
  end

  def update
    str = db.strings.find(params[:id])
    if str
      new_str = str.new(value: params[:value])
      db.strings.update(new_str)

      render json: new_str
    else
      render json: { message: 'String not found' }, status: 404
    end
  end

  def destroy
    str = db.strings.delete(params[:id])
    if str
      render json: str
    else
      render json: { message: 'String not found' }, status: 404
    end
  end
end

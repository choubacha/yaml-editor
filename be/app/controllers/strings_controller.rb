# frozen_string_literal: true

# The strings controller provides basic CRUD functionality for the strings.
class StringsController < ApplicationController
  def index
    entity_slug = params.dig(:filter, :entity_slug)
    strings = if entity_slug.present?
                db.strings.for_entity(entity_slug)
              else
                db.strings.all
              end
    render json: strings
  end

  def create
    attrs = create_attrs
    str = db.strings.find(attrs[:key])
    if str
      render json: { message: 'Key already exists for string' }, status: 422
    else
      str = Types::Str[attrs.to_h.symbolize_keys]

      db.strings.add(str)

      render json: str
    end
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

  private

  def create_attrs
    {
      key: params[:key],
      value: params[:value],
      entity_slug: params[:entity_slug]
    }
  end
end

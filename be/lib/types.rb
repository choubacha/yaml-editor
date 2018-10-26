# frozen_string_literal: true

require 'dry-types'
require 'dry-struct'

# The set of types that are usable in this application.
module Types
  include Dry::Types.module

  # A slug is a unique string value (with no spaces) that can identify a resource.
  Slug = Strict::String.constrained(format: /\A[\w\-]+\z/)

  # A key represents a unique path to a string
  Key = Strict::String.constrained(format: /\A(?!\.)(\.?([\w\-]+))+\z/)

  # A string value is single piece of data associated with a key
  Value = Types::Coercible::String.constrained(min_size: 1)

  # Represents a translatable string with it's associated key.
  class Str < Dry::Struct
    attribute :key, Key
    attribute :value, ::Types::Strict::Array.of(Value).constrained(min_size: 2) | Value
    attribute :entity_slug, Slug
  end

  EntityType = Symbol.enum(:root, :engine, :gem)

  # An entity can be a gem, engine, or root.
  class Entity < Dry::Struct
    attribute :slug, Slug
    attribute :path, String
    attribute :type, EntityType
  end
end

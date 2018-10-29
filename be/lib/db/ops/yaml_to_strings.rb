# frozen_string_literal: true

require 'types'

class Db
  module Ops
    # Takes a YAML payload and converts it into string format.
    class YamlToStrings
      extend Dry::Initializer

      param(:yaml_data)
      option :locale, Types::String, default: -> { 'en' }
      option :entity_slug, Types::Slug, default: -> { 'root' }

      def build
        hash_to_dot(yaml_data[locale]).map do |key, values|
          Types::Str[key: key, value: Array(values), entity_slug: entity_slug]
        end
      end

      private

      def hash_to_dot(object, prefix = nil)
        if object.is_a? Hash
          object.map do |key, value|
            hash_to_dot(value, prefix ? "#{prefix}.#{key}" : key.to_s)
          end.reduce(&:merge)
        else
          { prefix => object }
        end
      end
    end
  end
end

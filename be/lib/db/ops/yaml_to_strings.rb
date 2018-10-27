# frozen_string_literal: true

class Db
  module Ops
    # Takes a YAML payload and converts it into string format.
    class YamlToStrings
      extend Dry::Initializer

      param(:yaml_data)
      option :locale, Types::String, default: -> { 'en' }

      def build
        hash_to_dot(yaml_data[locale])
      end

      private

      def hash_to_dot(object, prefix = nil)
        if object.is_a? Hash
          object.map do |key, value|
            if prefix
              hash_to_dot value, "#{prefix}.#{key}"
            else
              hash_to_dot value, "#{key}"
            end
          end.reduce(&:merge)
        else
          { prefix => object }
        end
      end
    end
  end
end

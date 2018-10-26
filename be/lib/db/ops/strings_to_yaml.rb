# frozen_string_literal: true

class Db
  module Ops
    # Takes a set of strings and converts it into a nest hash suitable for yaml.
    class StringsToYaml
      extend Dry::Initializer

      param(:strings, ->(v) { Types::Array.of(Types::Str).call(v) })
      option :locale, Types::String, default: -> { 'en' }

      def build
        { locale => build_strings }
      end

      private

      def build_strings
        strings
          .sort_by(&:key)
          .each_with_object({}) { |str, obj| nest_under(obj, str, str.key.split('.')) }
      end

      def nest_under(hash, str, keys)
        key = keys.first
        case keys.size
        when 0 then nil # Do nothing
        when 1
          hash[key] = str_value(str)
        else
          hash[key] ||= {}
          nest_under(hash[key], str, keys[1..-1])
        end
        hash
      end

      def str_value(str)
        if str.value.size == 1
          str.value.first
        else
          str.value
        end
      end
    end
  end
end

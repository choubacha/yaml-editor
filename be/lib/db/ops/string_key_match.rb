# frozen_string_literal: true

class Db
  module Ops
    # Takes a set of strings and matches them on a needle.
    class StringKeyMatch
      extend Dry::Initializer

      param(:strings, ->(v) { Types::Array.of(Types::Str).call(v) })
      param :needle, Types::String

      def match
        strings
          .map { |str| [str, measure(str.key)] }
          .reject { |(_str, score)| score.nil? }
          .sort_by { |(_str, score)| -score }
          .map { |(str, _score)| str }
      end

      private

      def measure(string)
        index = 0
        score = 0
        needle.each_char do |needle_char|
          while index < string.size
            curr_char = string[index]
            if curr_char == needle_char
              score += 1
              break
            elsif score >= 1
              score += 1
            end
            index += 1
          end
          return nil if index >= string.size
        end
        score.to_f / index.to_f
      end
    end
  end
end

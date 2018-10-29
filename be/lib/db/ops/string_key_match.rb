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

      # When we measure, we want to provide points for runs of character matches
      # and decrease the score the more distance between matched characters.
      def measure(string) # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
        index = 0
        score = 0

        needle.each_char do |needle_char|
          # Extra points are awarded based on the proximity to the previous character.
          #
          extra_points = 5

          # We want to progress but not passed the end of the OG string.
          while index < string.size
            curr_char = string[index]

            if curr_char == needle_char
              # When we find the needle character we increase the score and stop looking
              score += 1
              break
            else
              # We didn't match, so we lose an extra point
              extra_points -= 1

              # And move along the string.
              index += 1
            end
          end

          # If we got here we can apply extra points if possible and
          # return early if we've gone past the end of the string
          score += extra_points if extra_points.positive?
          return nil if index >= string.size
        end

        # Return the ratio of the index we searched to under the points accumulated
        # The purpose of this is to award points with a slight preference for those
        # that are found closer to the left side of the string.
        score.to_f / index.to_f
      end
    end
  end
end

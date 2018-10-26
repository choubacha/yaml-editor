# frozen_string_literal: true

class Db
  module Ops
    # Takes a set of strings and matches them on a needle.
    class StringKeyMatch
      extend Dry::Initializer

      param(:strings, ->(v) { Types::Array.of(Types::Str).call(v) })
      param :needle, Types::String

      def match
        FuzzyMatch
          .new(strings, read: :key)
          .find_all_with_score(needle)
          .map { |value, *_scores| value }
      end
    end
  end
end

# frozen_string_literal: true

require 'types'

FactoryBot.define do
  factory :str, class: Types::Str do
    before(:create) { raise 'No persistance, just use build' }

    key { Faker::Internet.slug(nil, '.') }
    value do
      Array.new(rand(1..4)).map { Faker::Lorem.paragraph }
    end
    entity_slug { 'root' }

    initialize_with { new(attributes) }
  end
end

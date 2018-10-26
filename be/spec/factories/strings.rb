# frozen_string_literal: true

require 'types'

FactoryBot.define do
  factory :str, class: Types::Str do
    before(:create) { raise 'No persistance, just use build' }

    key { Faker::Internet.slug(nil, '.') }
    value { Faker::Lorem.paragraph }
    entity_slug { Faker::App.name.downcase }

    initialize_with { new(attributes) }
  end
end

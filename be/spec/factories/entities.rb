# frozen_string_literal: true

require 'types'

FactoryBot.define do
  factory :entity, class: Types::Entity do
    before(:create) { raise 'No persistance, just use build' }

    slug { Faker::App.name.gsub(/\s+/, '-').underscore }
    path { Faker::File.file_name }
    type { Types::EntityType.values.sample }

    initialize_with { new(attributes) }
  end
end

# frozen_string_literal: true

# Set your environment variable for seeding and it will load in junk data that is random
if ENV['SEED'] && Rails.env.development?
  require 'factory_bot'
  FactoryBot.find_definitions

  FactoryBot.build_list(:entity, 10).each do |entity|
    STRING_DB.entities.add(entity)
    FactoryBot.build_list(:str, rand(10..100), entity_slug: entity.slug).each do |str|
      STRING_DB.strings.add(str)
    end
  end
end

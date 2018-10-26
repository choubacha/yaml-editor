# frozen_string_literal: true

require 'db'
require 'types'

RSpec.describe Db::Entities do
  let(:entities) { Db::Entities.new }
  let(:entity) do
    Types::Entity[slug: 'web', path: '../repos/taskrabbit/v3', type: :root]
  end

  it 'can add entities' do
    entities.add(entity)

    expect(entities.find('web')).to eq entity
  end

  it 'can find entities' do
    entities.add(entity)

    expect(entities.find('web')).to eq entity
  end

  it 'can delete entities' do
    entities.add(entity)

    expect(entities.find('web')).to eq entity
    expect(entities.delete('web')).to eq entity
    expect(entities.find('web')).to be_nil
  end

  it 'can get all entities' do
    entities.add(entity)

    expect(entities.all).to eq [entity]
  end
end

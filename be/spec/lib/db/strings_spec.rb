# frozen_string_literal: true

require 'db'
require 'types'

RSpec.describe Db::Strings do
  let(:strings) { Db::Strings.new }
  let(:str) { build(:str) }

  it 'can add strings' do
    strings.add(str)

    expect(strings.find(str.key)).to eq str
  end

  it 'can find strings' do
    strings.add(str)

    expect(strings.find(str.key)).to eq str
  end

  it 'can delete strings' do
    strings.add(str)

    expect(strings.find(str.key)).to eq str
    expect(strings.delete(str.key)).to eq str
    expect(strings.find(str.key)).to be_nil
  end

  it 'can get all strings' do
    strings.add(str)

    expect(strings.all).to eq [str]
  end

  it 'can filter by entity slug' do
    strings.add(build(:str, entity_slug: 'slug-a'))
    strings.add(build(:str, entity_slug: 'slug-b'))
    strings.add(build(:str, entity_slug: 'slug-c'))
    strings.add(build(:str, entity_slug: 'slug-a'))

    expect(strings.for_entity('slug-a').size).to eq 2
  end
end

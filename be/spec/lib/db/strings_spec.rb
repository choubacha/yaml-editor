# frozen_string_literal: true

require 'db'
require 'types'

RSpec.describe Db::Strings do
  let(:strings) { Db::Strings.new }
  let(:str) do
    Types::Str[key: 'mykey', value: 'hello world', entity_slug: 'engine']
  end

  it 'can add strings' do
    strings.add(str)

    expect(strings.find('mykey')).to eq str
  end

  it 'can find strings' do
    strings.add(str)

    expect(strings.find('mykey')).to eq str
  end

  it 'can delete strings' do
    strings.add(str)

    expect(strings.find('mykey')).to eq str
    expect(strings.delete('mykey')).to eq str
    expect(strings.find('mykey')).to be_nil
  end

  it 'can get all strings' do
    strings.add(str)

    expect(strings.all).to eq [str]
  end
end

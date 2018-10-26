# frozen_string_literal: true

require 'spec_helper'
require 'db'

RSpec.describe Db::Ops::StringsToYaml do
  let(:strings) do
    [
      build(:str, key: 'd.d.c.b', value: '5'),
      build(:str, key: 'd.c.a.a', value: '4'),
      build(:str, key: 'c.b',     value: '3'),
      build(:str, key: 'b.c',     value: '2'),
      build(:str, key: 'a.a.b.a', value: '1')
    ]
  end

  it 'puts the values with the leaf key.' do
    expect(Db::Ops::StringsToYaml.new(strings).build)
      .to eq(
        'en' => {
          'a' => {
            'a' => {
              'b' => {
                'a' => '1'
              }
            }
          },
          'b' => {
            'c' => '2'
          },
          'c' => {
            'b' => '3'
          },
          'd' => {
            'c' => {
              'a' => {
                'a' => '4'
              }
            },
            'd' => {
              'c' => {
                'b' => '5'
              }
            }
          }
        }
      )
  end

  it 'maintains the correct order' do
    hash = Db::Ops::StringsToYaml.new(strings).build['en']
    expect(hash.keys).to eq(%w[a b c d])
    expect(hash['d'].keys).to eq(%w[c d])
  end

  it 'can take a locale and nests everything under it' do
    hash = Db::Ops::StringsToYaml.new(strings, locale: 'en-GB').build
    expect(hash.keys).to eq(['en-GB'])
  end
end

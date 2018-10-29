# frozen_string_literal: true

require 'spec_helper'
require 'db'

RSpec.describe Db::Ops::YamlToStrings do
  let(:strings) do
    [
      build(:str, key: 'd.d.c.b', value: ['5']),
      build(:str, key: 'd.c.a.a', value: ['4']),
      build(:str, key: 'c.b',     value: ['3']),
      build(:str, key: 'b.c',     value: ['2']),
      build(:str, key: 'a.a.b.a', value: ['1'])
    ]
  end

  let(:yaml_data) do
    {
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
    }
  end

  it 'puts the values with the leaf key.' do
    expect(Db::Ops::YamlToStrings.new(yaml_data).build)
      .to match_array(strings)
  end

  context 'with list data' do
    let(:strings) do
      [
        build(:str, key: 'single', value: ['single'], entity_slug: 'root'),
        build(:str, key: 'list',   value: %w[many different values])
      ]
    end

    let(:yaml_data) do
      {
        'en' => {
          'single' => 'single',
          'list' => %w[many different values]
        }
      }
    end

    it 'puts the values with the leaf key.' do
      expect(Db::Ops::YamlToStrings.new(yaml_data).build)
        .to match_array(strings)
    end
  end

  context 'with a different entity slug' do
    let(:yaml_data) { { 'en' => { 'single' => 'single' } } }

    it 'puts the specified slug into the strings' do
      strings = Db::Ops::YamlToStrings.new(yaml_data, entity_slug: 'test').build
      expect(strings.first.entity_slug).to eq 'test'
    end
  end
end

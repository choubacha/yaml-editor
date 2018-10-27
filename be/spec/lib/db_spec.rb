# frozen_string_literal: true

require 'rails_helper'
require 'fakefs/spec_helpers'

RSpec.describe Db do
  include FakeFS::SpecHelpers

  let(:files) { [root_file_path, engine_file_path, gem_file_path] }
  let(:root_file_path)   { 'fake_app/config/locales/en.yml' }
  let(:engine_file_path) { 'fake_app/apps/web/config/locales/en.yml' }
  let(:gem_file_path)    { 'fake_app/gems/backend/config/locales/en.yml' }

  subject(:db) { Db.new(files) }

  before { create_fake_app }

  describe '#scan!' do
    let(:expected_entities) do
      [
        build(:entity, slug: 'root', path: root_file_path, type: :root),
        build(:entity, slug: 'engine-web', path: engine_file_path, type: :engine),
        build(:entity, slug: 'gem-backend', path: gem_file_path, type: :gem)
      ]
    end

    let(:expected_strings) do
      [
        build(:str, key: 'success', value: ['Hello, root!'], entity_slug: 'root'),
        build(:str, key: 'nested.success', value: ['More, root!'], entity_slug: 'root'),
        build(:str, key: 'web.success', value: ['Hello, engine!'], entity_slug: 'engine'),
        build(:str, key: 'web.nested.success', value: ['More, engine!'], entity_slug: 'engine'),
        build(:str, key: 'backend.success', value: ['Hello, gem!'], entity_slug: 'gem'),
        build(:str, key: 'backend.nested.success', value: ['More, gem!'], entity_slug: 'gem')
      ]
    end

    before { db.scan! }

    it 'creates entities for each yml type' do
      expected_entities.each do |entity|
        expect(db.entities.find(entity.slug)).to_not be_nil
      end
    end

    it 'creates strings for each entity' do
      expected_strings.each do |string|
        expect(db.strings.find(string.key)).to_not be_nil
      end
    end
  end

  describe '#dump' do
    let(:changed_root_string) do
      build(:str, key: 'success', value: ['root changed'], entity_slug: 'root')
    end

    let(:changed_engine_string) do
      build(:str, key: 'web.nested.success', value: ['engine changed'], entity_slug: 'engine-web')
    end

    let(:new_gem_string) do
      build(:str, key: 'backend.something.new', value: ['new gem'], entity_slug: 'gem-backend')
    end

    it 'writes the changes to each yaml file' do
      db.scan!
      db.strings.update(changed_root_string)
      db.strings.update(changed_engine_string)
      db.strings.add(new_gem_string)

      db.dump

      expect(YAML.safe_load(File.read(root_file_path))).to eq(
        'en' => {
          'nested' => {
            'success' => 'More, root!'
          },
          'success' => 'root changed'
        }
      )

      expect(YAML.safe_load(File.read(engine_file_path))).to eq(
        'en' => {
          'web' => {
            'nested' => {
              'success' => 'engine changed'
            },
            'success' => 'Hello, engine!'
          }
        }
      )

      expect(YAML.safe_load(File.read(gem_file_path))).to eq(
        'en' => {
          'backend' => {
            'nested' => {
              'success' => 'More, gem!'
            },
            'something' => {
              'new' => 'new gem'
            },
            'success' => 'Hello, gem!'
          }
        }
      )
    end

    it 'can write to only one file' do
      db.scan!
      db.strings.update(changed_root_string)
      db.strings.update(changed_engine_string)

      db.dump(only_entity: "engine-web")

      # Unchanged root yaml file
      expect(YAML.safe_load(File.read(root_file_path))).to eq(
        'en' => {
          'nested' => {
            'success' => 'More, root!'
          },
          'success' => 'Hello, root!'
        }
      )

      expect(YAML.safe_load(File.read(engine_file_path))).to eq(
        'en' => {
          'web' => {
            'nested' => {
              'success' => 'engine changed'
            },
            'success' => 'Hello, engine!'
          }
        }
      )
    end
  end
end

def create_fake_app
  FileUtils.mkdir_p(['fake_app/config/locales',
                     'fake_app/apps/web/config/locales',
                     'fake_app/gems/backend/config/locales'])

  path = File.expand_path('../fixtures/files', __dir__)
  FakeFS::FileSystem.clone("#{path}/root.yml", 'fake_app/config/locales/en.yml')
  FakeFS::FileSystem.clone("#{path}/engine.yml", 'fake_app/apps/web/config/locales/en.yml')
  FakeFS::FileSystem.clone("#{path}/gem.yml", 'fake_app/gems/backend/config/locales/en.yml')
end

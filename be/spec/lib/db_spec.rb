# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Db do
  let(:files) { [root_file_path, engine_file_path, gem_file_path] }

  let(:root_file_path) { file_fixture('config/locales/en.yml').realpath.to_s }
  let(:engine_file_path) { file_fixture('apps/web/config/locales/en.yml').realpath.to_s }
  let(:gem_file_path) { file_fixture('gems/backend/config/locales/en.yml').realpath.to_s }

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

  let(:db) { Db.new(files) }

  describe '#scan!' do
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
    let(:db) { Db.new([root_file_path]) }
    let(:new_string) do
      build(:str, key: "success", value: ["yay"], entity_slug: 'root')
    end

    before { files.each { |path| FileUtils.cp(path, "#{path}.backup")} }

    after do
      files.each { |path| FileUtils.cp("#{path}.backup", path) }
      files.each { |path| FileUtils.rm("#{path}.backup") }
    end

    it 'writes the yaml file back out to its original path' do
      db.scan!
      db.strings.update(new_string)
      db.dump

      expect { db.scan! }.to_not change { db.strings.all.size }

      expect(db.strings.find("success").value).to eq(new_string.value)
      expect(db.strings.find("nested.success").value).to eq(["More, root!"])
      expect(File.exists?(root_file_path)).to be_truthy
    end
  end
end

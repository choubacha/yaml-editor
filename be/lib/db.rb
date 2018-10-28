# frozen_string_literal: true

require 'types'
require 'db/strings'
require 'db/entities'
require 'db/ops'
# require 'db/entities'

# An instance of Db can be used to store the state of the keys and strings in memory. Use it to
# reload the db, flush to disk, get the strings, get the entities, and fetch particular ones.
class Db
  attr_reader :entities, :strings

  def initialize(files)
    @files = files
    @entities = Entities.new
    @strings = Strings.new
  end

  # TODO: support array values
  # Loads the current known directory and replaces the contents of the database.
  def scan!
    @files.each do |file_path|
      create_entity(file_path)
      create_strings(file_path)
    end
  end

  # Writes out the yaml files. If an entity is specified it will only dump that entity.
  # TODO: We may be able to use YAML::Store here
  def dump(only_entity: nil)
    eligible = only_entity.present? ? [entities.find(only_entity)] : entities.all

    eligible.each do |entity|
      File.open(entity.path, 'w+') do |file|
        file << Db::Ops::StringsToYaml.new(strings.for_entity(entity.slug))
          .build.to_yaml
      end
    end
  end

  private

  def flush!
    @entities = Entities.new
    @strings = Strings.new
  end

  def create_entity(file_path)
    entities.add Types::Entity[
      slug: slug(file_path),
      display: display(file_path),
      path: file_path,
      type: type(file_path)
    ]
  end

  def create_strings(file_path)
    yaml_data = YAML.safe_load(File.read(file_path))
    Db::Ops::YamlToStrings.new(yaml_data).build.each do |key, value|
      strings.add Types::Str[
        key: key,
        value: [value],
        entity_slug: slug(file_path)
      ]
    end
  end

  def display(file_path)
    case type(file_path)
    when :root
      'root'
    when :engine
      file_path.match(%r{/apps/(?<name>\w+)/})[:name]
    when :gem
      file_path.match(%r{gems/(?<name>\w+)/})[:name]
    end
  end

  def slug(file_path)
    "#{type(file_path)}#{name(file_path)}"
  end

  def type(file_path)
    if file_path.match? '/apps'
      :engine
    elsif file_path.match? '/gems'
      :gem
    else
      :root
    end
  end

  def name(file_path)
    case type(file_path)
    when :engine
      "-#{file_path.match(%r{/apps/(?<name>\w+)/})[:name]}"
    when :gem
      "-#{file_path.match(%r{gems/(?<name>\w+)/})[:name]}"
    end
  end
end

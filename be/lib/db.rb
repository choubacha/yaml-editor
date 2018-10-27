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

  # TODO support array
  # Loads the current known directory and replaces the contents of the database.
  def scan!
    @entities = Entities.new
    @strings = Strings.new
    @files.each do |file_path|
      entities.add Types::Entity[
        slug: slug(file_path),
        path: file_path,
        type: type(file_path)
      ]

      yaml_data = YAML.load(File.read(file_path))

      hash_to_dot(yaml_data["en"]).each do |key, value|
        strings.add Types::Str[key: key, value: [value], entity_slug: slug(file_path)]
      end
    end
  end

  # Writes out the yaml files. If an entity is specified it will only dump that entity.
  def dump(only_entity: nil, target: nil)
    _entities = only_entity.present? ? [only_entity] : entities.all

    _entities.each do |entity|
      _strings = strings.for_entity(entity.slug)
      File.open(entity.path, "w+") do |file|
        file << Db::Ops::StringsToYaml.new(_strings).build.to_yaml
      end
    end
  end

  private

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

  def hash_to_dot(object, prefix = nil)
    if object.is_a? Hash
      object.map do |key, value|
        if prefix
          hash_to_dot value, "#{prefix}.#{key}"
        else
          hash_to_dot value, "#{key}"
        end
      end.reduce(&:merge)
    else
      {prefix => object}
    end
  end

end

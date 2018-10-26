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

  # Loads the current known directory and replaces the contents of the database.
  def scan!
    # TODO
  end

  # Writes out the yaml files. If an entity is specified it will only dump that entity.
  def dump(entity: nil)
    # TODO
  end
end

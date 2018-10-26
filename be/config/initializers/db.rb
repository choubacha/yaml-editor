# frozen_string_literal: true

# This initializer loads the database and puts it into a constant for later use.
require 'db'
STRING_DB = Db.new([])

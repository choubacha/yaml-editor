# frozen_string_literal: true

# This initializer loads the database and puts it into a constant for later use.
require 'db'

# TODO: Extract the config search out and make it extensible
root_dir = ENV.fetch('ROOT_PATH', "./../fake_app")
STRING_DB = Db.new(Dir.glob("#{root_dir}/**/config/locales/en.yml"))
STRING_DB.scan!

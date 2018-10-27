# frozen_string_literal: true

require 'dry-initializer'

class Db
  # This module contains the basic db operations that we use.
  module Ops
  end
end

require 'db/ops/strings_to_yaml'
require 'db/ops/yaml_to_strings'
require 'db/ops/string_key_match'

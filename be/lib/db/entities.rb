# frozen_string_literal: true

class Db
  # Encapsulates the set of entities in memory
  class Entities
    def initialize
      @entities = {}
    end

    def add(entity)
      @entities[entity.slug] = entity
    end

    def update(entity)
      @entities[entity.slug] = entity
    end

    def find(slug)
      @entities[slug]
    end

    def delete(slug)
      @entities.delete(slug)
    end

    def all
      @entities.values
    end
  end
end

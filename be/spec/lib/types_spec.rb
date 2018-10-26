# frozen_string_literal: true

require 'types'

RSpec.describe Types do
  describe Types::Slug do
    it 'cannot have spaces' do
      expect { Types::Slug['abc def'] }
        .to raise_error(Dry::Types::ConstraintError)
    end

    it 'allows hyphens' do
      expect(Types::Slug['some-slug']).to eq 'some-slug'
    end

    it 'allows underscores' do
      expect(Types::Slug['some_slug']).to eq 'some_slug'
    end
  end

  describe Types::Key do
    it 'cannot have spaces' do
      expect { Types::Key['abc def'] }
        .to raise_error(Dry::Types::ConstraintError)
    end

    it 'allows hyphens' do
      expect(Types::Key['some-key']).to eq 'some-key'
    end

    it 'allows underscores' do
      expect(Types::Key['some_key']).to eq 'some_key'
    end

    it 'can have many segments' do
      expect(Types::Key['path.to.the.key']).to eq 'path.to.the.key'
    end

    it 'cannot begin or end with a period' do
      expect { Types::Key['path.'] }
        .to raise_error(Dry::Types::ConstraintError)
      expect { Types::Key['.path'] }
        .to raise_error(Dry::Types::ConstraintError)
    end
  end
end

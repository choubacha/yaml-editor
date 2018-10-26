# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Entities', type: :request do
  # TODO: Change to work with a scanned directory?
  let(:db) { Db.new([]) }

  before do
    allow_any_instance_of(ApplicationController)
      .to receive(:db)
      .and_return(db)
  end

  context 'index' do
    let(:entity) do
      Types::Entity[slug: 'web', path: '../repos/taskrabbit/v3', type: :root]
    end

    before do
      db.entities.add(entity)
    end

    it 'returns the entities' do
      get '/entities'

      expect(response).to be_successful

      expect(JSON[response.body]).to eq([JSON[entity.to_json]])
    end
  end
end

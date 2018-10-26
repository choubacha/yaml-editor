# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'String management', type: :request do
  # TODO: Change to work with a scanned directory?
  let(:db) { Db.new([]) }

  before do
    allow_any_instance_of(ApplicationController)
      .to receive(:db)
      .and_return(db)
  end

  context 'creation' do
    it 'can create a string' do
      post '/strings', params: { key: 'my.key', value: 'some string!', entity_slug: 'backend' }

      expect(response).to be_successful
      expect(db.strings.find('my.key').value).to eq 'some string!'
    end

    context 'with invalid inputs' do
      it 'handles missing keys' do
        post '/strings', params: { key: 'my.key', value: 'some string!' }

        expect(response.status).to eq 422

        expect(db.strings.all).to be_empty
      end

      it 'handles invalid data' do
        post '/strings', params: { key: 'my key', value: 'some string!', entity_slug: 'backend' }

        expect(response.status).to eq 422

        expect(db.strings.all).to be_empty
      end
    end
  end

  context 'updating' do
    let(:str) do
      Types::Str[key: 'my.key', value: 'old', entity_slug: 'backend']
    end

    before do
      db.strings.add(str)
    end

    it 'can create a string' do
      put '/strings/my.key', params: { value: 'new' }

      expect(response).to be_successful

      expect(db.strings.find('my.key').value).to eq 'new'
    end

    context 'with invalid inputs' do
      it 'handles record not found' do
        put '/strings/my.other.key', params: { value: 'new' }

        expect(response.status).to eq 404
        expect(JSON[response.body]).to eq('message' => 'String not found')
      end

      it 'handles missing json keys' do
        put '/strings/my.key', params: {}

        expect(response.status).to eq 422

        expect(db.strings.find('my.key').value).to eq 'old'
      end
    end
  end

  context 'index' do
    let(:str) do
      Types::Str[key: 'my.key', value: 'old', entity_slug: 'backend']
    end

    before do
      db.strings.add(str)
    end

    it 'returns the strings' do
      get '/strings'

      expect(response).to be_successful

      expect(JSON[response.body]).to eq([str.to_h.stringify_keys])
    end
  end

  context 'deletion' do
    let(:str) do
      Types::Str[key: 'my.key', value: 'old', entity_slug: 'backend']
    end

    before do
      db.strings.add(str)
    end

    it 'can delete the existing key' do
      delete '/strings/my.key'

      expect(response).to be_successful

      expect(db.strings.all).to be_empty
    end

    it 'returns 404 if key is missing' do
      delete '/strings/my.other.key'

      expect(response.status).to eq 404
      expect(JSON[response.body]).to eq('message' => 'String not found')
    end
  end
end

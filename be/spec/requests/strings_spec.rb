# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'String management', type: :request do
  # TODO: Change to work with a scanned directory?
  let(:db) { Db.new([]) }

  before do
    stub_const("STRING_DB", db)
    allow(db).to receive(:dump)
  end

  context 'creation' do
    it 'can create a string' do
      post '/strings', params: { key: 'my.key', value: ['some string!'], entity_slug: 'backend' }

      expect(response).to be_successful
      expect(db.strings.find('my.key').value).to eq ['some string!']
      expect(db).to have_received(:dump)
    end

    it 'can create a string with multiple values' do
      post '/strings', params: { key: 'my.key', value: ['some string!', 'another string!'], entity_slug: 'backend' }

      expect(response).to be_successful
      expect(db.strings.find('my.key').value).to eq ['some string!', 'another string!']
      expect(db).to have_received(:dump)
    end

    context 'with invalid inputs' do
      it 'handles double creation' do
        post '/strings', params: { key: 'my.key', value: ['some string!'], entity_slug: 'backend' }

        expect(response).to be_successful
        expect(db.strings.find('my.key').value).to eq ['some string!']

        post '/strings', params: { key: 'my.key', value: ['some string!'], entity_slug: 'backend' }
        expect(response.status).to eq 422
        expect(JSON[response.body]).to eq('message' => 'Key already exists for string')
        expect(db).to have_received(:dump).once
      end

      it 'handles missing keys' do
        post '/strings', params: { key: 'my.key', value: ['some string!'] }

        expect(response.status).to eq 422

        expect(db.strings.all).to be_empty
      end

      it 'handles invalid data' do
        post '/strings', params: { key: 'my key', value: ['some string!'], entity_slug: 'backend' }

        expect(response.status).to eq 422

        expect(db.strings.all).to be_empty
      end
    end
  end

  context 'updating' do
    let(:str) do
      Types::Str[key: 'my.key', value: ['old'], entity_slug: 'backend']
    end

    before do
      db.strings.add(str)
    end

    it 'can create a string' do
      put '/strings/my.key', params: { value: ['new'] }

      expect(response).to be_successful

      expect(db.strings.find('my.key').value).to eq ['new']
      expect(db).to have_received(:dump)
    end

    context 'with invalid inputs' do
      it 'handles record not found' do
        put '/strings/my.other.key', params: { value: ['new'] }

        expect(response.status).to eq 404
        expect(JSON[response.body]).to eq('message' => 'String not found')
        expect(db).to_not have_received(:dump)
      end

      it 'handles missing json keys' do
        put '/strings/my.key', params: {}

        expect(response.status).to eq 422

        expect(db.strings.find('my.key').value).to eq ['old']
      end
    end
  end

  context 'index' do
    let(:str) do
      Types::Str[key: 'my.key', value: ['old'], entity_slug: 'backend']
    end

    before do
      db.strings.add(str)
    end

    it 'returns the strings' do
      get '/strings'

      expect(response).to be_successful

      expect(JSON[response.body]).to eq([str.to_h.stringify_keys])
      expect(db).to_not have_received(:dump)
    end

    context 'filtering by entity' do
      before do
        build_list(:str, 4, entity_slug: 'myslug').each do |str|
          db.strings.add(str)
        end
      end

      it 'returns only those strings in that entity' do
        get '/strings', params: { filter: { entity_slug: 'myslug' } }

        strs = JSON[response.body]
        expect(strs.size).to eq 4
        expect(strs.map { |str| str['entity_slug'] }).to eq(%w[myslug myslug myslug myslug])
      end
    end

    context 'filtering by match' do
      let(:strings) do
        [
          build(:str, key: 'apple.banana'),
          build(:str, key: 'banana.apple'),
          build(:str, key: 'peanut.butter.apple.banana'),
          build(:str, key: 'peanut.butter')
        ]
      end

      before do
        db.strings.delete(str.key)
        strings.each { |str| db.strings.add(str) }
      end

      it 'returns only those strings that match' do
        get '/strings', params: { filter: { match: 'apple' } }

        strs = JSON[response.body]
        expect(strs.size).to eq 3
      end
    end
  end

  context 'deletion' do
    let(:str) do
      Types::Str[key: 'my.key', value: ['old'], entity_slug: 'backend']
    end

    before do
      db.strings.add(str)
    end

    it 'can delete the existing key' do
      delete '/strings/my.key'

      expect(response).to be_successful

      expect(db.strings.all).to be_empty
      expect(db).to have_received(:dump)
    end

    it 'returns 404 if key is missing' do
      delete '/strings/my.other.key'

      expect(response.status).to eq 404
      expect(JSON[response.body]).to eq('message' => 'String not found')
    end
  end
end

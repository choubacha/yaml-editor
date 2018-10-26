# frozen_string_literal: true

require 'spec_helper'
require 'db'

RSpec.describe Db::Ops::StringKeyMatch do
  let(:str_a) { build(:str, key: 'apple.banana') }
  let(:str_b) { build(:str, key: 'banana.apple') }
  let(:str_c) { build(:str, key: 'peanut.butter.apple.banana') }
  let(:str_d) { build(:str, key: 'peanut.butter') }
  let(:strings) { [str_a, str_b, str_c, str_d] }
  let(:matcher) { Db::Ops::StringKeyMatch.new(strings, term) }
  let(:results) { matcher.match }

  context 'when term is a value' do
    let(:term) { 'apple' }

    it 'matches on each char' do
      expect(results.size).to eq 3
      expect(results.first).to be_a Types::Str
    end
  end
end

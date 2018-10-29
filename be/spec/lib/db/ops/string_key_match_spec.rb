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

  context 'when term is fully inside each' do
    let(:term) { 'apple' }

    it 'matches on each char' do
      expect(results.size).to eq 3
      expect(results.first).to be_a Types::Str
    end

    it 'ranks them based on how left-most the match is' do
      expect(results).to eq([str_a, str_b, str_c])
    end
  end

  context 'when the term is spread out' do
    let(:term) { 'appna' }

    it 'ranks them based on the least spread out' do
      expect(results).to eq([str_a, str_c])
    end
  end
end

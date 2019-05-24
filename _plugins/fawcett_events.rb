require 'json'
require 'open-uri'
require 'uri'

module Fawwcett_Events
  class Generator < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      headers = { "Authorization" => 'Bearer ' + ENV['EVENTBRITE_TOKEN'] }
      uri = URI.parse('https://www.eventbriteapi.com/v3/organizations/217989441861/events/')
      uri.query = URI.encode_www_form({ :order_by => "start_desc" })
      site.data['events'] = JSON.load(open(uri, headers))
    end
  end
end
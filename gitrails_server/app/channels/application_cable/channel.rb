module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def subscribed
      puts "subscribed"
    end

    def unsubscribed
      puts "unsubscribed"
    end
  end
end

require 'open-uri'

namespace :tfl_apis do
  desc "fetching xml feed from tfl apis"
  task :cameras => :environment do
    url = "http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/jamcams-camera-list.xml"
    doc = Nokogiri::HTML(open(url))
    Camera.delete_all
    doc.css("camera").each do |camera|
      camera =Camera.create({
        available: camera.attribute("available").to_s,
        file: camera.css("file").text,
        lat: camera.css("lat").text,
        lng: camera.css("lng").text,
        postcode: camera.css("postcode").text,
        location: camera.css("location").text
      })
    end
  end
end

 # :available
 # :file
 # :lat
 # :lng
 # :postcode
 # :location

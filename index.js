
function Utils() {}
        Utils.prototype = {
            constructor: Utils,
            isElementInView: function (element, fullyInView) {
                var pageTop = $(window).scrollTop();
                var pageBottom = pageTop + $(window).height();
                var elementTop = $(element).offset().top;
                var elementBottom = elementTop + $(element).height();

                if (fullyInView === true) {
                    return ((pageTop < elementTop) && (pageBottom > elementBottom));
                } else {
                    return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
                }
            }
        };

var Utils = new Utils();
$(window).on('load', addFadeIn());

$(window).scroll(function() {
    addFadeIn(true);
});

function addFadeIn(repeat) {
            var classToFadeIn = ".will-fadeIn";
            
            $(classToFadeIn).each(function( index ) {
                var isElementInView = Utils.isElementInView($(this), false);
                if (isElementInView) {
                    if(!($(this).hasClass('fadeInRight')) && !($(this).hasClass('fadeInLeft'))) {
                        if(index % 2 == 0) $(this).addClass('fadeInRight');
                        else $(this).addClass('fadeInLeft');
                    }
                } else if(repeat) {
                    $(this).removeClass('fadeInRight');
                    $(this).removeClass('fadeInLeft');
                }
            });
        }
function drawCountyBoundary(q)
{
    url = `https://nominatim.openstreetmap.org/search.php?q=${q}&polygon_geojson=1&format=jsonv2`
    fetch(url).then(function(response) {
    return response.json();
    })
    .then(function(json) {
    geojsonFeature = json[0].geojson;
    L.geoJSON(geojsonFeature).addTo(map);
    });
}
var map = L.map('map').setView([-8.1744, 110.7655], 13);
let scrollpos = window.scrollY
const header = document.querySelector(".navbar")
const header_height = header.offsetHeight

const add_class_on_scroll = () => header.classList.add("scrolled")
const remove_class_on_scroll = () => header.classList.remove("scrolled")

window.addEventListener('scroll', function() { 
    scrollpos = window.scrollY;

    if (scrollpos >= header_height) { add_class_on_scroll() }
    else { remove_class_on_scroll() }

    
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
drawCountyBoundary('tileng')

var circle = L.circle([-8.17407,110.75958], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 250
}).addTo(map);
circle.bindPopup("<b>Dusun Ngasem</b>").openPopup();


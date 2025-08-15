$(function() {
    replaceContentFromUrl('#main', 'pages/main.html');
});

function replaceContentFromUrl(selector, url, callback) {
    $.get(url, function(data) {
        var tempDiv = $('<div>').html(data);
        var newContent = tempDiv.children().first().length ? tempDiv.children().first() : tempDiv;

        var $target = $(selector);
        if ($target.length && newContent.length) {
            $target.html(newContent.html());
        }
        if(callback && typeof callback === 'function') {
            callback();
        }
    }).fail(function() {
        console.error('No se pudo obtener el contenido');
    });
}

function setActiveNav(el, url, event, callback) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    var $links = $('#nav ul.links li');
    $links.removeClass('active');
    $(el).parent().addClass('active');

    if (url && url !== window.location.pathname) {
        replaceContentFromUrl('#main', url, callback);
        var $navPanel = $('#navPanel');
        if ($navPanel.length && $('body').hasClass('is-navPanel-visible')) {
            // mover el scroll hasta #main
            $('html, body').animate({
              scrollTop: $('#main').offset().top
            }, 500);
            if ($navPanel.data('hidePanel')) {
              $navPanel.data('hidePanel')();
            }
        }
        return false;
    }
    return true;
}

function openMap(el, event) {
    setActiveNav(el, '/pages/map.html', event, () => {
        OpenSeadragon({
				id: "openseadragon1",
				prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
				tileSources: {
					type: 'image',
					url: 'images/map.png'
				},
				showNavigator: true,
				defaultZoomLevel: 1,
				minZoomLevel: 0.5,
				maxZoomLevel: 10,
				gestureSettingsMouse: {
					scrollToZoom: true,
					clickToZoom: true,
					dblClickToZoom: true,
					pinchToZoom: true,
					flickEnabled: true
				}
			});
    });
}

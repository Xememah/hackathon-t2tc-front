export default function generateTooltip(place, pict) {
	let content = '<h2>' + place.name + '</h2><div class="tooltip-wrapper"><ul class="tooltip-list">'
	for (let pictogram of place.pictograms) {
		content += '<li>' + pict[pictogram] + '</li>'
	}
	content += '</ul><ul class="tooltip-list tooltip-list-contact"><li><strong>' + place.basics.street + '</strong></li>'
	if (place.basics.phones && place.basics.phones[0]) {
		content += '<li><a href="tel:' + place.basics.phones[0] + '">' + place.basics.phones[0] + '</a></li>'
	}
	if (place.basics.website) {
		content += '<li><a href="' + place.basics.website + '">' + place.basics.website + '</a></li>'
	}
	if (place.basics.email) {
		content += '<li><a href="mailto:' + place.basics.email + '">' + place.basics.email + '</a></li>'
	}
	if (place.basics.opening_hours) {
		content += '<li>' + place.basics.opening_hours + '</li>'
	}
	content += '</ul><p>Dodatkowe informacje: '
	if (place.main_entrance) {
		if (place.main_entrance.bell) {
			content += 'dzwonek, '
		}
		if (place.main_entrance.handrail) {
			content += 'poręcz, '
		}
		if (place.main_entrance.width) {
			content += 'szerokość drzwi: ' + place.main_entrance.width + 'cm, '
		}
	}
	if (place.access && place.access[0]) {
		let min = place.access[0].distance
		for (let access of place.access) {
			if (access.distance < min) {
				min = access.distance
			}
		}
		if (min) {
			content += min + 'm od najbliższego przystanku, '
		}
	}

	//remove , 
	if (content.endsWith(", ")) {
		content = content.substr(0, content.length - 2)
	}

	content += '</p><a target="_blank" href="http://www.niepelnosprawnik.pl/' + place.id + '" class="button">Zapoznaj się z audytem</a></div>'
    return content
}

var stat = {
  'serial': "",
  'maxSeasons': "",
  'maxEpisodes': "",
  'currentSeason': "",
  'currentEpisode': ""
}

$(document).ready(function () {
  if ($('div#videoplayer').length) {
    updateStat()
  }
  syncStat()


})

var syncStat = function () {
  chrome.storage.sync.get('stat', function (result) {
    if (result && result.stat) {
      stat = result.stat
    }
  })
}

function checkForChanges()
{
  if ($('div#player').hasClass('is-finished'))
    switchEpisode()
  else
    setTimeout(checkForChanges, 1000);
}

var updateStat = function () {
  var url = $(location).attr('href')
  var regexp = /t:(\d+)-s:(\d+)-e:(\d+)/

  var matches = regexp.exec(url.split('#')[1])

  var serial = $('div.b-post__title').children('h1').text()
  var currentSeason = matches[2]
  var currentEpisode = matches[3]
  var maxSeasons = $('ul.simple-seasons-tabs li').length
  var maxEpisodes = $('ul.simple-episodes-list-' + currentSeason + ' li').length
  chrome.storage.sync.set({
    'stat': {
      'serial': serial,
      'maxSeasons': maxSeasons,
      'maxEpisodes': maxEpisodes,
      'currentSeason': currentSeason,
      'currentEpisode': currentEpisode
    }
  })
}

var switchEpisode = function () {

}



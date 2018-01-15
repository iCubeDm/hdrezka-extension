var stats = {
  counter: 0,
  data: {
    serial: '',
    maxSeasons: '',
    maxEpisodes: '',
    currentSeason: '',
    currentEpisode: '',
    twitter: '@icubedm'
  },

  updateStat: function () {
    var url = document.attr('href')
    var regexp = /t:(\d+)-s:(\d+)-e:(\d+)/

    var matches = regexp.exec(url.split('#')[1])

    var serial = document.querySelector('div.b-post__title').children('h1').text()
    var currentSeason = matches[2]
    var currentEpisode = matches[3]
    var maxSeasons = document.querySelector('ul.simple-seasons-tabs li').length
    var maxEpisodes = document.querySelector('ul.simple-episodes-list-' + currentSeason + ' li').length
    chrome.storage.sync.set({
      'stat': {
        'serial': serial,
        'maxSeasons': maxSeasons,
        'maxEpisodes': maxEpisodes,
        'currentSeason': currentSeason,
        'currentEpisode': currentEpisode
      }
    })
  },

  checkForChanges: function () {
    if ($('div#player').hasClass('is-finished'))
      switchEpisode()
    else
      setTimeout(checkForChanges, 1000)
  },

  btnClick: function () {
    updateStat()
  },

  switchEpisode: function () {
    console.log("Switch episode")
  }
}

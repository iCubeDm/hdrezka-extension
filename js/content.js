let contentParser = {

  getSerialName: function getSerialName () {
    return $('#main > div.b-container.b-wrapper > div > div.b-content__columns.pdt.clearfix > div.b-content__main > div.b-post__title > h1').text()
  },

  getCurrentSeason: function getCurrentSeason () {
    return $('#simple-seasons-tabs').find('li.active').attr('data-tab_id')
  },

  getCurrentEpisode: function getCurrentEpisode () {
    return $('#simple-episodes-list-' + this.getCurrentSeason()).find('li.active').attr('data-episode_id')
  },

  getMaxSeasons: function getMaxSeasons () {
    return $('ul#simple-seasons-tabs li').length
  },

  getMaxEpisodes: function getMaxEpisodes () {
    return $('ul#simple-episodes-list-' + this.getCurrentSeason() + ' li').length
  },

  isEpisodeFinished: function isEpisodeFinished () {
    $('div#player').hasClass('is-finished')
  },

  nextEpisode: function nextEpisode () {
    let currentSeason = this.getCurrentSeason() * 1
    let nextEpisode = this.getCurrentEpisode() * 1 + 1
    console.log('switching')
    $(`#simple-episodes-list-${currentSeason} > li:nth-child(${nextEpisode})`).click()
    console.log('switched')
    console.log('starting')
    let sourceUrl = $('#cdn-player').attr('src')
    $('#cdn-player').attr('src', sourceUrl+'&autoplay=1')
    console.log('started')

  },
}

chrome.runtime.onMessage.addListener(function (request, sender, sendMessage) {
  switch (request.action) {
    case 'getSerialName':
      sendMessage({data: contentParser.getSerialName()})
      break
    case 'getCurrentSeason':
      sendMessage({data: contentParser.getCurrentSeason()})
      break
    case 'getCurrentEpisode':
      sendMessage({data: contentParser.getCurrentEpisode()})
      break
    case 'getMaxSeasons':
      sendMessage({data: contentParser.getMaxSeasons()})
      break
    case 'getMaxEpisodes':
      sendMessage({data: contentParser.getMaxEpisodes()})
      break
    case 'isEpisodeFinished':
      sendMessage({data: contentParser.isEpisodeFinished()})
      break
    case 'nextEpisode':
      sendMessage({data: contentParser.nextEpisode()})
      break
    default:
      sendMessage({})
  }
})


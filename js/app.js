async function tabAction (actionName) {
  console.log('requesting the page action: ' + actionName)
  let tabs = await chrome.tabs.query({active: true, currentWindow: true})
  let response = await chrome.tabs.sendMessage(tabs[0].id, {action: actionName}, function (response) {
    return response
  })
  return response.data
}

let stats = {
  counter: 0,
  data: {
    serial: 'not defined',
    maxSeasons: 'not defined',
    maxEpisodes: 'not defined',
    currentSeason: 'not defined',
    currentEpisode: 'not defined',
    isAutoplay: false
  },

  updateStat: async function () {

    console.log('updating statistics')

    let serial = await tabAction('getSerialName')
    let currentSeason = await tabAction('getCurrentSeason')
    let currentEpisode = await tabAction('getCurrentEpisode')
    let maxSeasons = await tabAction('getMaxSeasons')
    let maxEpisodes = await tabAction('getMaxEpisodes')

    response = {
      serial,
      currentSeason,
      currentEpisode,
      maxSeasons,
      maxEpisodes
    }

    console.log(response)
    return response

  },

  checkForChanges: async function () {
      return await this.updateStat()
  },

  switchEpisode: async function () {
    console.log('Switch episode')
    await tabAction('chan')
  }
}

let vm = new Vue({
  el: '#app',
  data: function () {
    return {
      props: stats.data
    }
  },
  methods: {
    checkForChanges: async function () {
      console.log('checking for changes')

      let response = await stats.checkForChanges()

      console.log(response)

      Vue.set(this.props, 'serial', response.serial)
      Vue.set(this.props, 'maxSeasons', response.maxSeasons)
      Vue.set(this.props, 'maxEpisodes', response.maxEpisodes)
      Vue.set(this.props, 'currentSeason', response.currentSeason)
      Vue.set(this.props, 'currentEpisode', response.currentEpisode)
    }
  }
})

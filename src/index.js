import TimeMe from 'timeme.js'
import localForge from 'localforage'
import utils from './libs/utils'

function plugin (Vue, options) {
    // Is the TimeMe instance set
    let timeMeSet = false

    const defaultOptions = {
        baseURL: 'localhost:8000',
        interval: 30000,
        idleTimeoutInSeconds: 30
    }

    // Checks
    if (options.axios === undefined) {
        console.info('[Vue-core-time-tracker]: axios must be set before this package. and included')
    }

    if (Vue.prototype.$core === undefined) {
        console.info('[Vue-core-time-tracker]: Vue-core-authenticator must be set before this package.')
    }

    options = utils.extend(defaultOptions, [options || {}])

    Vue.router.beforeEach((to, from, next) => {
        // Check with the vue-core-authenticator package.
        if (Vue.prototype.$core.check()) {
            pageChange(to)
        }
        next()
    })
  function pageChange (to) {
      if (!timeMeSet) {
          TimeMe.initialize({
              currentPageName: to.fullPath, // current page
              idleTimeoutInSeconds: options.idleTimeoutInSeconds // seconds
          })
          TimeMe.startTimer()
          timeMeSet = true
          // Report initial report to backend
          reportToBackend()
      }
      // Stop the current timer
      TimeMe.stopTimer()
      TimeMe.setCurrentPageName(to.fullPath)
      const timeOnAllPages = TimeMe.getTimeOnAllPagesInSeconds()
      localForge.setItem('core_time_track', JSON.stringify(timeOnAllPages))
      TimeMe.startTimer()
  }
  function reportToBackend () {
      window.timeTrackInterval = setInterval(() => {
          if (!Vue.prototype.$core.check()) {
              clearInterval(window.timeTrackInterval)
              return
          }
          localForge.getItem('core_time_track').then((value) => {
              if (value === [] || value === null) {
                  return
              }
              options.axios.post(options.baseURL + '/core/reporter', { data: JSON.parse(value) }).then(() => {
                  TimeMe.resetAllRecordedPageTimes()
                  localForge.removeItem('core_time_track')
              })
          })
      }, options.interval)
  }
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  version
}

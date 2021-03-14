export const getLocale = () => {
    if (navigator.languages && navigator.languages.length > 0) {
      return navigator.languages[0]
    }
    else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      //return navigator.userLanguages || navigator.language || navigator.browserLanguages || 
      return 'en-us'
    }
  }
  
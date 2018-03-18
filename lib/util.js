

class utility {
    isInViewport(element) {
        var rect = element.getBoundingClientRect();
        var html = document.documentElement;
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || html.clientHeight) &&
            rect.right <= (window.innerWidth || html.clientWidth)
        );
    }
    getAuthor(number) {
      switch (number) {
        case 1:
          return 'ABDULKARIM'
        case 2: 
          return 'JOLYON'
        case 3:
          return 'RUDY'
      }
    }
    getDate(date) {
      const d = new Date(date).toString().split(' ')
      return `${d[2]} ${d[1].toUpperCase()} ${d[3]}`
    }
    getGenres(genres) {
      let arr = []
      for (const genre of genres) {
        switch (genre) {
          case 37:
            arr.push('RAP') 
            break
          case 38: 
            arr.push('ROCK')
            break
          case 39:
            arr.push('ELECTRONIC')
            break
          case 40:
            arr.push('POP')
            break
          case 41: 
            arr.push('EXPERIMENTAL')
            break
          case 42:
            arr.push('R&B')
            break
        }
      }
      return arr
    }
}

const util = new utility()

export default util
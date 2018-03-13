

class utilility {
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
}

const util = new utilility()

export default util
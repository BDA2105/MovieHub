new Vue({
    el: '#app',
    data () {
      return {
        filterText: '',
        columns: ['title', 'ratings', 'seen'],
        ratingsInfo: [
          {title: `white chicks`, ratings: 82, seen: `yes` },
          {title: `grey's anatomy`, ratings: 98, seen: `yes` },
          {title: `prison break`, ratings: 98, seen: `yes` },
          {title: `how I met your mother`, ratings: 94, seen: `yes` },
          {title: `supernatural`, ratings: 95, seen: `yes` },
          {title: `breaking bad`, ratings:97,seen: `no` },
          {title: `the vampire dairies`, ratings: 91, seen: `yes` },
          {title: `the walking dead`, ratings: 98, seen: `yes` },
          {title: `pritty little liars`, ratings: 96, seen: `no` },
          {title: `once upon a time`, ratings: 98, seen: `no` },
          {title: `sherlock`, ratings: 95, seen: `no` },
          {title: `naruto`, ratings: 88, seen: `no` },
          {title: `death note`, ratings: 77, seen: `no` }
        ]
      }
    },
    methods: {
      sortLowest () {
        this.ratingsInfo.sort((a, b) => a.ratings > b.ratings ? 1 : -1)
      },
      sortHighest () {
        this.ratingsInfo.sort((a, b) => a.ratings < b.ratings ? 1 : -1)
      }
    },
    computed: {
      filteredFilms () {
        let filter = new RegExp(this.filterText, 'i')
        return this.ratingsInfo.filter(el => el.title.match(filter))
      }
    }
  });
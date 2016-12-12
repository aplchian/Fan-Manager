const React = require('react')
const Widget = require('./components/widget')
const {style} = require('glamor')
const States = require('./components/states')
const Recent = require('./components/recent')
const PageWrapper = require('./components/page-wrapper.js')
const d3 = require('d3')
import ReactFauxDOM from 'react-faux-dom'
const {map,filter} = require('ramda')
const PageTitle = require('../components/page-header.js')


const clearFloat = style({
  clear: 'both'
})

const width = style({
  width: '90%'
})


const Graph = ({data}) => {


  const node = new ReactFauxDOM.Element('div')

  const w = 800;
  const h = 430;

  let dataset = data

  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)

  var svg = d3.select(node)
   .append('svg')
   .attr("width",w)
   .attr("height",h)

   console.log(dataset)

   svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d,i) => i * (w / dataset.length))
    .attr("y", (d => h - (d.count * 3)))
    .attr("width", w / dataset.length - 1)
    .attr("height", d => d.count * 3)
    .on("mouseover", d => {
            div.transition()
                .style("opacity", .9)
            div.html(`
              <h4 class="tool-tip-header">${d.state}</h4>
              <div>${d.count} fans</div>
              `)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            div.transition()
                .style("opacity", 0);
        })
    .text(d => d.count)

    svg.selectAll("text")
     .data(dataset)
     .enter()
     .append("text")
     .text(d => d.state)
     .attr("x", (d,i) => i * (w / dataset.length))
     .attr("y", (d => h - (d.count * 3)))

  return node.toReact()
}



const Dashboard = React.createClass({
  getInitialState(){
    return ({
      data: [],
      artist: "band_Stop_Light_Observations"
    })
  },
  componentDidMount(){

    let options = {
      state: '',
      bandID: this.state.artist,
      sorttoken: '',
      limit: ''
    }
    // let data = this.state.allFans.filter(fan => q.toUpperCase() === fan.state.toUpperCase())
    this.props.fansByState(options)
      .then(res =>  {

        console.log('res',res)

        let states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
            "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
            "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
            "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
            "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

        const filterFans = (state) => {
          return item => item.state === state
        }

        const countFans = (state) => {
          return filter(filterFans(state),res.data)

        }

        let data = map(arr => ({state: arr[0].state, count: arr.length}),
                   map(countFans,states))

        data = filter(item => item.state !== 'SC',data)

        this.setState({
          data: data
        })

      }
    )

  },
  render(){
    console.log('state',this.state)
    return(
      <div>
        <PageWrapper title="Fan Dashboard">
            <PageTitle text="Fans By State" />
            <Graph data={this.state.data}></Graph>
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard

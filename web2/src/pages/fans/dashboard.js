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

  let dataset = data.data

  console.log('dataset', dataset)


  var svg = d3.select(node)
   .append('svg')
   .attr("width",w)
   .attr("height",h)

   svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d,i) => i * (w / dataset.length))
    .attr("y", (d => h - (d.count * 3)))
    .attr("width", w / dataset.length - 1)
    .attr("height", d => d.count * 3)
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
      band: "band_Stop_Light_Observations"
    })
  },
  componentDidMount(){
    this.props.allFans( this.state.band, (err,res) => {
      if (err) return console.log(err)

      let states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

      const filterFans = (state) => {
        return item => item.state === state
      }

      const countFans = (state) => {
        return filter(filterFans(state),res)

      }

      let data = map(arr => ({state: arr[0].state, count: arr.length}),
                 map(countFans,states))

      data = filter(item => item.state !== 'SC',data)

      this.setState({
        data: data
      })

    })
  },
  render(){
    return(
      <div>
        <PageWrapper title="Fan Dashboard">
            <PageTitle text="Dashboard" />
            <Graph data={this.state}></Graph>
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard

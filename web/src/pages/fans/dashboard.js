const React = require('react')
const Widget = require('./components/widget')
const {style} = require('glamor')
const States = require('./components/states')
const Recent = require('./components/recent')
const PageWrapper = require('./components/page-wrapper.js')
const d3 = require('d3')
import ReactFauxDOM from 'react-faux-dom'
const {map,filter,compose,sort,tap,reject} = require('ramda')
const PageTitle = require('../components/page-header.js')

const topojson = require('topojson')


const clearFloat = style({
  clear: 'both'
})

const width = style({
  width: '90%'
})


const Graph = React.createClass({
  getInitialState(){
    return  ({
      success: false,
      node: <div></div>
    })
  },
  componentDidMount(){
    this.updateGraph()
  },
  updateGraph(){
  },
  render(){

    // let returnNode = this.state.success ? node.toReact() : <div></div>
    // let returnNode = this.state.success ? node.toReact() : <div></div>

    // var returnNode
    //
    // if(this.state.success) {
    //   returnNode = this.state.node
    // }else {
    //   returnNode = null
    // }
    //
    const dataset = this.props.data

    const w = 800
    const h = 416

    const node = new ReactFauxDOM.Element('div')


    var div = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0)

    const paddingtop = 30;

    const yScale = d3.scale.linear()
                 .domain([0,d3.max(dataset, function(d){return d.count;})])
                 .range([h - paddingtop,paddingtop]);



    var svg = d3.select(node)
     .append('svg')
     .attr("width",w)
     .attr("height",h)

     svg.selectAll('rect')
      .data(this.props.data)
      .enter()
      .append("rect")
      .attr("x", (d,i) => i * (w / dataset.length))
      .attr("y", (d => yScale(d.count) - paddingtop ))
      .attr("width", w / dataset.length - .5)
      .attr("height", d =>  h - yScale(d.count))
      .on("mouseover", d => {
              div.transition()
                  .style("opacity", 1)
              div.html(`
                <div class="tool-tip">
                  <h4>${d.state}</h4>
                  <div>${d.count} fans</div>
                </div>
                `)
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
              })
          .on("mouseout", function(d) {
              div.transition()
                  .style("opacity", 0);
          })
      .text(d => d.count)

        // svg.selectAll("text")
        //  .data(dataset)
        //  .enter()
        //  .append("text")
        //  .text(d => d.state)
        //  .attr('class', 'd3-text')
        //  .attr("x", (d,i) => i * (w / dataset.length))
        //  .attr("y", (d => h - (d.count * 3)))
        //  .attr("font-family", "sans-serif")
        //  .attr("transform", "rotate(30 20,40)")
        //  .attr("fill", "red")


    return node.toReact()
  }
})



const Dashboard = React.createClass({
  getInitialState(){
    return ({
      data: [],
      artist: this.props.band
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

        let data = compose(
                   sort((a,b) => a.count - b.count),
                   filter(item => item.state !== 'SC'),
                   map(arr => ({state: arr[0].state, count: arr.length})),
                   reject(item => item.length === 0),
                   map(countFans)
                  )(states)


        this.setState({
          data: data
        })
      }
    )
  },
  render(){
  //   const node = new ReactFauxDOM.Element('div')
  //
  //   var width = 960,
  //     height = 500,
  //     centered;
  //
  // var projection = d3.geo.albersUsa()
  //     .scale(1070)
  //     .translate([width / 2, height / 2]);
  //
  // var path = d3.geo.path()
  //     .projection(projection);
  //
  // var svg = d3.select(node).append("svg")
  //     .attr("width", width)
  //     .attr("height", height);
  //
  // svg.append("rect")
  //     .attr("class", "background")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .on("click", clicked);
  //
  // var g = svg.append("g");
  //
  // var x = d3.json("./d3.json", function(error, us) {
  //   if (error) throw error;
  //
  //   g.append("g")
  //       .attr("id", "states")
  //       .selectAll("path")
  //       .data(topojson.feature(us, us.objects.states).features)
  //       .enter()
  //       .append("path")
  //       .attr("d", path)
  //       .on("click", clicked);
  //
  //   g.append("path")
  //       .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
  //       .attr("id", "state-borders")
  //       .attr("d", path)
  //
  //    console.log("NODE",node)
  //
  // })
  //
  //
  // function clicked(d) {
  //   var x, y, k;
  //
  //   if (d && centered !== d) {
  //     var centroid = path.centroid(d);
  //     x = centroid[0];
  //     y = centroid[1];
  //     k = 4;
  //     centered = d;
  //   } else {
  //     x = width / 2;
  //     y = height / 2;
  //     k = 1;
  //     centered = null;
  //   }
  //
  //   g.selectAll("path")
  //       .classed("active", centered && function(d) { return d === centered; });
  //
  //   g.transition()
  //       .duration(750)
  //       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
  //       .style("stroke-width", 1.5 / k + "px");
  // }
    return(
      <div>
        <PageWrapper logout={this.props.logOut} title="Fans By State">
            <Graph data={this.state.data}></Graph>
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard

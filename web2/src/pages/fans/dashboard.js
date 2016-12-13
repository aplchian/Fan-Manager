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

const topojson = require('topojson')


const clearFloat = style({
  clear: 'both'
})

const width = style({
  width: '90%'
})


const Graph = ({data}) => {


  const node = new ReactFauxDOM.Element('div')

  // const w = 800;
  // const h = 430;
  // var centered

  // let dataset = data

  ////////////////////

  var width = 960,
    height = 500,
    centered;

var projection = d3.geo.albersUsa()
    .scale(1070)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select(node).append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

var g = svg.append("g");

var x = d3.json("./d3.json", function(error, us) {
  if (error) throw error;

  g.append("g")
      .attr("id", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter()
      .append("path")
      .attr("d", path)
      .on("click", clicked);

  g.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", path)

      return node.toReact()
})


function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}


  ////////////////////

  // var div = d3.select("body").append("div")
  //     .attr("class", "tooltip")
  //     .style("opacity", 0)
  //
  // var svg = d3.select(node)
  //  .append('svg')
  //  .attr("width",w)
  //  .attr("height",h)
  //
  //  console.log(dataset)

  //  svg.selectAll('rect')
  //   .data(dataset)
  //   .enter()
  //   .append("rect")
  //   .attr("x", (d,i) => i * (w / dataset.length))
  //   .attr("y", (d => h - (d.count * 3)))
  //   .attr("width", w / dataset.length - 1)
  //   .attr("height", d => d.count * 3)
  //   .on("mouseover", d => {
  //           div.transition()
  //               .style("opacity", .9)
  //           div.html(`
  //             <h4 class="tool-tip-header">${d.state}</h4>
  //             <div>${d.count} fans</div>
  //             `)
  //               .style("left", (d3.event.pageX) + "px")
  //               .style("top", (d3.event.pageY - 28) + "px");
  //           })
  //       .on("mouseout", function(d) {
  //           div.transition()
  //               .style("opacity", 0);
  //       })
  //   .text(d => d.count)
   //
  //   svg.selectAll("text")
  //    .data(dataset)
  //    .enter()
  //    .append("text")
  //    .text(d => d.state)
  //    .attr("x", (d,i) => i * (w / dataset.length))
  //    .attr("y", (d => h - (d.count * 3)))

}



const Dashboard = React.createClass({
  getInitialState(){
    return ({
      data: [],
      artist: "band_Stop_Light_Observations"
    })
  },
  componentDidMount(){

    // let options = {
    //   state: '',
    //   bandID: this.state.artist,
    //   sorttoken: '',
    //   limit: ''
    // }
    // // let data = this.state.allFans.filter(fan => q.toUpperCase() === fan.state.toUpperCase())
    // this.props.fansByState(options)
    //   .then(res =>  {
    //
    //     console.log('res',res)
    //
    //     let states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
    //         "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    //         "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    //         "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    //         "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
    //
    //     const filterFans = (state) => {
    //       return item => item.state === state
    //     }
    //
    //     const countFans = (state) => {
    //       return filter(filterFans(state),res.data)
    //
    //     }
    //
    //     let data = map(arr => ({state: arr[0].state, count: arr.length}),
    //                map(countFans,states))
    //
    //     data = filter(item => item.state !== 'SC',data)
    //
    //     this.setState({
    //       data: data
    //     })
    //
    //   }
    // )

  },
  render(){
    const node = new ReactFauxDOM.Element('div')

    console.log('state',this.state)
    var width = 960,
      height = 500,
      centered;

  var projection = d3.geo.albersUsa()
      .scale(1070)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select(node).append("svg")
      .attr("width", width)
      .attr("height", height);

  svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .on("click", clicked);

  var g = svg.append("g");

  var x = d3.json("./d3.json", function(error, us) {
    if (error) throw error;

    g.append("g")
        .attr("id", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append("path")
        .attr("d", path)
        .on("click", clicked);

    g.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("id", "state-borders")
        .attr("d", path)

     console.log("NODE",node)

  })


  function clicked(d) {
    var x, y, k;

    if (d && centered !== d) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      centered = d;
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
    }

    g.selectAll("path")
        .classed("active", centered && function(d) { return d === centered; });

    g.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
  }
    return(
      <div>
        <PageWrapper title="Fan Dashboard">
            <PageTitle text="Fans By State" />
            {/* <Graph data={this.state.data}></Graph> */}
            <div>{node.toReact()}</div>
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard

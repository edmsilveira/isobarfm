import React from 'react'
import axios from 'axios'
import Band from './Band'
import NumberFormat from 'react-number-format'
import logo from './../../public/logo.png'
import nores from './../../public/no_results.png'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: this.props.query,
        bands: this.props.allbands,
        singleBand: [],
        showBand: false,
        results: []
      }
    }

    componentDidMount() {
        const {bands, query} = this.state
          let results = [], tmp = new RegExp(query, "i")

          bands.map(el => {
            if (el.name.match(tmp)) {
              results.push(el)
            } 
          })

          this.setState({
              results: results
          })
    }

    getBand(id) {
        return axios.get(`https://iws-recruiting-bands.herokuapp.com/api/bands/${id}`)
        .then(res => {
            this.setState({
                singleBand: res.data,
                showBand: true
            })
        })
    }

    handleBandUnmount(){
        this.setState({showBand: false});
    }


    showBand() {
        if (this.state.showBand) {
            return <Band dismiss={()=>{this.handleBandUnmount()}} band={this.state.singleBand}/>
        }
        return null;
    }

    dismiss() {
      this.props.dismiss();
    } 

      render() {
        const {results, showBand} = this.state
        if(results !== null && !showBand) {
            return (
              <React.Fragment>
                <header className="page-header band sch">
                  <div className="col-xs-12 col-sm-9 col-md-10 wr">
                      <button className="back" onClick={()=>{this.dismiss()}}>&times;</button>
                      <img className="logo-center" src={logo}/>
                  </div>
                </header>
                <div className="content">
                  <span className="results-counter">{`${results.length} resultado(s)` }</span>
                  <ul className="list">
                      {results.length ? results.map(band => 
                          <li className="item" key={band.id} id={band.id}>
                          <a onClick={()=>{this.getBand(band.id)}}>
                              <img className="band-img" src={band.image}/>
                              <div className="band-wr">
                                  <span className="band-ttl">{band.name}</span>
                                  <span className="band-numplays"><NumberFormat value={band.numPlays} displayType={'text'} thousandSeparator={true}/> </span> PLAYS
                              </div>
                          </a>
                          </li>) :<li className="no-result"><span class="no-result-txt">Sem Resultados...</span><img className="no-result-img" src={nores}/></li>
                      }
                  </ul>
                </div></React.Fragment>
            )
        } return (
              this.showBand()
        )
      }
}

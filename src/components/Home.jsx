import React from 'react'
import axios from 'axios'
import Band from './Band'
import Search from './Search'
import sch from './../../public/search.png'
import order from './../../public/order_by.png'
import logo from './../../public/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import NumberFormat from 'react-number-format'

class Home extends React.Component {
    constructor(props) {        
        super(props)    
        this.state = {
          bands: [],
          singleBand: null,
          showBand: false,
          hasSearch: false,
          isActive: false,
          query: null
        }
        this.showSearch = this.showSearch.bind(this)
    }

    componentDidMount() {
        return axios.get(`https://iws-recruiting-bands.herokuapp.com/api/bands`)
            .then(res => {
                this.setState({
                    bands: res.data
                })
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

    handleSearchUnmount(){
        this.setState({hasSearch: false});
    }

    showBand() {
        if (this.state.showBand) {
            return <Band dismiss={()=>{this.handleBandUnmount()}} band={this.state.singleBand}/>
        } 
        return null
    }

    showSearch(e) {
        e.preventDefault()

        const res = this.input.value
        this.setState({hasSearch:true, query: res})
    }

    sortAlpha() {
        const {bands} = this.state

        let newBands = bands

        newBands = bands.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        this.setState({
            bands: newBands
        })

    }
    sortNumPlays() {
        const {bands} = this.state

        let newBands = bands  
        newBands = bands.sort((a, b) => b.numPlays - a.numPlays)

        this.setState({
            bands: newBands
        })
    }

    toggleActive() {
        this.setState({ isActive: !this.state.isActive })
    };


    render() {
        const {bands, showBand, hasSearch} = this.state
        if(bands !== null && (!hasSearch && !showBand)) {
            return (
            <React.Fragment>
            <header className="page-header">
                <div className="col-xs-12 col-sm-9 col-md-10 wr">
                    <form onSubmit={this.showSearch}>
                        <input ref={(element) => { this.input = element }} id="search" placeholder="Search by band" name="band" />
                        <button className="sch-btn-wr"><img className="sch-btn" src={sch}/></button>
                        <img className="logo" src={logo}/>
                    </form>
                </div>
            </header>
            <div className="order-btn-wr">
                <button className="order-btn" onClick={()=>{this.toggleActive()}}><img className="order-btn-img" src={order}/></button>
                <div className={this.state.isActive ? 'order-list-wr ac': 'order-list-wr'}>
                    <ul className="order-list">
                        <li className="order-opt"><button className="order-opt-btn" onClick={()=>{this.sortAlpha()}}>ordem alfabética</button></li>
                        <li className="order-opt"><button className="order-opt-btn" onClick={()=>{this.sortNumPlays()}}>popularidade</button></li>
                    </ul>
                </div>
            </div>
            <ul className="list">
                {bands.map(band => 
                    <li className="item" key={band.id} id={band.id}>
                    <a onClick={()=>{this.getBand(band.id)}}>
                        <img className="band-img" src={band.image}/>
                        <div className="band-wr">
                            <span className="band-ttl">{band.name}</span>
                            <span className="band-numplays"><NumberFormat value={band.numPlays} displayType={'text'} thousandSeparator={true}/> </span> PLAYS
                        </div>
                    </a>
                    </li>)
                }
            </ul></React.Fragment>)
        } if(showBand) {
            return (this.showBand())            
        }if(hasSearch){
            return (<Search dismiss={()=>{this.handleSearchUnmount()}} query={this.state.query} allbands={this.state.bands}/>)
        }
        
    }
}

export default Home

 
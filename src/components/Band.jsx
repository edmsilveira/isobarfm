import React from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import logo from './../../public/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Band extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        band: this.props.band,
        albums: []
      }
    }

    componentDidMount() {
      return axios.get(`https://iws-recruiting-bands.herokuapp.com/api/albums`)
      .then(res => {
          let albums = []

          res.data.map(el => {
            if (el.band === this.state.band.id) {
              albums.push(el)
            } 
          })

          this.setState({
              albums: albums
          })
      })
  }

    dismiss() {
      this.props.dismiss();
    } 

      render() {
        const {band, albums} = this.state

        return (
          <React.Fragment>
            <header className="page-header band">
              <div className="col-xs-12 col-sm-9 col-md-10 wr">
                  <button className="back" onClick={()=>{this.dismiss()}}>&times;</button>
                  <img className="logo-center" src={logo}/>
              </div>
            </header>
          <div className="single-content">  
           
            <div className="single-fullimg" style={{backgroundImage: `url(${band.image})`}}>
              <div className="gradientback"></div>
            </div>
              <span className="single-ttl">{band.name}</span>
            <div className="single-wr">
                <span className="single-genre">{band.genre}</span>
                <img className="single-smallimg" src={band.image} />
                <span className="single-numplays"><NumberFormat value={band.numPlays} displayType={'text'} thousandSeparator={true} /> PLAYS</span>
            </div>
            <div className="single-bio">
              <p>{band.biography.replace(/(<([^>]+)>)/ig, '')}</p>
            </div>
          </div>
          <div className="single-wrapper"><h4>ALBUNS</h4>
            {albums.map(item =>
                <div className="single-albums" key={item.id}>
                  <div className="album-item" style={{backgroundImage: `url(${item.image})`}}></div>
                </div>
            )}</div></React.Fragment>
        )
      }
}

import React, { Component } from 'react';
import getData from '../data/getData';
// import alldata from '../data/Wuhan-2019-nCoV.json';
import axios from 'axios';
import './NumberBoard.scss'
class NumberBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }
  async componentDidMount() {
    // const { data } = await axios.get('http://api.tianapi.com/txapi/ncov/index', {
    //   params: {
    //     key: 'a6cf2dc35efb92e1b9160dab78472e88',
    //     date: this.props.date
    //   }
    // });
    // console.log(data);
    // this.setState({ data });
    this.setState({ data: (await getData()).countryData.filter(e => e.date === this.props.date) });
    // this.setState({data: alldata.filter(e => e.country === '中国' && !e.province && e.date === this.props.date)});
  }
  async componentDidUpdate(prevPros) {
    if (this.props.date !== prevPros.date) {
      this.setState({ data: (await getData()).countryData.filter(e => e.date === this.props.date) });
    }

  }
  render() {
    const { data } = this.state;
    if (!data) return null;
    const ChinaData = data.filter(e => e.country === '中国')[0];
    const GlobeData = {
      confirmed: 0,
      cured: 0,
      dead: 0
    };
    for (let i = 0; i < data.length; i++) {
      GlobeData.confirmed += data[i].confirmed;
      GlobeData.cured += data[i].cured;
      GlobeData.dead += data[i].dead;
    }
    return ChinaData && GlobeData && (
      <div className="number-board">
        <span>新型冠状病毒疫情地图</span>
        <div className="board-container">
          <div className="confirm">
            <p className="title-confirm">确诊</p>
            <p className="number-confirm">{ChinaData.confirmed}</p>
            <p className="globe-confirm">Globle:{GlobeData.confirmed}</p>
          </div>
          <div className="cure">
            <p className="title-cure">治愈</p>
            <p className="number-cure">{ChinaData.cured}</p>
            <p className="globe-cure">Globle:{GlobeData.cured}</p>
          </div>
          <div className="death">
            <p className="title-death">死亡</p>
            <p className="number-death">{ChinaData.dead}</p>
            <p className="globe-death">Globle:{GlobeData.dead}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default NumberBoard;
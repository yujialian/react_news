import React from 'react';
import {Row, Col} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router-dom';
import ReactPullToRefresh from 'react-pull-to-refresh';
export default class MobileList extends React.Component {
  constructor() {
    super();
    this.state = {
      news: ''
    };
  }
  componentWillMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({hasMore: 1, initializing: 2});
    }, 2e3);
  };
  handleRefresh(resolve) {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=yule" + "&count=20", myFetchOptions).then(response => response.json()).then(json => {
      this.setState({news: json});
      resolve();
    });
  }
  render() {
    const {news} = this.state;
    const newsList = news.length
      ? news.map((newsItem, index) => (<section key={index} className="m_article list-item special_section clearfix">
        <Link to={`details/${newsItem.uniquekey}`}>
          <div className="m_article_img">
            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
          </div>
          <div className="m_article_info">
            <div className="m_article_title">
              <span>{newsItem.title}</span>
            </div>
            <div className="m_article_desc clearfix">
              <div className="m_article_desc_l">
                <span className="m_article_channel">{newsItem.realtype}</span>
                <span className="m_article_time">{newsItem.date}</span>
              </div>
            </div>
          </div>
        </Link>
      </section>))
      : 'Load more news...';
    return (<div>
      <Row>
        <Col span={24}>
          <ReactPullToRefresh onRefresh={this.handleRefresh.bind(this)} style={{
              textAlign: 'center'
            }}>
            <span className="genericon genericon-next"></span>
            <div>
              {newsList}
            </div>
          </ReactPullToRefresh>
        </Col>
      </Row>
    </div>);
  };
}

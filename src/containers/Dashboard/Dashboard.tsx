import React, { Component, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Chart } from "../../components/Chart/Chart";
import client from "../../client";
import { NEW_CLICK_EVENTS } from "../../graphql/subscriptions";
import "./Dashboard.css";

const elapseThreshold = 5;
const clickCountsInit: { [key: string]: number[] } = {
  orange: [],
  blue: []
};
const clickDataInit: {
  xIndex: number;
  orange: number;
  blue: number;
  black: number;
}[] = [
  {
    xIndex: 0,
    orange: 0,
    blue: 0,
    black: 0
  },
  {
    xIndex: 1,
    orange: 0,
    blue: 0,
    black: 0
  },
  {
    xIndex: 2,
    orange: 0,
    blue: 0,
    black: 0
  },
  {
    xIndex: 3,
    orange: 0,
    blue: 0,
    black: 0
  },
  {
    xIndex: 4,
    orange: 0,
    blue: 0,
    black: 0
  },
  {
    xIndex: 5,
    orange: 0,
    blue: 0,
    black: 0
  }
];
export default class Dashboard extends Component {
  state = {
    clickCounts: clickCountsInit,
    clickData: clickDataInit,
    startTime: 0
  };

  unSubscribe = (subscription: ZenObservable.Subscription) => {
    setTimeout(() => {
      subscription.unsubscribe();
      this.contructChartData();
    }, elapseThreshold * 1000);
  };

  contructChartData = () => {
    let data = [];
    let orangeClicksTime = this.state.clickCounts.orange;
    let blueClicksTime = this.state.clickCounts.blue;
    for (let i = 0; i < elapseThreshold * 2 + 1; i++) {
      let dataObj = {
        xIndex: i / 2,
        orange: 0,
        blue: 0,
        black: 0
      };
      if (orangeClicksTime.indexOf(i / 2) !== -1) {
        dataObj.orange += orangeClicksTime.filter(sec => sec === i / 2).length;
      }
      if (blueClicksTime.indexOf(i / 2) !== -1) {
        dataObj.blue += blueClicksTime.filter(sec => sec === i / 2).length;
      }
      dataObj.black = dataObj.blue - dataObj.orange;
      data.push(dataObj);
    }
    this.setState({ clickData: data });
  };

  onNewClickAdded = (
    date: number,
    type: string,
    subscription: ZenObservable.Subscription
  ) => {
    let xIndex = Math.floor(((date - this.state.startTime) * 2) / 1000) / 2;
    if (this.state.startTime === 0) {
      xIndex = 0;
      this.setState({ startTime: date });
      this.unSubscribe(subscription);
    }
    let newClicks = this.state.clickCounts[type];
    this.setState({
      clickCounts: {
        ...this.state.clickCounts,
        [type]: [...this.state.clickCounts[type], xIndex]
      }
    });
  };

  componentDidMount() {
    const subscription = client
      .subscribe({ query: NEW_CLICK_EVENTS })
      .subscribe({
        next: data => {
          if (data && data.data) {
            let date = new Date(data.data.addedClickEvent.timeStamp).getTime();
            let type = data.data.addedClickEvent.type;
            this.onNewClickAdded(date, type, subscription);
          }
        },
        error: error => {
          console.warn(error);
        }
      });
  }

  render() {
    return (
      <Row>
        <Col sm={12}>
          <div className="dashboard-counts-div">
            <span className="dashboard-counts-span-blue">
              {this.state.clickCounts.blue.length}
            </span>
            :
            <span className="dashboard-counts-span-orange">
              {this.state.clickCounts.orange.length}
            </span>
          </div>
        </Col>
        <Col sm={12}>
          <Chart data={this.state.clickData} />
        </Col>
        <Col sm={12}>
          <div className="dashboard-link">
            <a href="/client" target="_blank">
              *Click here to join the game.*
            </a>
          </div>
        </Col>
      </Row>
    );
  }
}

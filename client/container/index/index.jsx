import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link}from "react-router-dom"
import actions from '../../redux/actions/index.js';
import {ajax} from "../../util/index"
@connect((state) => {
  return {
    cntData: state.cnt
  }
},{...actions})
export default class extends Component {
  constructor () {
    super();
    this.state = {
      userName:"",
      avatar:"",
      list:[],
      hasMore:true
    };
  }

  componentDidMount(){
    ajax({
      url:'http://localhost:8333/api/myinfo',
      method:'GET'
    }).then(res=>{
      let {userName,avatar}=res;
      this.setState({userName,avatar})
    })
    ajax({
      url:'http://localhost:8333/api/mylist',
      method:'POST',
      data:{
        offset:0,
        limit:10
      }
    }).then(res=>{
      let {list,hasMore}=res;
      console.log(list);
      console.log(hasMore);
      this.setState({list,hasMore})

    })
  }


  render () {


    return (
        <div className="main-page">
          <div className="my-avatar ">
            <img  src={this.state.avatar} />
          </div>
          <p className="my-name">{this.state.userName}</p>

          <Link to="/api/markToday" className="new-wrap">
            <div className="add-icon">+</div>
            <div className="add-text">添加今日状态</div>
          </Link>

          {
            this.state.hasMore&&this.state.list.map((item,index)=>(
              <div className="new-wrap" key={index}>
                <img src={item.img}/>
                <span>{item.text}</span>
                <p>{item.time}</p>
              </div>
            ))
          }
        </div>
    )
  }
}
import './index.less';

import logo from "./logo.svg";
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import history from "./history"
import LuatKetHop from "./LuatKetHop.jsx";
import { Dropdown, Button } from "react-bootstrap";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import TapPhoBien from "./TapPhoBien"
import DuDoan from "./DuDoan"
import {
  AllCheckerCheckbox,
  Checkbox,
  CheckboxGroup,
} from "@createnl/grouped-checkboxes";
import {
  faPen,
  faTimesCircle,
  faSearch,
  faFilter,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"



function App() {
 const [data1, setData] = useState([]);
  var data = require('./data.json');
  //setData(data)
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // TODO: Should split into a separated api file instead of usin fetch directly
  //       // const queryParamsString = queryString.stringify();
  //       const requestUrl = `http://25.51.208.144:8080/?minSup=${sup}&minConfidence=${conf}`;
  //       const response = await fetch(requestUrl);
  //       const responseJSON = await response.json();

  //       console.log(responseJSON);
  //       setData(responseJSON);
  //     } catch (error) {
  //       console.log('Failed to fetch posts: ', error.message);
  //     }
  //   }
  //   fetchData();
  // }, []);
  console.log(data);
  const handleSubmit = () => {
    // let int = 
    // console.log(sup,conf);
    return axios.get(`http://25.51.208.144:8080/?minSup=${sup}&minConfidence=${conf}`).then(res => { setData(res.data) });
  }

  const [sup, setSup] = useState(1.5);
  const [conf, setConf] = useState(0);

  const onCheckboxStateChange = (arrCheckbox) => {
    var list = [];
    arrCheckbox.map((item, index) => {
      if (item.checked === true) {
        list.push({ "id": item.value, "name": item.name });
      }
    });


    setFindX(list);
    // console.log(list);
    // history.push("/c")


  };
  const add = (arr, j) => {
    const found = arr.some((el) => el.id === j.id);
    if (!found) arr.push({ id: j.id, name: j.name });
    return arr;
  };
  const add1 = (arr, j, number) => {
    

    const found = arr.some((el) => el.id === j.id);
    if (!found) arr.push({ id: j.id, name: j.name, confidence: number });
    // setArrItemset(arr)
    // console.log(arr);
    return arr;
  };

  let array = [];

  data.associateRules &&
    data.associateRules.map((item, index) => {
      item.sourceItemset.map((j, index) => {
        add(array, j);
      });
    });
  const [findX, setFindX] = useState([]);
  const [arrayResult, setArrayResult] = useState([]);
  const [arrItemset, setArrItemset] = useState([]);
  const [arrIndex, setArrIndex] = useState([]);
  const [childrentList, setChildrentList] = useState([]);
  const [node, setNode] = useState({});


  // console.log("Luật Kết Hợp", data.associateRules);
  // console.log("Index dervied itemset", arrayResult);
  // console.log("Values", arrItemset);

  const checkLength = () => {
    let arrIndex1 = [];
    if(findX.length===0){
  
      return arrIndex1;
    }
    else{
      data.associateRules &&
        data.associateRules.map((item, index) => {
          if (item.sourceItemset.length === findX.length) {
            arrIndex1.push(index);
          }
        });
      setArrIndex(arrIndex1);
      return arrIndex1;
    }
    
   
  };


  const compareValues = () => {
    let list = [];

    if (checkLength().length===0){
      setArrayResult([]);

      return list;
    }else{

    
    checkLength().forEach((element) => {

      let result = [];
      result = data.associateRules[element].sourceItemset.filter((item1) =>
        findX.some((item2) => item1.id === item2.id)
      );

      if (result.length === findX.length) {
   
        list.push(element);
      }

    });
    setArrayResult(list);

    return list;
    }

  };
  useEffect(() => {
    checkLength();
    compareValues();
    check();
    generateTree()


  }, [findX])




  const check = () => {
    let data2 = [];
    let list = [];
    if (compareValues().length === 0) {
      setArrItemset([])
    }
    else {
      compareValues().forEach((element) => {
  
        let confidence = data.associateRules && data.associateRules[element].confidence;
        data.associateRules && data.associateRules[element].derivedItemset.map((item, index) => {
           data2 = add1(arrItemset, item, confidence)
        });
      }
      );
      setArrItemset(data2)
    }
  };


  const generateTree = () => {
    let nameParent = "";
    let childrentList = [];
    if(findX.length===0){
       setNode([]);
    }
    else{
      findX.map((item, index) => {
        nameParent += `${item.name + ";"}`
      });
      arrItemset.map((item, index) => {
        childrentList.push(item)
      });
      let Node = { "parent": nameParent, "childrent": childrentList };
      setNode({ "parent": nameParent, "childrent": childrentList })

      return Node;

    }
    
  }



  return (

    <BrowserRouter>
      <div classname="container">
        <img className="img-fuild bg" src="https://image.shutterstock.com/image-vector/data-mining-banner-web-icon-260nw-1484974583.jpg" />
        
        {/* <div class="row" id="search" style={{ marginTop: "30px", marginBottom: "50px" }}>
          <div class="col-xs-3 col-sm-3"></div>
          <div class="col-xs-2 col-sm-2">
            <Link to="/a" type="submit" class="btn btn-outline-primary btn-block">Tập Phổ Biến</Link>
          </div>
          <div class=" col-xs-2 col-sm-2">
            <Link to="/b" type="submit" class="btn btn-outline-primary btn-block">Luật Kết Hợp</Link>
          </div>
          <div class=" col-xs-2 col-sm-2">
            <Link to="/c" type="submit" class="btn btn-outline-primary btn-block">Dự Đoán</Link>
          </div>
          <div class="col-xs-3 col-sm-3"></div>
        </div> */}
        <div class="row" id="search" style={{ marginTop: "30px", marginBottom: "50px" }}>
          <div class="col-3"></div>
          <div class="col-xs-2 col-sm-2">
            <div className="row">
              <div className="col-4">Minsup (%)</div>
              <div className="col-8">
                <input className="minsupInput" value={sup} onChange={(e) => { setSup(e.target.value) }}></input>
              </div>
            </div>
          </div>
          <div class=" col-xs-2 col-sm-2">
            <div className="row">
              <div className="col-4">MinConf (%)</div>
              <div className="col-8">
                <input className="minsupInput" value={conf} onChange={(e) => { setConf(e.target.value) }}></input>
              </div>
            </div>
          </div>
         
          <div class="col-xs-2 col-sm-2">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8">
                <button className="btn btn-danger" onClick={handleSubmit}>Xuất Kết Quả</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row"> 
        <div class="col-4"></div>
          <div class=" col-xs-3 col-sm-3">
            <div className="row">
              <div className="col-4">Select Product</div>
              <div className="col-8">
                <Dropdown> {node.parent}
                  <Dropdown.Toggle className="dropdownFilter"></Dropdown.Toggle>
                  <Dropdown.Menu className="dropdownMenu">
                    <CheckboxGroup onChange={onCheckboxStateChange}>

                      {array &&
                        array
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((item) => {

                            return (
                              <div>

                                <Checkbox value={item.id} name={item.name} />{" "}
                                {item.name}

                              </div>
                            );
                          })}
                    </CheckboxGroup>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

          </div>
          <div class="col-3"></div>
        </div>
        <Route exact path="/b" render={({ match, history }) => <LuatKetHop data={data}></LuatKetHop>} />
        <Route exact path="/a" render={({ match, history }) => <TapPhoBien data={data}></TapPhoBien>} />
        <Route exact path="/c" render={({ match, history })=><DuDoan data={node}></DuDoan> } />
        {/* <Route exact path="/profile/:id" render={({ match, history }) => <Profile onProfile={this.onProfile} match={match} />} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

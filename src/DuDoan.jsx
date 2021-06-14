import logo from "./logo.svg";
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import history from "./history"
import LuatKetHop from "./LuatKetHop.jsx";
import { Dropdown, Button } from "react-bootstrap";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
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
import axios from "axios";



function DuDoan(props) {
  
  
 
  return (
      
<div className="container">


   
     {
        props.data.childrent && props.data.childrent.length ==0?"":(
             <Table bordered class="scroll">
        <thead>
          <tr className="tableTitle">
            <th>Name</th>
            <th>Confidence</th>
          </tr>
        </thead>

        <tbody>
              {props.data.childrent  &&
                props.data.childrent.sort((a, b) => b.confidence - (a.confidence)).map((item, index) => {
              return (
                <Fragment>
                  <tr key={index}>
                    <td>
                      {"{" +
                       
                           item.name
                        +
                        "}"}
                    </td>
                    <td> {(Math.floor(item.confidence * 100, 2))}%</td>
                  </tr>
                </Fragment>
              );
            })}
        </tbody>
      </Table>
      
         ) 
     }
      
      </div>
  );
          }

export default DuDoan;

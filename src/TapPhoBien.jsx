import logo from "./logo.svg";
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import { Table } from "reactstrap";



function TapPhoBien(props) {
  const [data, setData] = useState([]);
  console.log(props);
 
  return (
<div className="container">
      <p style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>Tổng số tập phổ biến: {props.data.frequentItemsetCount}</p>
      <Table bordered class="scroll">
        <thead>
          <tr className="tableTitle">
            <th>Itemset</th>
            <th>Support</th>
          </tr>
        </thead>

        <tbody>
          {props.data.frequentItemsets &&
            props.data.frequentItemsets.map((item, index) => {
              return (
                <Fragment>
                  <tr key={index}>
                    <td>
                      {"{" +
                        item.products.map((j, index) => {
                          return j.name;
                        }) +
                        "}"}
                    </td>
                    <td>{item.count}</td>
                  </tr>
                </Fragment>
              );
            })}
        </tbody>
      </Table>
      </div>
  );
          }

export default TapPhoBien;

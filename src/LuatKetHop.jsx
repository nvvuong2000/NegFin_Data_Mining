import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import { Table } from "reactstrap";

function App(props) {

  const data = [];
  return (

    <div className="container">
      <p style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>Tổng số luật kết hợp: {props.data.associateRuleCount}</p>
      <Table bordered class="scroll">
        <thead>
          <tr className="tableTitle">
            <th>Source Itemset</th>
            <th>Derived Itemset</th>
            <th>Confidence</th>
          </tr>
        </thead>

        <tbody>
          {
            props.data.associateRules && props.data.associateRules.map((item, index) => {
              console.log(item)
              return (<Fragment>
                <tr key={index}>
                  <td>
                    {"{" + item.sourceItemset.map((j, index) => { return j.name }) + "}"}
                  </td>
                  <td>
                    {"{" + item.derivedItemset.map((k, index) => { return k.name; }) + "}"}
                  </td>
                  <td>
                    {(Math.floor(item.confidence*100,2))}%
                  </td>
                </tr>
              </Fragment>)

            })
          }
        </tbody>
      </Table>
    </div>
  );
}

export default App;

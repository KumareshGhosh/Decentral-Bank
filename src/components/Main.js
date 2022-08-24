import React, { Component } from "react";
import Web3 from "web3";
import tether from "../tether.png";

class Main extends Component {
  //react code goes here
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: "Black" }}>
              <th scope="col"> Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "Black" }}>
              <td>
                {window.web3.utils.fromWei(this.props.StakingBalance, "Ether")}{" "}
                USDT
              </td>
              <td>
                {window.web3.utils.fromWei(this.props.rwdBalance, "Ether")} RWD
              </td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: ".9" }}>
          <form className="mb-3">
            <div style={{ borderSpacing: "0 lem" }}>
              <label className="float-left" style={{ marginLeft: "15px" }}>
                <b>Stake Tokens </b>{" "}
              </label>
              <span className="float-right" style={{ marginRight: "9px" }}>
                Balance :{" "}
                {window.web3.utils.fromWei(this.props.tetherBalance, "Ether")}
              </span>
              <div className="input-group mb-4">
                <input type="text" placeholder="0" required />
                <div className="input-group-open">
                  <div className="input-group-text">
                    <img src={tether} alt="tether" height={"32"} />
                    &nbsp;&nbsp;&nbsp; USDT
                  </div>
                </div>
              </div>
              <button
                type="Submit"
                className="btn btn-primary btn-lg btn-block"
              >
                DEPOSIT
              </button>
            </div>
          </form>
          <button className="btn btn-primary btn-lg btn-block">WITHDRAW</button>
          <div className="card-body text-center" style={{ color: "Blue" }}>
            AIRDROP
          </div>
        </div>
      </div>
    );
  }
}
export default Main;

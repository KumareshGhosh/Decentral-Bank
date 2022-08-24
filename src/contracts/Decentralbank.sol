//SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    address public owner;
    string public name = "Decentral bank";
    Tether public tether;
    RWD public rwd;

    address[] public stakers;
    mapping(address => uint) public StakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) {
        tether = _tether;
        rwd = _rwd;
        owner = msg.sender;
    }

    //staking function
    function depositTokens(uint _amount) public {
        require(_amount > 0, "Staking amount cannot be zero");
        //tranfer the amount to stakers
        tether.transferfrom(msg.sender, address(this), _amount);
        //updating staking balance
        StakingBalance[msg.sender] += _amount;
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        //update staking balance
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    //unstake token
    function unstakeTokens() public {
        uint balance = StakingBalance[msg.sender];
        require(balance > 0, "staking balance can't be zero");
        //transfer the tokens to the specified contract address from our bank
        tether.transfer(msg.sender, balance);
        //reset staking balance
        StakingBalance[msg.sender] = 0;
        //update staking status
        isStaking[msg.sender] = false;
    }

    //issue reward token
    function issutoken() public {
        require(owner == msg.sender, "Only owner can call the reward token");
        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = StakingBalance[recipient] / 9; //make sure to give incentive of 1/9 th of every stakers investment
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }
}

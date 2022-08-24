//SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;

contract RWD {
    string public name = "Reward token";
    string public symbol = "RWD";
    uint256 public totalSupply = 1000000 ether;
    uint8 public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint value);

    event Approval(
        address indexed _owner,
        address indexed _receiver,
        uint value
    );

    mapping(address => uint256) public balanceof;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceof[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 value)
        public
        returns (bool success)
    {
        require(balanceof[msg.sender] >= value, "ERROR");
        balanceof[msg.sender] -= value;
        balanceof[_to] += value;
        emit Transfer(msg.sender, _to, value);
        return true;
    }

    function approve(address _receiver, uint256 value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_receiver] = value;
        emit Approval(msg.sender, _receiver, value);
        return true;
    }

    function transferfrom(
        address _from,
        address _to,
        uint256 value
    ) public returns (bool success) {
        require(value <= balanceof[msg.sender]);
        require(value <= allowance[msg.sender][_from]);

        balanceof[_to] += value;
        balanceof[_from] -= value;
        allowance[_from][msg.sender] -= value;
        emit Transfer(_from, _to, value);
        return true;
    }
}

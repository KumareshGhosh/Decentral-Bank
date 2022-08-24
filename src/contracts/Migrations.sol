//SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;

contract Migrations {
    address public owner;
    uint public last_completed_migration;

    constructor() {
        owner = msg.sender;
    }

    modifier Restricted() {
        if (owner == msg.sender) _;
    }

    function setCompleted(uint completed) public Restricted {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public Restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}

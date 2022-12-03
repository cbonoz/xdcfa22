// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// This is the main building block for smart contracts.
contract FreightContract {
    // Some string type variables to identify the token.
    string public name;
    // Last recorded values.
    string public location;
    string public lat;
    string public lng;
    string public notes;
    address public lastSender;

    // Indicates if the contract is active or completed (false on creation).
    bool public isCompleted;

    // The Transfer event helps off-chain applications understand
    // what happens within your contract.
    event FreightEvent(address indexed owner, string indexed name, address indexed updater, string notes, string lat, string lng, string ipfsUrl);

    constructor(string memory _name, string memory _notes) payable {
        console.log("Deploying a FreightContract contract with name:", _name);
        name = _name;
        notes = _notes;
        isCompleted = false;
    }

    function recordParcelEvent(string memory _notes, string memory _lat, string memory _lng, string memory ipfsUrl) public {
        require(!isCompleted, "This FreightContract has been marked completed and is no longer accepting events.");

        lastSender = msg.sender;
        notes = _notes;
        lat = _lat;
        lng = _lng;

        emit FreightEvent(lastSender, name, msg.sender, lat, lng, notes, ipfsUrl);
    }

    function markCompleted() public {
        isCompleted = true;
    }
}
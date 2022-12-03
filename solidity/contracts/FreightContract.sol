// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


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

   // An address type variable is used to store ethereum accounts.
    address public owner;
    bool public isCompleted;

    // The Transfer event helps off-chain applications understand
    // what happens within your contract.
    event FreightEvent(address indexed owner, string indexed name, address indexed updater, string notes, string lat, string lng, string ipfsUrl);

    constructor(string memory _name, string memory _notes) payable {
        owner = msg.sender;
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

        emit FreightEvent(owner, name, msg.sender, lat, lng, notes, ipfsUrl);
    }

    function markCompleted() public {
        require(msg.sender == owner, "Only the contract owner may call this function");
        isCompleted = true;
    }
}
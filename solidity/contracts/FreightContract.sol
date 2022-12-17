// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// This is the main building block for smart contracts.
contract FreightContract is Ownable {
    // Some string type variables to identify the token.
    string public name;

    // Last recorded values.
    string public lat; // Latitude of the last recorded location.
    string public lng; // Longitude of the last recorded location.
    string public notes; // Notes from the last recorded update.
    string public lastIpfsUrl; // Last images uploaded to IPFS.
    address public lastSender;

    // Indicates if the contract is active or completed (false on creation).
    bool public isCompleted;

    // The emitted FreightEvent enables off-chain applications to track
    // updates within the contract.
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

        emit FreightEvent(owner(), name, msg.sender, lat, lng, notes, ipfsUrl);
    }

    function markCompleted() public onlyOwner {
        isCompleted = true;
    }
}
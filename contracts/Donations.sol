// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Donations is Ownable {
    mapping (address => uint) donatersBalances;
    mapping (address => bool) isDonater;
    address[] internal donatersArray;


    function makeDonation() public payable { 
        if (isDonater[msg.sender]) {
            donatersBalances[msg.sender] += msg.value;
        } 
        if(!isDonater[msg.sender]) {
            isDonater[msg.sender] = true; 
            donatersBalances[msg.sender] += msg.value;
            donatersArray.push(msg.sender);
        } 
    }

    receive() external payable { // recieve donation from anywhere to contract's address
        if (isDonater[msg.sender]) {
            donatersBalances[msg.sender] += msg.value;
        } 
        if(!isDonater[msg.sender]) {
            isDonater[msg.sender] = true; 
            donatersBalances[msg.sender] += msg.value;
            donatersArray.push(msg.sender);
        } 
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw(address payable _to, uint _amount) external onlyOwner {
        _to.transfer(_amount);
    }

    function withdrawAll(address payable _to) external onlyOwner {
        _to.transfer(address(this).balance);
    }

    function donatedByAddress(address donaterAddress) public view returns(uint256) {
        return donatersBalances[donaterAddress];
    }

    function getDonatersList() public view returns(address[] memory) {
        return donatersArray;
    }

}
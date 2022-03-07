// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

// Unfortunately, because I only heard about the academy yesterday, 
// I did not have time to complete the assignment in full 


contract Donations is Ownable {
    mapping (address => uint) donatersBalances;
    mapping (address => bool) isDonater;
    address[] internal donatersArray;

    function makeDonation() external payable {
        if (isDonater[msg.sender]) {
            donatersBalances[msg.sender] += msg.value;
        } else {
            isDonater[msg.sender] = true; 
            donatersBalances[msg.sender] += msg.value;
            donatersArray.push(msg.sender);
        } 
    }

    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdrawAllfunds(address payable to) external onlyOwner {
        to.transfer(address(this).balance);
    }

    function donatedByAddress(address donaterAddress) public view returns(uint256) {
        return donatersBalances[donaterAddress];
    }

    function uniqueDonatersAddresses() public view returns(address[] memory) {
        return donatersArray;
    }

}
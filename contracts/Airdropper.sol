// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Airdropper is ERC20 {    

    uint holderCount = 0;
    mapping(address => bool) isHolder;
    mapping(uint => address) holders;
    address owner;
    uint public threshold = 0;

    constructor (uint256 totalSupply) ERC20("Airdropper", "ADRP") {        
        _mint(msg.sender, totalSupply);
        transfer(msg.sender, 1000000000);        
        _addHolder(msg.sender);     
    }         

    function _addHolder(address _holder) private {
        if (isHolder[_holder] == false) {
            isHolder[_holder] = true;
            holders[holderCount] = _holder;
            holderCount++;
        } 
    }   

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {        
        require(amount > 0, "Cannot send zero value");                        

        // Make transfer
        _transfer(msg.sender, recipient, amount);       

        // Once transfer is successful, transfer 1 token to all holders from owner's account
        for (uint i = 0; i < holderCount; i++) {
            address account = holders[i];
            if (balanceOf(account) > threshold && account != msg.sender && account != recipient) {
                _transfer(owner, holders[i], 1);                            
            }
        }     

        // Add recipient as new holder
        _addHolder(recipient);

        return true;
    }
}

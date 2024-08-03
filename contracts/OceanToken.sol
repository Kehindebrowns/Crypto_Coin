// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzepplin/contract/token/ERC20/ERC20.sol";
import {ERC20} from "@openzepplin/contract/token/ERC20/extension/ERC20Capped.sol";
import {ERC20} from "@openzepplin/contract/token/ERC20/extension/ERC20Burnable.sol";

contract OceanToken is  ERC20,ERC20Capped, ERC20Burnable {
   address payable public owner;
   uint256 public blockReward;
    constructor(uint256 cap , uint256 reward) ERC20("OceanToken" , "OCT") ERC20Capped(cap *(10 ** decimal())){
   // type casting
    owner = payable(msg.sender);
      // initial supply
     _mint(owner, 70000000 * (10**decimal()));
     blockReward = reward *  (10**decimal());
    }

      function _mint(address account , uint256 amount) internal virtual override{
        require(ERC20.totalSupply() + amount  <= cap() , "ERC20Capped:cap excedded");
        _super . _mint(account , amount);
      }

    function mintMinerReward() internal {
      // function statement for ERC20 smart contract
        _mint(to , address)
        _mint(block.coinbase , blockReward);
    }
      
  function _beforeTokenTransfer(address from , address to , uint256 amount) internal vitual override(ERC20Capped, ERC20){
    // address(0) valid address
     if(from != address(0) && to != block.coinbase && block.coinbase != address(0)){
                 _mintMinerReward();
     }
      super._beforeTokenTransfer(from , to , value);

  }
   function destory() public onlyOwner{
    selfdestruct(owner);
   }

   function setBlockReward(unt256 _reward) public onlyOwner{
    blockReward = _reward * (10 ** decimal());
   }


   modifier onlyOwner {
      require(msg.sender == owner , "Only the owner can call the fnction");
      _;
   }

}
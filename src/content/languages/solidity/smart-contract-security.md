---
title: "Smart Contract Security"
description: "Mastering critical patterns to prevent hacks and financial loss"
---

## Why Security Matters

In Web3, "Code is Law." If a smart contract has a vulnerability, it can be drained of millions of dollars in seconds. Unlike traditional software, you cannot easily "patch" a deployed contract. 

Security isn't a feature; it's the foundation.

## 1. Reentrancy Attacks

This is the most famous vulnerability (the cause of the DAO hack). It occurs when a contract calls an external address before updating its internal state. The external contract can "re-enter" the original contract and call the withdraw function again.

### The Vulnerable Code:
```solidity
function withdraw() public {
    uint balance = balances[msg.sender];
    (bool success, ) = msg.sender.call{value: balance}(""); // EXTERNAL CALL
    require(success);
    balances[msg.sender] = 0; // UPDATE STATE TOO LATE
}
```

### The Fix: Checks-Effects-Interactions
Always follow this order:
1.  **Checks**: Validate inputs and requirements.
2.  **Effects**: Update your internal state (balances).
3.  **Interactions**: Make the external call.

```solidity
function withdraw() public {
    require(balances[msg.sender] > 0); // CHECK
    balances[msg.sender] = 0;          // EFFECT
    payable(msg.sender).transfer(bal); // INTERACTION
}
```

## 2. Integer Overflows and Underflows

Before Solidity 0.8.0, numbers would "wrap around" if they exceeded their limit. 
- `0 - 1 = 2^256 - 1` (huge number!)

**Solution**: Use Solidity 0.8.0 or higher (which checks for overflow automatically) or use the OpenZeppelin `SafeMath` library.

## 3. Access Control

Ensuring that only the right people can call sensitive functions (like `withdraw` or `pause`).

```solidity
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable {
    function restrictedAction() public onlyOwner {
        // ...
    }
}
```

## 4. Visibility Pitfalls

Be explicit about function visibility: `external`, `public`, `internal`, or `private`. Defaulting to `public` can accidentally expose admin functions.

## 5. Randomness

On-chain randomness (using `block.timestamp` or `block.difficulty`) is **NOT secure**. Miners can manipulate these values. 

**Solution**: Use an oracle like **Chainlink VRF** for true, verifiable randomness.

## Summary Checklist
- [x] Follow Checks-Effects-Interactions pattern.
- [x] Use ReentrancyGuard modifiers.
- [x] Use Solidity 0.8.0+ for overflow protection.
- [x] Use OpenZeppelin for industry-standard access control.
- [x] Audit your external calls and visibility.
- [x] Never rely on on-chain data for randomness.
---

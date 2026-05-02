---
id: solidity
name: Solidity
slug: solidity
description: "The primary language for writing smart contracts on Ethereum and other EVM-compatible blockchains."
iconName: database
category: "Blockchain"
difficulty: "Intermediate"
featured: true
relatedLanguages: ["javascript", "cplusplus", "python"]
---

# Solidity: The Language of Smart Contracts

Solidity is a statically-typed, contract-oriented language designed for the Ethereum Virtual Machine (EVM). It enables developers to create self-executing applications with trustless logic.

## Key Concepts

- **Smart Contracts**: Programs that live at a specific address on the blockchain.
- **Gas**: The fee paid to execute operations on the network.
- **State Variables**: Data stored permanently in contract storage.
- **Events**: A way to log data to the blockchain for off-chain applications (like React frontends) to listen to.

## A Basic Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;

    event DataChanged(uint256 newValue);

    function set(uint256 x) public {
        storedData = x;
        emit DataChanged(x);
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
```

## Security Matters

Because smart contracts handle value (money), security is paramount. Common vulnerabilities include:
- **Reentrancy**: When an external call drains funds before state is updated.
- **Integer Overflow**: (Mostly fixed in 0.8+).
- **Access Control**: Ensuring only the `owner` can call sensitive functions.

## Summary Table

| Concept | Description |
|---------|-------------|
| **Mappings** | Key-value pairs (`mapping(address => uint)`) |
| **Modifiers** | Reusable code to check conditions before function execution. |
| **View/Pure** | Functions that don't modify state (free to call off-chain). |
| **Payable** | Functions that can receive Ether. |

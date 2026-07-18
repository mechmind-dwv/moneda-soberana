// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MonedaSocial.sol";

contract MonedaSocialTest is Test {
    MonedaSocial moneda;
    address alice = address(0x1);
    address bob   = address(0x2);
    address treasury = address(0x3);

    function setUp() public {
        uint256 demurrageRate = 3_858_000_000; // ~1% mensual en 1e18 por segundo
        uint256 baseCredit = 1000 ether;
        moneda = new MonedaSocial(demurrageRate, baseCredit, treasury, 10000 ether);
    }

    function testInitialInvariant() public {
        assertEq(moneda.balance(alice), 0);
        assertEq(moneda.balance(bob), 0);
        assertEq(moneda.balance(treasury), 0);
    }

    function testTransferCreatesCredit() public {
        vm.prank(alice);
        moneda.transfer(alice, bob, 100 ether);
        assertEq(moneda.balance(alice), -100 ether);
        assertEq(moneda.balance(bob), 100 ether);
    }

    function testCannotExceedCreditLimit() public {
        uint256 limit = moneda.getEffectiveCreditLimit(alice);
        vm.prank(alice);
        moneda.transfer(alice, bob, limit);
        vm.expectRevert();
        vm.prank(alice);
        moneda.transfer(alice, bob, 1);
    }

    function testDemurrageReducesPositiveBalance() public {
        vm.prank(alice);
        moneda.transfer(alice, bob, 100 ether);
        vm.warp(block.timestamp + 30 days);
        moneda.applyDemurrage(bob);
        int256 balanceBob = moneda.balance(bob);
        assertLt(balanceBob, 100 ether);
        assertGt(balanceBob, 98 ether);
        assertGt(moneda.balance(treasury), 0);
    }

    function testDemurrageDoesNotAffectNegativeBalance() public {
        vm.prank(alice);
        moneda.transfer(alice, bob, 50 ether);
        vm.warp(block.timestamp + 30 days);
        moneda.applyDemurrage(alice);
        assertEq(moneda.balance(alice), -50 ether);
    }
}

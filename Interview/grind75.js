/*
Two Sum: Array
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
*/

var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

/*
Add two numbers: Linked list
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // Construct a dummy Listnode
    let dummy = new ListNode()
    let current = dummy
    let carry = 0
    // add two digit if exist and calculate carry if there's any digit left
    while (l1 !== null || l2 !== null){
        // take current node or make it 0 if no node left
        let x = (l1 !== null) ? l1.val : 0
        let y = (l2 !== null) ? l2.val : 0
        // calculate sum and carry
        let sum = carry + x + y
        carry = Math.floor(sum / 10)
        // put remainder in next node
        current.next = new ListNode(sum % 10)
        // move to next dummy node
        current = current.next
        // move to next l1, l2 node
        if (l1 !== null){l1 = l1.next}
        if (l2 !== null){l2 = l2.next}
    }
    // add another node if last sum exceed 10
    if (carry > 0){
        current.next = new ListNode(carry)
    }
    // return the entry point, which is the second dummy
    return dummy.next
};
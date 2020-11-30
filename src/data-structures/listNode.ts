/**
 * Node class for linked list
 * This class has both doubly pointers and a singly pointer (_next)
 * The singly pointer is used in the hash map implementation for separate chaining
 * The doubly pointers is used in the LRU cache implementation
 */

export default class ListNode {
  key: string;
  val: string;
  next: ListNode | null;
  prev: ListNode | null;
  _next: ListNode | null;

  constructor(key: string, val: string) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
    this._next = null;
  }
}

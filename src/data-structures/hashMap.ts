import ListNode from "./listNode";
import hash from "string-hash";

/**
 * Hash map implemented using array and singly linked list (separate chaining for collisions)
 */

// constant variables to decide number of initial buckets and load factor of the hash map
const NUM_BUCKETS = 100;
const LOAD_FACTOR = 0.75;

export default class HashMap {
  buckets: ListNode[] | null[];
  numBuckets: number;
  size: number;
  loadFactor: number;

  constructor() {
    this.size = 0;
    this.numBuckets = NUM_BUCKETS;
    this.loadFactor = LOAD_FACTOR;
    this.buckets = new Array(this.numBuckets).fill(null);
  }

  getIndex(key: string): number {
    return hash(key) % this.numBuckets;
  }

  get(key: string): ListNode | null {
    const index = this.getIndex(key);
    let head = this.buckets[index];

    // iterate through list to see if key exists
    while (head !== null) {
      if (head.key == key) {
        return head;
      }
      head = head._next;
    }

    // default to null if no entry found
    return null;
  }

  set(key: string, val: string): ListNode {
    const index = this.getIndex(key);
    let head = this.buckets[index];

    // replace existing value if key already exists
    while (head !== null) {
      if (head.key == key) {
        head.val = val;
        return head;
      }
      head = head._next;
    }

    // otherwise add to the head of the list
    this.size++;
    const node = new ListNode(key, val);
    node._next = this.buckets[index];
    this.buckets[index] = node;

    // check if it needs rehashing
    const currLoad = this.size / this.numBuckets;
    if (currLoad > this.loadFactor) {
      this.rehash();
    }

    return node;
  }

  delete(key: string): ListNode | null {
    const index = this.getIndex(key);

    let head = this.buckets[index];
    let prev = null;

    // find node with matching key
    while (head !== null) {
      if (head.key === key) {
        break;
      }
      prev = head;
      head = head._next;
    }

    // no key exists
    if (head === null) {
      return null;
    }

    this.size--;

    // edge case if node to remove is the head as well
    if (prev === null) {
      this.buckets[index] = head._next;
    } else {
      prev._next = head._next;
    }

    return head;
  }

  rehash(): void {
    const oldBuckets = this.buckets;

    // create new buckets
    this.buckets = new Array(this.numBuckets * 2).fill(null);

    // update size and numBuckets
    this.size = 0;
    this.numBuckets = this.numBuckets * 2;

    // move all nodes to new bucket
    // make sure to update bucket linked list pointers as well
    for (const bucket of oldBuckets) {
      let curr = bucket;
      while (curr !== null) {
        const newIndex = this.getIndex(curr.val);
        const newBucket = this.buckets[newIndex];

        const temp = curr._next;

        curr._next = newBucket;
        this.buckets[newIndex] = curr;
        this.size++;
        curr = temp;
      }
    }
  }
}

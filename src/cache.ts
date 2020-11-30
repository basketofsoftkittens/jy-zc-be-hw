import HashMap from "./data-structures/hashMap";
import ListNode from "./data-structures/listNode";
/**
 * LRU Cache implemented with hash map and doubly linked list
 */

// constant variable to determine max size of cache before it starts evicting
const MAX_SIZE = 25;

export default class ZenCache {
  private static instance: ZenCache;
  private hashMap: HashMap;
  private size: number;
  private maxSize: number;
  private head: ListNode;
  private tail: ListNode;

  constructor() {
    this.hashMap = new HashMap();
    this.size = 0;
    this.maxSize = MAX_SIZE;

    // use dummy variables in head/tail to simplify adding/removing nodes (no null checks needed)
    this.head = new ListNode("dummyHead", "dummyHead");
    this.tail = new ListNode("dummyTail", "dummyTail");
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // singleton pattern for the cache
  static getInstance(): ZenCache {
    if (!ZenCache.instance) {
      ZenCache.instance = new ZenCache();
    }

    return ZenCache.instance;
  }

  // for debugging purposes
  printNodes(): void {
    for (const bucket of this.hashMap.buckets) {
      if (bucket) {
        console.log(bucket);
      }
    }
  }

  // for debugging purposes
  printSize(): void {
    console.log(this.hashMap.size);
    console.log(this.size);
  }

  addNode(node: ListNode): void {
    // add nodes after the dummy head
    node.prev = this.head;
    node.next = this.head.next;

    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node: ListNode): void {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  removeTail(): ListNode {
    // remove nodes before the dummy tail
    const nodeToRemove = this.tail.prev;
    this.removeNode(nodeToRemove);

    return nodeToRemove;
  }

  addToHead(node: ListNode): void {
    this.removeNode(node);
    this.addNode(node);
  }

  get(key: string): string | null {
    const node = this.hashMap.get(key);

    // return null if no key exists
    if (!node) {
      return null;
    }

    // remove from current position in list and add it to the head
    this.addToHead(node);

    return node.val;
  }

  set(key: string, val: string): void {
    const node = this.hashMap.get(key);

    // if no node exists, add new one
    if (!node) {
      const newNode = this.hashMap.set(key, val);
      this.addNode(newNode);

      this.size++;

      if (this.size > this.maxSize) {
        const removedNode = this.removeTail();
        this.hashMap.delete(removedNode.key);
        this.size--;
      }
    } else {
      // else modify current one and add it back to the head
      node.val = val;
      this.addToHead(node);
    }
  }

  delete(key: string): void {
    const node = this.hashMap.get(key);

    // if key exists then proceed to delete
    if (node) {
      this.size--;
      const removedNode = this.hashMap.delete(key);
      this.removeNode(removedNode);
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }
  isEmpty() {
    return getSize() === 0;
  }

  add(data) {
    const node = new Node(data);
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
    return this;
  }
  addLast(data) {
    const node = new Node(data);
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  addAtIndex(index, data) {
    if (index < 0 || index >= this.size) {
      return -1;
    }
    let newNode = new Node(data);
    let prev = this.getNodeAt(index - 1);
    let forw = prev.next;

    prev.next = newNode;
    newNode.next = forw;
    this.size++;
  }
  // -----------------------------------------
  removeFirst() {
    let node = this.head;
    if (this.size === 0) {
      return -1;
    } else if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      node.next = null;
    }
    this.size--;
    return node.data;
  }
  removeLast() {
    let len = this.size - 2;
    let curr = this.head;
    let last = this.tail.data;
    while (curr.next !== null && len) {
      curr = curr.next;
      len--;
    }

    this.tail = curr;
    curr.next = null;
    return last.data;
  }
  removeAtIndex(index) {
    if (index < 0 || index >= this.size) {
      return -1;
    }
    let node = this.getNodeAt(index - 1);
    let forw = node.next;
    node.next = forw.next;
    forw.next = null;
    this.size--;
    return node.data;
  }

  getFirst() {
    if (this.size === 0) {
      return -1;
    }
    return this.head.data;
  }

  getLast() {
    if (this.size === 0) {
      return -1;
    }
    return this.tail.data;
  }

  getAtIndex(index) {
    if (index - 1 >= this.size) {
      return -1;
    }
    let curr = this.head;
    let idx = index - 1;
    while (curr.next && idx) {
      curr = curr.next;
      idx--;
    }
    return curr.data;
  }

  getNodeAt(idx) {
    let curr = this.head;
    while (idx-- > 0) {
      curr = curr.next;
    }
    return curr;
  }

  printll() {
    let current = this.head;
    let str = "";
    while (current !== null) {
      str = str + current.data + "->";
      current = current.next;
    }
    return str;
  }
}

const ll = new LinkedList();
console.log("size", ll.getSize());

for (let i = 1; i <= 9; i++) {
  ll.add(i * 10);
}

console.log(ll.printll());
// console.log(ll.getFirst());
// console.log(ll.getLast());
// ll.removeFirst();
// ll.removeLast();
ll.removeAtIndex(3);
console.log(ll.printll());
ll.addAtIndex(3, 60);
console.log(ll.printll());


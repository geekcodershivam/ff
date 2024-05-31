function PubSub() {
  this.list = new Map();
}

PubSub.prototype.subscribe = function (eventName, fn) {
  if (!this.list.has(eventName)) {
    this.list.set(eventName, [fn]);
  } else {
    this.list.set(eventName, [...this.list[eventName], fn]);
  }
  return {
    unsubscribe: () => {
      if (this.list.has(eventName)) {
        const data = this.list.get(eventName).filter((ele) => ele != fn);
        this.list.set(eventName, data);
      }
    },
  };
};

PubSub.prototype.publish = function (eventName, value) {
  return (this.list.get(eventName) ?? []).map((ele) => {
    ele(value);
  });
};

PubSub.prototype.publishAll = function (value) {};

const user1 = new PubSub();
user1.subscribe("notify1", (payload) => {
  console.log(`I'm notifying ${payload}`);
});
user1.subscribe("notify2", (payload) => {
  console.log(`I'm notifying ${payload}`);
});
user1.publish("notify1", "shivam");
user1.publish("notify3", "Karan");

function BrowserHistory() {
  this.history = [];
  this.index = -1;
}

BrowserHistory.prototype.visit = function (url) {
  this.history[++this.index] = url;
  this.history.length = this.index + 1;
};

BrowserHistory.prototype.nextTab = function () {
  this.index = Math.min(this.history.length - 1, ++this.index);
};

BrowserHistory.prototype.prevTab = function () {
  this.index = Math.max(-1, --this.index);
};

BrowserHistory.prototype.currentTab = function () {
  return this.history[this.index] || 'Blank';
};

const tab = new BrowserHistory();
console.log(tab.currentTab());
tab.visit("Abc");
console.log(tab.currentTab());
tab.prevTab();
console.log(tab.currentTab());
tab.nextTab();
console.log(tab.currentTab());
tab.prevTab();
tab.prevTab();
console.log(tab.currentTab());

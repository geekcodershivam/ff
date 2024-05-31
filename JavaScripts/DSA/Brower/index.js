(() => {
  // Define the Tab class
  class Tab {
    constructor(url, title, favico) {
      this.url = url;
      this.title = title;
    }
  }

  // Define the Browser class
  class Browser {
    constructor() {
      this.tabs = [];
      this.currentTabIndex = -1; // Initialize currentTabIndex to -1
      this.tabsContainer = document.querySelector(".tabs");
      this.urlInput = document.querySelector(".url-input");
      this.addBtn = document.querySelector(".add");

      // Bind methods to the instance
      this.addNewTab = this.addNewTab.bind(this);
      this.handleUrlInputChange = this.handleUrlInputChange.bind(this);
      this.switchTab = this.switchTab.bind(this);
      this.closeTab = this.closeTab.bind(this);

      // Initial setup
      this.setupEventListeners();
    }

    // Method to setup event listeners
    setupEventListeners() {
      this.addBtn.addEventListener("click", this.addNewTab);
      this.urlInput.addEventListener("change", this.handleUrlInputChange);
    }

    // Method to add a new tab
    addTab(tab) {
      this.tabs.push(tab);
      this.currentTabIndex = this.tabs.length - 1;
      this.loadUrlInTabIframe(tab);
      this.renderTabs();
      this.urlInput.value = this.tabs[this.currentTabIndex].url;
    }

    // Method to load URL in tab iframe
    loadUrlInTabIframe(tab) {
      let iframe = document.querySelector(".page iframe");
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.setAttribute("class", "iframe");
        document.querySelector(".page").appendChild(iframe);
      }
      iframe.src = tab?.url;
    }

    // Method to render tabs
    renderTabs() {
      this.tabsContainer.innerHTML = "";
      this.tabs.forEach((tab, index) => {
        const tabElement = document.createElement("li");
        tabElement.innerHTML = `<span>${tab.title}</span><a class="close" href="#" data-index="${index}">×</a>`;
        tabElement.addEventListener("click", () => this.switchTab(index));
        tabElement
          .querySelector(".close")
          .addEventListener("click", (event) => this.closeTab(event));
        this.tabsContainer.appendChild(tabElement);
      });
      this.updateTabStyles();
    }

    // Method to update tab styles
    updateTabStyles() {
      this.tabsContainer.children[this.currentTabIndex]?.classList.add(
        "active"
      );
    }

    // Method to handle URL input change
    handleUrlInputChange(event) {
      const newUrl = event.target.value;
      if (this.currentTabIndex !== -1) {
        this.tabs[this.currentTabIndex].url = /^(http|https)/.test(newUrl)
          ? newUrl
          : `https://${newUrl}`;
        this.loadUrlInTabIframe(this.tabs[this.currentTabIndex]);
      }
    }

    // Method to switch to a different tab
    switchTab(newTabIndex) {
      if (
        newTabIndex !== this.currentTabIndex &&
        newTabIndex >= 0 &&
        newTabIndex < this.tabs.length
      ) {
        this.tabsContainer.children[this.currentTabIndex]?.classList.remove(
          "active"
        );
        this.currentTabIndex = newTabIndex;
        this.loadUrlInTabIframe(this.tabs[this.currentTabIndex]);
        this.urlInput.value = this.tabs[this.currentTabIndex].url;
        this.updateTabStyles();
      }
    }

    // Method to close a tab
    closeTab(event) {
      event.preventDefault();
      const tabIndex = parseInt(event.target.dataset.index);
      if (tabIndex !== -1 && this.tabs.length > 1) {
        this.tabs.splice(tabIndex, 1);
        if (this.currentTabIndex >= this.tabs.length) {
          this.currentTabIndex = this.tabs.length - 1;
        }
        this.renderTabs();
        this.urlInput.value =
          this.currentTabIndex !== -1
            ? this.tabs[this.currentTabIndex].url
            : "";
      }
    }

    // Method to reload the current tab
    reloadCurrentTab() {
      if (this.currentTabIndex !== -1) {
        this.loadUrlInTabIframe(this.tabs[this.currentTabIndex]);
      }
    }

    // Method to add new tab
    addNewTab() {
      const newTab = new Tab("https://www.example.com", "New Tab");
      this.addTab(newTab);
    }
  }

  // Usage
  const myBrowser = new Browser();
  myBrowser.addNewTab();
})();

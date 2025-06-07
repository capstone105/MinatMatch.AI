import HistoryPresenter from "./history-presenter.js";
import * as MinatMatch from "../../data/api.js";
import { getAccessToken } from "../../utils/auth";
export default class HistoryPage {
  #presenter;
  async render() {
    return `
      <section class="container mx-auto px-4">
        <div class="p-5 flex flex-col items-center min-h-screen">
          <h1 class="mt-24 md:mt-28 lg:mt-32 text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 text-center" tabindex="0">
            History of Career Recommendation 
          </h1>
          <div id="history-container" class="w-full max-w-3xl"></div>
          <div id="loading-indicator" class="fixed inset-0 items-center justify-center bg-gray-100 bg-opacity-75 z-50 hidden">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const historyContainer = document.querySelector("#history-container");
    historyContainer.innerHTML = `
        <div class="text-right mb-4">
          <button id="delete-history-button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring">
            <i class="fa-solid fa-trash"></i> Delete All
          </button>
        </div>
        <div id="history-list" class="space-y-4"></div>
      `;

    this.#presenter = new HistoryPresenter({
      view: this,
      model: MinatMatch,
      authModel: getAccessToken(),
    });

    await this.#presenter.getHistory();

    document.querySelector("#delete-history-button").addEventListener("click", () => {
      this.#presenter.deleteHistory();
    });
  }

  displayHistory(data) {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
      historyList.innerHTML = '<p class="text-gray-500">No recommendation history yet</p>';
      return;
    }

    data.forEach((item) => {
      const wrapper = document.createElement("article");
      wrapper.className = `bg-white shadow-md rounded-lg p-4 mb-4 relative focus:outline-none focus:ring-2 focus:ring-blue-400`;
      wrapper.setAttribute("tabindex", "0");
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", `History item for ${item.name}, created at ${new Date(item.createdAt).toLocaleString()}`);

      wrapper.innerHTML = `
    <h3 class="text-lg font-semibold mb-2" tabindex="0">${item.name}</h3>
    <p class="text-gray-600 mb-2" tabindex="0">Date: ${new Date(item.createdAt).toLocaleString()}</p>
    <ul class="flex-row sm:flex gap-5 justify-between pl-5" aria-label="Prediction results">
      ${item.predictions.map((pred) => `<li tabindex="0">${pred.career}: ${(pred.probability * 100).toFixed(2)}%</li>`).join("")}
    </ul>
    <button class="absolute top-2 right-2 text-red-500 hover:text-red-700 rounded-full p-2 delete-history-item-btn focus:outline-none focus:ring-2 focus:ring-red-400" data-id="${item._id}" aria-label="Delete history for ${item.name} on ${new Date(item.createdAt).toLocaleString()}" title="Delete this history item">
      <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    </button>
  `;

      historyList.appendChild(wrapper);
    });

    historyList.querySelectorAll(".delete-history-item-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = btn.getAttribute("data-id");
        this.#presenter.deleteHistoryById(id);
      });
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  showLoading() {
    const loadingIndicator = document.querySelector("#loading-indicator");
    loadingIndicator.classList.remove("hidden");
    loadingIndicator.classList.add("flex");
  }
  hideLoading() {
    const loadingIndicator = document.querySelector("#loading-indicator");
    loadingIndicator.classList.add("hidden");
    loadingIndicator.classList.remove("flex");
  }
  showError(message) {
    const historyList = document.querySelector("#history-list");
    historyList.innerHTML = `<p class="text-red-500">${message}</p>`;
  }
  deleteHistory() {
    const historyList = document.querySelector("#history-list");
    historyList.innerHTML = '<p class="text-gray-500">Recommendation history has been deleted.</p>';
  }
}

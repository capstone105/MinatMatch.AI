import HistoryPresenter from "./history-presenter.js";
import * as MinatMatch from "../../data/api.js";
import { getAccessToken } from "../../utils/auth";

export default class HistoryPage {
  #presenter;

  async render() {
  return `
    <section class="min-h-screen via-white to-indigo-50 pt-24">
      <div class="container mx-auto px-4 py-8 sm:py-12">
        <div class="flex flex-col items-center">
          <!-- Header Section -->
          <div class="text-center mb-12">
           <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center" id="history-heading" tabindex="0">
              Career History
            </h1>
            <p class="text-gray-600 text-sm sm:text-base max-w-md mx-auto" id="history-desc">
              Track your career recommendation journey and review past predictions
            </p>
          </div>

          <!-- Main Content -->
          <div id="history-container" class="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-6 sm:p-8">
            <!-- Content will be loaded here -->
          </div>

          <!-- Loading Indicator -->
          <div id="loading-indicator" class="fixed inset-0 items-center justify-center bg-white/80 backdrop-blur-sm z-50 hidden">
            <div class="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div class="flex flex-col items-center">
                <div class="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
                <p class="text-gray-600 font-medium">Loading your history...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}


  async afterRender() {
    const historyContainer = document.querySelector("#history-container");
    historyContainer.innerHTML = `
      <!-- Header Actions -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
          <h2 class="text-2xl font-bold text-gray-800" id="recommendation-history-heading">
            Recommendation History
          </h2>
        </div>
        <button id="delete-history-button"
          class="w-full sm:w-auto group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-4 py-2 sm:py-3 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base whitespace-nowrap">
          <i class="fas fa-trash mr-2 group-hover:scale-110 transition-transform"></i>
          <span>Delete All</span>
        </button>
      </div>

      <!-- History List -->
      <div id="history-list" class="space-y-6">
        <!-- History items will be loaded here -->
      </div>
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
    historyList.innerHTML = `
      <div class="text-center py-16">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
          <i class="fas fa-history text-4xl text-gray-400"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-700 mb-4" id="no-history-heading">No History Yet</h3>
        <p class="text-gray-500 text-lg max-w-md mx-auto">
          Your career recommendation history will appear here once you start using the prediction feature.
        </p>
      </div>
    `;
    return;
  }

  data.forEach((item, index) => {
    const wrapper = document.createElement("article");
    wrapper.className = `group bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-300`;
    wrapper.setAttribute("tabindex", "0");
    wrapper.setAttribute("role", "region");

    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const topPrediction = item.predictions.reduce((max, pred) =>
      pred.probability > max.probability ? pred : max
    );

    wrapper.innerHTML = `
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-3 sm:space-y-0">
        <div class="flex items-center space-x-4">
          <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base">
            ${index + 1}
          </div>
          <div>
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-1" tabindex="0">${item.name}</h3>
            <div class="flex items-center text-gray-500 text-sm">
              <i class="fas fa-calendar-alt mr-2"></i>
              <span tabindex="0">${formattedDate}</span>
            </div>
          </div>
        </div>
        <button class="delete-history-item-btn w-9 h-9 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 rounded-xl flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                data-id="${item._id}"
                aria-label="Delete history for ${item.name} on ${formattedDate}">
          <i class="fas fa-trash text-sm"></i>
        </button>
      </div>

      <!-- Top Recommendation -->
      <div class="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-6 border border-purple-100">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <p class="text-xs sm:text-sm font-semibold text-purple-600 uppercase mb-1">Top Recommendation</p>
            <h4 class="text-base sm:text-lg font-bold text-gray-800">${topPrediction.career}</h4>
          </div>
          <div class="mt-3 sm:mt-0">
            <div class="inline-flex items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1.5 rounded-xl font-bold text-sm sm:text-base">
              <i class="fas fa-star mr-2"></i>${(topPrediction.probability * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      <!-- All Predictions -->
      <div class="space-y-3" aria-label="All prediction results">
        <h5 class="text-base sm:text-lg font-semibold text-gray-700 mb-3 flex items-center" aria-label="All Predictions">
          <i class="fas fa-chart-bar mr-2 text-purple-500"></i>
          All Predictions
        </h5>
        <div class="grid gap-3">
          ${item.predictions.map((pred, predIndex) => {
            const percentage = (pred.probability * 100).toFixed(1);
            const isTop = pred === topPrediction;
            return `
              <div class="flex flex-wrap sm:flex-nowrap items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors" tabindex="0">
                <div class="flex items-center space-x-3 mb-2 sm:mb-0">
                  <div class="w-7 h-7 ${isTop ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-md flex items-center justify-center text-xs font-bold">
                    ${predIndex + 1}
                  </div>
                  <span class="font-medium text-gray-800 text-sm sm:text-base">${pred.career}</span>
                </div>
                <div class="flex items-center space-x-2 w-full sm:w-auto">
                  <div class="flex-1 sm:w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div class="h-full ${isTop ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-gray-400'} rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
                  </div>
                  <span class="font-bold text-gray-700 text-sm sm:text-base min-w-[48px] text-right">${percentage}%</span>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    historyList.appendChild(wrapper);
  });


  historyList.querySelectorAll(".delete-history-item-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      this.#presenter.deleteHistoryById(id);
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
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
    historyList.innerHTML = `
      <div class="text-center py-16">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
          <i class="fas fa-exclamation-triangle text-4xl text-red-500"></i>
        </div>
        <h3 class="text-2xl font-bold text-red-700 mb-4" id="error-history-heading">Error Loading History</h3>
        <p class="text-red-500 text-lg max-w-md mx-auto">${message}</p>
        <button onclick="location.reload()" class="mt-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          <i class="fas fa-refresh mr-2"></i>
          Try Again
        </button>
      </div>
    `;
  }

  deleteHistory() {
    const historyList = document.querySelector("#history-list");
    historyList.innerHTML = `
      <div class="text-center py-16">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
          <i class="fas fa-check-circle text-4xl text-green-500"></i>
        </div>
        <h3 class="text-2xl font-bold text-green-700 mb-4" id="cleared-history-heading">History Cleared</h3>
        <p class="text-green-600 text-lg max-w-md mx-auto">
          Your recommendation history has been successfully deleted.
        </p>
      </div>
    `;
  }
}
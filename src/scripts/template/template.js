export function generateLoggedInTemplate() {
  return `
    <div class="flex flex-col gap-4 lg:flex-row lg:gap-14 items-center">
      <ul id="nav-list" class="flex flex-col gap-1 lg:flex-row items-center" role="menubar">
        <li role="none"><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/add" role="menuitem" aria-label="Go to Add Data page">Add Data</a></li>
        <li role="none"><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/history" role="menuitem" aria-label="Go to History page">History</a></li>
        <li role="none"><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/profile" role="menuitem" aria-label="Go to Profile page">Profile</a></li>
      </ul>
      <div id="auth-controls" class="flex flex-col gap-4 lg:flex-row items-center">
        <a id="logout-button" class="inline-block w-36 py-1 rounded-full text-white text-center shadow-[0_4px_20px_rgba(93,52,241,0.5)] bg-gradient-to-r from-[#686DE0] to-[#4834D4] hover:opacity-90 transition cursor-pointer" tabindex="0" role="button" aria-label="Logout from your account">Logout</a>
      </div>
    </div>
`;
}

export function generateLoggedOutTemplate() {
  return `
    <div class="flex flex-col gap-4 lg:flex-row lg:gap-14 items-center">
      <ul id="nav-list" class="flex flex-col gap-1 lg:flex-row items-center" role="menubar">
        <li role="none"><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/" role="menuitem" aria-label="Go to Home page">Home</a></li>
        <li role="none"><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/about" role="menuitem" aria-label="Go to About page">About</a></li>
        <li role="none"><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/features" role="menuitem" aria-label="Go to Features page">Features</a></li>
      </ul>
      <div id="auth-controls" class="flex flex-col gap-4 lg:flex-row items-center">
        <a class="inline-block w-36 py-1 rounded-full text-white text-center shadow-[0_4px_20px_rgba(93,52,241,0.5)] bg-gradient-to-r from-[#686DE0] to-[#4834D4] hover:opacity-90 transition" href="#/register" role="button" aria-label="Register a new account">Register</a>
        <a id="login-button" class="inline-block w-36 py-1 rounded-full text-[#4834D4] text-center border border-[#4834D4] bg-white shadow-[0_4px_20px_rgba(93,52,241,0.3)] hover:bg-indigo-50 transition" href="#/login" role="button" aria-label="Login to your account">Login</a>
      </div>
    </div>
`;
}

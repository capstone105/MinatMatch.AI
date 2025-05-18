export function generateLoggedInTemplate() {
  return `
    <ul id="nav-list" class="flex flex-col gap-4 lg:flex-row items-center">
      <li><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/">Home</a></li>
      <li><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/about">About Us</a></li>
      <li><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/features">Features</a></li>
      <li><a id="logout-button" class="inline-block w-36 py-1 rounded-full text-white text-center shadow-[0_4px_20px_rgba(93,52,241,0.5)] bg-gradient-to-r from-[#686DE0] to-[#4834D4] hover:opacity-90 transition">Logout</a></li>
    </ul>
`;
}

export function generateLoggedOutTemplate() {
  return `
    <ul id="nav-list" class="flex flex-col gap-4 lg:flex-row items-center">
      <li><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/">Home</a></li>
      <li><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/about">About Us</a></li>
      <li><a class="block px-4 py-2 text-gray-800 font-bold hover:text-primary active:text-[#4834D4]" href="#/features">Features</a></li>
      <li><a class="inline-block w-36 py-1 rounded-full text-white text-center shadow-[0_4px_20px_rgba(93,52,241,0.5)] bg-gradient-to-r from-[#686DE0] to-[#4834D4] hover:opacity-90 transition" href="#/register">Register</a></li>
      <li><a id="login-button" class="inline-block w-36 py-1 rounded-full text-[#4834D4] text-center border border-[#4834D4] bg-white shadow-[0_4px_20px_rgba(93,52,241,0.3)] hover:bg-indigo-50 transition" href="#/login">Login</a></li>
    </ul>
`;
}

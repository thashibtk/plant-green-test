import PocketBase from "pocketbase";
const url = import.meta.env.VITE_PB_URL;
const pb = new PocketBase(url);

// PocketBase persists auth to localStorage automatically.
export default pb;

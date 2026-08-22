const hostname = window.location.hostname
console.log("hostname: ",hostname);
export const BASE_URL = hostname === "localhost" ? "http://10.40.131.227:8080/api" : "https://domain-name.onrender.com"
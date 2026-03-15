function injectScript(file) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(file);
  script.async = false;

  document.documentElement.appendChild(script);
}

injectScript("suggestions/cpp.js");
injectScript("suggestions/python.js");
injectScript("suggestions/java.js");
injectScript("suggestions/engine.js");
injectScript("inject.js");
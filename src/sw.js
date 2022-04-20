import {getFiles, setupPrecaching, setupRouting} from 'preact-cli/sw/';

setupRouting();
setupPrecaching(getFiles());

self.addEventListener("install", function () {});
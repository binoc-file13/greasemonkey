const EXPORTED_SYMBOLS = ["ScriptDependency"];

if (typeof Cc === "undefined") {
  var Cc = Components.classes;
}
if (typeof Ci === "undefined") {
  var Ci = Components.interfaces;
}
if (typeof Cu === "undefined") {
  var Cu = Components.utils;
}

Cu.import("chrome://greasemonkey-modules/content/util.js");


// Base implementation for Icon, Require, Resource.
function ScriptDependency(aScript) {
  this._charset = null;
  this._dataURI = null;
  this._downloadURL = null;
  this._filename = null;
  this._mimetype = null;
  this._name = null;
  this._script = aScript || null;
  this._tempFile = null;

  this.type = "UnknownDependency";
}

ScriptDependency.prototype = {
  "setCharset": function (aCharset) {
    this._charset = aCharset;
  },

  "setFilename": function (aFile) {
    aFile.QueryInterface(Components.interfaces.nsIFile);
    this._filename = aFile.leafName;
  },

  "setMimetype": function (aMimetype) {
    this._mimetype = aMimetype;
  },

  "toString": function () {
    return "[" + this.type + "; " + this.filename + "]";
  },
};

Object.defineProperty(ScriptDependency.prototype, "downloadURL", {
  "get": function ScriptDependency_getDownloadURL() {
    return "" + (this._downloadURL || "");
  },
  "enumerable": true,
});

Object.defineProperty(ScriptDependency.prototype, "file", {
  "get": function ScriptDependency_getFile() {
    let file = this._script.baseDirFile;

    file.append(this._filename);

    return file;
  },
  "enumerable": true,
});

Object.defineProperty(ScriptDependency.prototype, "filename", {
  "get": function ScriptDependency_getFilename() {
    return "" + (this._filename || this._dataURI || "");
  },
  "enumerable": true,
});

Object.defineProperty(ScriptDependency.prototype, "mimetype", {
  "get": function ScriptDependency_getMimetype() {
    let mimetype = this._mimetype;

    if (this._charset && (this._charset.length > 0)) {
      mimetype += ";charset=" + this._charset;
    }

    return mimetype;
  },
  "enumerable": true,
});

Object.defineProperty(ScriptDependency.prototype, "name", {
  "get": function ScriptDependency_getName() {
    return "" + this._name;
  },
  "enumerable": true,
});

Object.defineProperty(ScriptDependency.prototype, "textContent", {
  "get": function ScriptDependency_getTextContent() {
    return GM_util.getContents(this.file);
  },
  "enumerable": true,
});
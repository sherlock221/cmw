/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */
define("js/cmd/core/zepto/1.1.6/zepto", [], function(require, exports, module) {
    var Zepto = function() {
        var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter, document = window.document, elementDisplay = {}, classCache = {}, cssNumber = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        }, fragmentRE = /^\s*<(\w+|!)[^>]*>/, singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rootNodeRE = /^(?:body|html)$/i, capitalRE = /([A-Z])/g, // special attributes that should be get/set via method calls
        methodAttributes = [ "val", "css", "html", "text", "data", "width", "height", "offset" ], adjacencyOperators = [ "after", "prepend", "before", "append" ], table = document.createElement("table"), tableRow = document.createElement("tr"), containers = {
            tr: document.createElement("tbody"),
            tbody: table,
            thead: table,
            tfoot: table,
            td: tableRow,
            th: tableRow,
            "*": document.createElement("div")
        }, readyRE = /complete|loaded|interactive/, simpleSelectorRE = /^[\w-]*$/, class2type = {}, toString = class2type.toString, zepto = {}, camelize, uniq, tempParent = document.createElement("div"), propMap = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        }, isArray = Array.isArray || function(object) {
            return object instanceof Array;
        };
        zepto.matches = function(element, selector) {
            if (!selector || !element || element.nodeType !== 1) return false;
            var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
            if (matchesSelector) return matchesSelector.call(element, selector);
            // fall back to performing a selector:
            var match, parent = element.parentNode, temp = !parent;
            if (temp) (parent = tempParent).appendChild(element);
            match = ~zepto.qsa(parent, selector).indexOf(element);
            temp && tempParent.removeChild(element);
            return match;
        };
        function type(obj) {
            return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
        }
        function isFunction(value) {
            return type(value) == "function";
        }
        function isWindow(obj) {
            return obj != null && obj == obj.window;
        }
        function isDocument(obj) {
            return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
        }
        function isObject(obj) {
            return type(obj) == "object";
        }
        function isPlainObject(obj) {
            return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
        }
        function likeArray(obj) {
            return typeof obj.length == "number";
        }
        function compact(array) {
            return filter.call(array, function(item) {
                return item != null;
            });
        }
        function flatten(array) {
            return array.length > 0 ? $.fn.concat.apply([], array) : array;
        }
        camelize = function(str) {
            return str.replace(/-+(.)?/g, function(match, chr) {
                return chr ? chr.toUpperCase() : "";
            });
        };
        function dasherize(str) {
            return str.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
        }
        uniq = function(array) {
            return filter.call(array, function(item, idx) {
                return array.indexOf(item) == idx;
            });
        };
        function classRE(name) {
            return name in classCache ? classCache[name] : classCache[name] = new RegExp("(^|\\s)" + name + "(\\s|$)");
        }
        function maybeAddPx(name, value) {
            return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
        }
        function defaultDisplay(nodeName) {
            var element, display;
            if (!elementDisplay[nodeName]) {
                element = document.createElement(nodeName);
                document.body.appendChild(element);
                display = getComputedStyle(element, "").getPropertyValue("display");
                element.parentNode.removeChild(element);
                display == "none" && (display = "block");
                elementDisplay[nodeName] = display;
            }
            return elementDisplay[nodeName];
        }
        function children(element) {
            return "children" in element ? slice.call(element.children) : $.map(element.childNodes, function(node) {
                if (node.nodeType == 1) return node;
            });
        }
        // `$.zepto.fragment` takes a html string and an optional tag name
        // to generate DOM nodes nodes from the given html string.
        // The generated DOM nodes are returned as an array.
        // This function can be overriden in plugins for example to make
        // it compatible with browsers that don't support the DOM fully.
        zepto.fragment = function(html, name, properties) {
            var dom, nodes, container;
            // A special case optimization for a single tag
            if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));
            if (!dom) {
                if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
                if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
                if (!(name in containers)) name = "*";
                container = containers[name];
                container.innerHTML = "" + html;
                dom = $.each(slice.call(container.childNodes), function() {
                    container.removeChild(this);
                });
            }
            if (isPlainObject(properties)) {
                nodes = $(dom);
                $.each(properties, function(key, value) {
                    if (methodAttributes.indexOf(key) > -1) nodes[key](value); else nodes.attr(key, value);
                });
            }
            return dom;
        };
        // `$.zepto.Z` swaps out the prototype of the given `dom` array
        // of nodes with `$.fn` and thus supplying all the Zepto functions
        // to the array. Note that `__proto__` is not supported on Internet
        // Explorer. This method can be overriden in plugins.
        zepto.Z = function(dom, selector) {
            dom = dom || [];
            dom.__proto__ = $.fn;
            dom.selector = selector || "";
            return dom;
        };
        // `$.zepto.isZ` should return `true` if the given object is a Zepto
        // collection. This method can be overriden in plugins.
        zepto.isZ = function(object) {
            return object instanceof zepto.Z;
        };
        // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
        // takes a CSS selector and an optional context (and handles various
        // special cases).
        // This method can be overriden in plugins.
        zepto.init = function(selector, context) {
            var dom;
            // If nothing given, return an empty Zepto collection
            if (!selector) return zepto.Z(); else if (typeof selector == "string") {
                selector = selector.trim();
                // If it's a html fragment, create nodes from it
                // Note: In both Chrome 21 and Firefox 15, DOM error 12
                // is thrown if the fragment doesn't begin with <
                if (selector[0] == "<" && fragmentRE.test(selector)) dom = zepto.fragment(selector, RegExp.$1, context), 
                selector = null; else if (context !== undefined) return $(context).find(selector); else dom = zepto.qsa(document, selector);
            } else if (isFunction(selector)) return $(document).ready(selector); else if (zepto.isZ(selector)) return selector; else {
                // normalize array if an array of nodes is given
                if (isArray(selector)) dom = compact(selector); else if (isObject(selector)) dom = [ selector ], 
                selector = null; else if (fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), 
                selector = null; else if (context !== undefined) return $(context).find(selector); else dom = zepto.qsa(document, selector);
            }
            // create a new Zepto collection from the nodes found
            return zepto.Z(dom, selector);
        };
        // `$` will be the base `Zepto` object. When calling this
        // function just call `$.zepto.init, which makes the implementation
        // details of selecting nodes and creating Zepto collections
        // patchable in plugins.
        $ = function(selector, context) {
            return zepto.init(selector, context);
        };
        function extend(target, source, deep) {
            for (key in source) if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
                if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
                extend(target[key], source[key], deep);
            } else if (source[key] !== undefined) target[key] = source[key];
        }
        // Copy all but undefined properties from one or more
        // objects to the `target` object.
        $.extend = function(target) {
            var deep, args = slice.call(arguments, 1);
            if (typeof target == "boolean") {
                deep = target;
                target = args.shift();
            }
            args.forEach(function(arg) {
                extend(target, arg, deep);
            });
            return target;
        };
        // `$.zepto.qsa` is Zepto's CSS selector implementation which
        // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
        // This method can be overriden in plugins.
        zepto.qsa = function(element, selector) {
            var found, maybeID = selector[0] == "#", maybeClass = !maybeID && selector[0] == ".", nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
            isSimple = simpleSelectorRE.test(nameOnly);
            return isDocument(element) && isSimple && maybeID ? (found = element.getElementById(nameOnly)) ? [ found ] : [] : element.nodeType !== 1 && element.nodeType !== 9 ? [] : slice.call(isSimple && !maybeID ? maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
            element.getElementsByTagName(selector) : // Or a tag
            element.querySelectorAll(selector));
        };
        function filtered(nodes, selector) {
            return selector == null ? $(nodes) : $(nodes).filter(selector);
        }
        $.contains = document.documentElement.contains ? function(parent, node) {
            return parent !== node && parent.contains(node);
        } : function(parent, node) {
            while (node && (node = node.parentNode)) if (node === parent) return true;
            return false;
        };
        function funcArg(context, arg, idx, payload) {
            return isFunction(arg) ? arg.call(context, idx, payload) : arg;
        }
        function setAttribute(node, name, value) {
            value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
        }
        // access className property while respecting SVGAnimatedString
        function className(node, value) {
            var klass = node.className || "", svg = klass && klass.baseVal !== undefined;
            if (value === undefined) return svg ? klass.baseVal : klass;
            svg ? klass.baseVal = value : node.className = value;
        }
        // "true"  => true
        // "false" => false
        // "null"  => null
        // "42"    => 42
        // "42.5"  => 42.5
        // "08"    => "08"
        // JSON    => parse if valid
        // String  => self
        function deserializeValue(value) {
            try {
                return value ? value == "true" || (value == "false" ? false : value == "null" ? null : +value + "" == value ? +value : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
            } catch (e) {
                return value;
            }
        }
        $.type = type;
        $.isFunction = isFunction;
        $.isWindow = isWindow;
        $.isArray = isArray;
        $.isPlainObject = isPlainObject;
        $.isEmptyObject = function(obj) {
            var name;
            for (name in obj) return false;
            return true;
        };
        $.inArray = function(elem, array, i) {
            return emptyArray.indexOf.call(array, elem, i);
        };
        $.camelCase = camelize;
        $.trim = function(str) {
            return str == null ? "" : String.prototype.trim.call(str);
        };
        // plugin compatibility
        $.uuid = 0;
        $.support = {};
        $.expr = {};
        $.map = function(elements, callback) {
            var value, values = [], i, key;
            if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
                value = callback(elements[i], i);
                if (value != null) values.push(value);
            } else for (key in elements) {
                value = callback(elements[key], key);
                if (value != null) values.push(value);
            }
            return flatten(values);
        };
        $.each = function(elements, callback) {
            var i, key;
            if (likeArray(elements)) {
                for (i = 0; i < elements.length; i++) if (callback.call(elements[i], i, elements[i]) === false) return elements;
            } else {
                for (key in elements) if (callback.call(elements[key], key, elements[key]) === false) return elements;
            }
            return elements;
        };
        $.grep = function(elements, callback) {
            return filter.call(elements, callback);
        };
        if (window.JSON) $.parseJSON = JSON.parse;
        // Populate the class2type map
        $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
        // Define methods that will be available on all
        // Zepto collections
        $.fn = {
            // Because a collection acts like an array
            // copy over these useful array functions.
            forEach: emptyArray.forEach,
            reduce: emptyArray.reduce,
            push: emptyArray.push,
            sort: emptyArray.sort,
            indexOf: emptyArray.indexOf,
            concat: emptyArray.concat,
            // `map` and `slice` in the jQuery API work differently
            // from their array counterparts
            map: function(fn) {
                return $($.map(this, function(el, i) {
                    return fn.call(el, i, el);
                }));
            },
            slice: function() {
                return $(slice.apply(this, arguments));
            },
            ready: function(callback) {
                // need to check if document.body exists for IE as that browser reports
                // document ready when it hasn't yet created the body element
                if (readyRE.test(document.readyState) && document.body) callback($); else document.addEventListener("DOMContentLoaded", function() {
                    callback($);
                }, false);
                return this;
            },
            get: function(idx) {
                return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
            },
            toArray: function() {
                return this.get();
            },
            size: function() {
                return this.length;
            },
            remove: function() {
                return this.each(function() {
                    if (this.parentNode != null) this.parentNode.removeChild(this);
                });
            },
            each: function(callback) {
                emptyArray.every.call(this, function(el, idx) {
                    return callback.call(el, idx, el) !== false;
                });
                return this;
            },
            filter: function(selector) {
                if (isFunction(selector)) return this.not(this.not(selector));
                return $(filter.call(this, function(element) {
                    return zepto.matches(element, selector);
                }));
            },
            add: function(selector, context) {
                return $(uniq(this.concat($(selector, context))));
            },
            is: function(selector) {
                return this.length > 0 && zepto.matches(this[0], selector);
            },
            not: function(selector) {
                var nodes = [];
                if (isFunction(selector) && selector.call !== undefined) this.each(function(idx) {
                    if (!selector.call(this, idx)) nodes.push(this);
                }); else {
                    var excludes = typeof selector == "string" ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? slice.call(selector) : $(selector);
                    this.forEach(function(el) {
                        if (excludes.indexOf(el) < 0) nodes.push(el);
                    });
                }
                return $(nodes);
            },
            has: function(selector) {
                return this.filter(function() {
                    return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
                });
            },
            eq: function(idx) {
                return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
            },
            first: function() {
                var el = this[0];
                return el && !isObject(el) ? el : $(el);
            },
            last: function() {
                var el = this[this.length - 1];
                return el && !isObject(el) ? el : $(el);
            },
            find: function(selector) {
                var result, $this = this;
                if (!selector) result = $(); else if (typeof selector == "object") result = $(selector).filter(function() {
                    var node = this;
                    return emptyArray.some.call($this, function(parent) {
                        return $.contains(parent, node);
                    });
                }); else if (this.length == 1) result = $(zepto.qsa(this[0], selector)); else result = this.map(function() {
                    return zepto.qsa(this, selector);
                });
                return result;
            },
            closest: function(selector, context) {
                var node = this[0], collection = false;
                if (typeof selector == "object") collection = $(selector);
                while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) node = node !== context && !isDocument(node) && node.parentNode;
                return $(node);
            },
            parents: function(selector) {
                var ancestors = [], nodes = this;
                while (nodes.length > 0) nodes = $.map(nodes, function(node) {
                    if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
                        ancestors.push(node);
                        return node;
                    }
                });
                return filtered(ancestors, selector);
            },
            parent: function(selector) {
                return filtered(uniq(this.pluck("parentNode")), selector);
            },
            children: function(selector) {
                return filtered(this.map(function() {
                    return children(this);
                }), selector);
            },
            contents: function() {
                return this.map(function() {
                    return slice.call(this.childNodes);
                });
            },
            siblings: function(selector) {
                return filtered(this.map(function(i, el) {
                    return filter.call(children(el.parentNode), function(child) {
                        return child !== el;
                    });
                }), selector);
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = "";
                });
            },
            // `pluck` is borrowed from Prototype.js
            pluck: function(property) {
                return $.map(this, function(el) {
                    return el[property];
                });
            },
            show: function() {
                return this.each(function() {
                    this.style.display == "none" && (this.style.display = "");
                    if (getComputedStyle(this, "").getPropertyValue("display") == "none") this.style.display = defaultDisplay(this.nodeName);
                });
            },
            replaceWith: function(newContent) {
                return this.before(newContent).remove();
            },
            wrap: function(structure) {
                var func = isFunction(structure);
                if (this[0] && !func) var dom = $(structure).get(0), clone = dom.parentNode || this.length > 1;
                return this.each(function(index) {
                    $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom);
                });
            },
            wrapAll: function(structure) {
                if (this[0]) {
                    $(this[0]).before(structure = $(structure));
                    var children;
                    // drill down to the inmost element
                    while ((children = structure.children()).length) structure = children.first();
                    $(structure).append(this);
                }
                return this;
            },
            wrapInner: function(structure) {
                var func = isFunction(structure);
                return this.each(function(index) {
                    var self = $(this), contents = self.contents(), dom = func ? structure.call(this, index) : structure;
                    contents.length ? contents.wrapAll(dom) : self.append(dom);
                });
            },
            unwrap: function() {
                this.parent().each(function() {
                    $(this).replaceWith($(this).children());
                });
                return this;
            },
            clone: function() {
                return this.map(function() {
                    return this.cloneNode(true);
                });
            },
            hide: function() {
                return this.css("display", "none");
            },
            toggle: function(setting) {
                return this.each(function() {
                    var el = $(this);
                    (setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide();
                });
            },
            prev: function(selector) {
                return $(this.pluck("previousElementSibling")).filter(selector || "*");
            },
            next: function(selector) {
                return $(this.pluck("nextElementSibling")).filter(selector || "*");
            },
            html: function(html) {
                return 0 in arguments ? this.each(function(idx) {
                    var originHtml = this.innerHTML;
                    $(this).empty().append(funcArg(this, html, idx, originHtml));
                }) : 0 in this ? this[0].innerHTML : null;
            },
            text: function(text) {
                return 0 in arguments ? this.each(function(idx) {
                    var newText = funcArg(this, text, idx, this.textContent);
                    this.textContent = newText == null ? "" : "" + newText;
                }) : 0 in this ? this[0].textContent : null;
            },
            attr: function(name, value) {
                var result;
                return typeof name == "string" && !(1 in arguments) ? !this.length || this[0].nodeType !== 1 ? undefined : !(result = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : result : this.each(function(idx) {
                    if (this.nodeType !== 1) return;
                    if (isObject(name)) for (key in name) setAttribute(this, key, name[key]); else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
                });
            },
            removeAttr: function(name) {
                return this.each(function() {
                    this.nodeType === 1 && name.split(" ").forEach(function(attribute) {
                        setAttribute(this, attribute);
                    }, this);
                });
            },
            prop: function(name, value) {
                name = propMap[name] || name;
                return 1 in arguments ? this.each(function(idx) {
                    this[name] = funcArg(this, value, idx, this[name]);
                }) : this[0] && this[0][name];
            },
            data: function(name, value) {
                var attrName = "data-" + name.replace(capitalRE, "-$1").toLowerCase();
                var data = 1 in arguments ? this.attr(attrName, value) : this.attr(attrName);
                return data !== null ? deserializeValue(data) : undefined;
            },
            val: function(value) {
                return 0 in arguments ? this.each(function(idx) {
                    this.value = funcArg(this, value, idx, this.value);
                }) : this[0] && (this[0].multiple ? $(this[0]).find("option").filter(function() {
                    return this.selected;
                }).pluck("value") : this[0].value);
            },
            offset: function(coordinates) {
                if (coordinates) return this.each(function(index) {
                    var $this = $(this), coords = funcArg(this, coordinates, index, $this.offset()), parentOffset = $this.offsetParent().offset(), props = {
                        top: coords.top - parentOffset.top,
                        left: coords.left - parentOffset.left
                    };
                    if ($this.css("position") == "biz") props["position"] = "relative";
                    $this.css(props);
                });
                if (!this.length) return null;
                var obj = this[0].getBoundingClientRect();
                return {
                    left: obj.left + window.pageXOffset,
                    top: obj.top + window.pageYOffset,
                    width: Math.round(obj.width),
                    height: Math.round(obj.height)
                };
            },
            css: function(property, value) {
                if (arguments.length < 2) {
                    var computedStyle, element = this[0];
                    if (!element) return;
                    computedStyle = getComputedStyle(element, "");
                    if (typeof property == "string") return element.style[camelize(property)] || computedStyle.getPropertyValue(property); else if (isArray(property)) {
                        var props = {};
                        $.each(property, function(_, prop) {
                            props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
                        });
                        return props;
                    }
                }
                var css = "";
                if (type(property) == "string") {
                    if (!value && value !== 0) this.each(function() {
                        this.style.removeProperty(dasherize(property));
                    }); else css = dasherize(property) + ":" + maybeAddPx(property, value);
                } else {
                    for (key in property) if (!property[key] && property[key] !== 0) this.each(function() {
                        this.style.removeProperty(dasherize(key));
                    }); else css += dasherize(key) + ":" + maybeAddPx(key, property[key]) + ";";
                }
                return this.each(function() {
                    this.style.cssText += ";" + css;
                });
            },
            index: function(element) {
                return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
            },
            hasClass: function(name) {
                if (!name) return false;
                return emptyArray.some.call(this, function(el) {
                    return this.test(className(el));
                }, classRE(name));
            },
            addClass: function(name) {
                if (!name) return this;
                return this.each(function(idx) {
                    if (!("className" in this)) return;
                    classList = [];
                    var cls = className(this), newName = funcArg(this, name, idx, cls);
                    newName.split(/\s+/g).forEach(function(klass) {
                        if (!$(this).hasClass(klass)) classList.push(klass);
                    }, this);
                    classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
                });
            },
            removeClass: function(name) {
                return this.each(function(idx) {
                    if (!("className" in this)) return;
                    if (name === undefined) return className(this, "");
                    classList = className(this);
                    funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass) {
                        classList = classList.replace(classRE(klass), " ");
                    });
                    className(this, classList.trim());
                });
            },
            toggleClass: function(name, when) {
                if (!name) return this;
                return this.each(function(idx) {
                    var $this = $(this), names = funcArg(this, name, idx, className(this));
                    names.split(/\s+/g).forEach(function(klass) {
                        (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass);
                    });
                });
            },
            scrollTop: function(value) {
                if (!this.length) return;
                var hasScrollTop = "scrollTop" in this[0];
                if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
                return this.each(hasScrollTop ? function() {
                    this.scrollTop = value;
                } : function() {
                    this.scrollTo(this.scrollX, value);
                });
            },
            scrollLeft: function(value) {
                if (!this.length) return;
                var hasScrollLeft = "scrollLeft" in this[0];
                if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
                return this.each(hasScrollLeft ? function() {
                    this.scrollLeft = value;
                } : function() {
                    this.scrollTo(value, this.scrollY);
                });
            },
            position: function() {
                if (!this.length) return;
                var elem = this[0], // Get *real* offsetParent
                offsetParent = this.offsetParent(), // Get correct offsets
                offset = this.offset(), parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : offsetParent.offset();
                // Subtract element margins
                // note: when an element has margin: auto the offsetLeft and marginLeft
                // are the same in Safari causing offset.left to incorrectly be 0
                offset.top -= parseFloat($(elem).css("margin-top")) || 0;
                offset.left -= parseFloat($(elem).css("margin-left")) || 0;
                // Add offsetParent borders
                parentOffset.top += parseFloat($(offsetParent[0]).css("border-top-width")) || 0;
                parentOffset.left += parseFloat($(offsetParent[0]).css("border-left-width")) || 0;
                // Subtract the two offsets
                return {
                    top: offset.top - parentOffset.top,
                    left: offset.left - parentOffset.left
                };
            },
            offsetParent: function() {
                return this.map(function() {
                    var parent = this.offsetParent || document.body;
                    while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "biz") parent = parent.offsetParent;
                    return parent;
                });
            }
        };
        // for now
        $.fn.detach = $.fn.remove;
        [ "width", "height" ].forEach(function(dimension) {
            var dimensionProperty = dimension.replace(/./, function(m) {
                return m[0].toUpperCase();
            });
            $.fn[dimension] = function(value) {
                var offset, el = this[0];
                if (value === undefined) return isWindow(el) ? el["inner" + dimensionProperty] : isDocument(el) ? el.documentElement["scroll" + dimensionProperty] : (offset = this.offset()) && offset[dimension]; else return this.each(function(idx) {
                    el = $(this);
                    el.css(dimension, funcArg(this, value, idx, el[dimension]()));
                });
            };
        });
        function traverseNode(node, fun) {
            fun(node);
            for (var i = 0, len = node.childNodes.length; i < len; i++) traverseNode(node.childNodes[i], fun);
        }
        // Generate the `after`, `prepend`, `before`, `append`,
        // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
        adjacencyOperators.forEach(function(operator, operatorIndex) {
            var inside = operatorIndex % 2;
            //=> prepend, append
            $.fn[operator] = function() {
                // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
                var argType, nodes = $.map(arguments, function(arg) {
                    argType = type(arg);
                    return argType == "object" || argType == "array" || arg == null ? arg : zepto.fragment(arg);
                }), parent, copyByClone = this.length > 1;
                if (nodes.length < 1) return this;
                return this.each(function(_, target) {
                    parent = inside ? target : target.parentNode;
                    // convert all methods to a "before" operation
                    target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;
                    var parentInDocument = $.contains(document.documentElement, parent);
                    nodes.forEach(function(node) {
                        if (copyByClone) node = node.cloneNode(true); else if (!parent) return $(node).remove();
                        parent.insertBefore(node, target);
                        if (parentInDocument) traverseNode(node, function(el) {
                            if (el.nodeName != null && el.nodeName.toUpperCase() === "SCRIPT" && (!el.type || el.type === "text/javascript") && !el.src) window["eval"].call(window, el.innerHTML);
                        });
                    });
                });
            };
            // after    => insertAfter
            // prepend  => prependTo
            // before   => insertBefore
            // append   => appendTo
            $.fn[inside ? operator + "To" : "insert" + (operatorIndex ? "Before" : "After")] = function(html) {
                $(html)[operator](this);
                return this;
            };
        });
        zepto.Z.prototype = $.fn;
        // Export internal API functions in the `$.zepto` namespace
        zepto.uniq = uniq;
        zepto.deserializeValue = deserializeValue;
        $.zepto = zepto;
        return $;
    }();
    window.Zepto = Zepto;
    window.$ === undefined && (window.$ = Zepto);
    (function($) {
        var _zid = 1, undefined, slice = Array.prototype.slice, isFunction = $.isFunction, isString = function(obj) {
            return typeof obj == "string";
        }, handlers = {}, specialEvents = {}, focusinSupported = "onfocusin" in window, focus = {
            focus: "focusin",
            blur: "focusout"
        }, hover = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = "MouseEvents";
        function zid(element) {
            return element._zid || (element._zid = _zid++);
        }
        function findHandlers(element, event, fn, selector) {
            event = parse(event);
            if (event.ns) var matcher = matcherFor(event.ns);
            return (handlers[zid(element)] || []).filter(function(handler) {
                return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
            });
        }
        function parse(event) {
            var parts = ("" + event).split(".");
            return {
                e: parts[0],
                ns: parts.slice(1).sort().join(" ")
            };
        }
        function matcherFor(ns) {
            return new RegExp("(?:^| )" + ns.replace(" ", " .* ?") + "(?: |$)");
        }
        function eventCapture(handler, captureSetting) {
            return handler.del && !focusinSupported && handler.e in focus || !!captureSetting;
        }
        function realEvent(type) {
            return hover[type] || focusinSupported && focus[type] || type;
        }
        function add(element, events, fn, data, selector, delegator, capture) {
            var id = zid(element), set = handlers[id] || (handlers[id] = []);
            events.split(/\s/).forEach(function(event) {
                if (event == "ready") return $(document).ready(fn);
                var handler = parse(event);
                handler.fn = fn;
                handler.sel = selector;
                // emulate mouseenter, mouseleave
                if (handler.e in hover) fn = function(e) {
                    var related = e.relatedTarget;
                    if (!related || related !== this && !$.contains(this, related)) return handler.fn.apply(this, arguments);
                };
                handler.del = delegator;
                var callback = delegator || fn;
                handler.proxy = function(e) {
                    e = compatible(e);
                    if (e.isImmediatePropagationStopped()) return;
                    e.data = data;
                    var result = callback.apply(element, e._args == undefined ? [ e ] : [ e ].concat(e._args));
                    if (result === false) e.preventDefault(), e.stopPropagation();
                    return result;
                };
                handler.i = set.length;
                set.push(handler);
                if ("addEventListener" in element) element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
            });
        }
        function remove(element, events, fn, selector, capture) {
            var id = zid(element);
            (events || "").split(/\s/).forEach(function(event) {
                findHandlers(element, event, fn, selector).forEach(function(handler) {
                    delete handlers[id][handler.i];
                    if ("removeEventListener" in element) element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
                });
            });
        }
        $.event = {
            add: add,
            remove: remove
        };
        $.proxy = function(fn, context) {
            var args = 2 in arguments && slice.call(arguments, 2);
            if (isFunction(fn)) {
                var proxyFn = function() {
                    return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments);
                };
                proxyFn._zid = zid(fn);
                return proxyFn;
            } else if (isString(context)) {
                if (args) {
                    args.unshift(fn[context], fn);
                    return $.proxy.apply(null, args);
                } else {
                    return $.proxy(fn[context], fn);
                }
            } else {
                throw new TypeError("expected function");
            }
        };
        $.fn.bind = function(event, data, callback) {
            return this.on(event, data, callback);
        };
        $.fn.unbind = function(event, callback) {
            return this.off(event, callback);
        };
        $.fn.one = function(event, selector, data, callback) {
            return this.on(event, selector, data, callback, 1);
        };
        var returnTrue = function() {
            return true;
        }, returnFalse = function() {
            return false;
        }, ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/, eventMethods = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        function compatible(event, source) {
            if (source || !event.isDefaultPrevented) {
                source || (source = event);
                $.each(eventMethods, function(name, predicate) {
                    var sourceMethod = source[name];
                    event[name] = function() {
                        this[predicate] = returnTrue;
                        return sourceMethod && sourceMethod.apply(source, arguments);
                    };
                    event[predicate] = returnFalse;
                });
                if (source.defaultPrevented !== undefined ? source.defaultPrevented : "returnValue" in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue;
            }
            return event;
        }
        function createProxy(event) {
            var key, proxy = {
                originalEvent: event
            };
            for (key in event) if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];
            return compatible(proxy, event);
        }
        $.fn.delegate = function(selector, event, callback) {
            return this.on(event, selector, callback);
        };
        $.fn.undelegate = function(selector, event, callback) {
            return this.off(event, selector, callback);
        };
        $.fn.live = function(event, callback) {
            $(document.body).delegate(this.selector, event, callback);
            return this;
        };
        $.fn.die = function(event, callback) {
            $(document.body).undelegate(this.selector, event, callback);
            return this;
        };
        $.fn.on = function(event, selector, data, callback, one) {
            var autoRemove, delegator, $this = this;
            if (event && !isString(event)) {
                $.each(event, function(type, fn) {
                    $this.on(type, selector, data, fn, one);
                });
                return $this;
            }
            if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, 
            data = selector, selector = undefined;
            if (isFunction(data) || data === false) callback = data, data = undefined;
            if (callback === false) callback = returnFalse;
            return $this.each(function(_, element) {
                if (one) autoRemove = function(e) {
                    remove(element, e.type, callback);
                    return callback.apply(this, arguments);
                };
                if (selector) delegator = function(e) {
                    var evt, match = $(e.target).closest(selector, element).get(0);
                    if (match && match !== element) {
                        evt = $.extend(createProxy(e), {
                            currentTarget: match,
                            liveFired: element
                        });
                        return (autoRemove || callback).apply(match, [ evt ].concat(slice.call(arguments, 1)));
                    }
                };
                add(element, event, callback, data, selector, delegator || autoRemove);
            });
        };
        $.fn.off = function(event, selector, callback) {
            var $this = this;
            if (event && !isString(event)) {
                $.each(event, function(type, fn) {
                    $this.off(type, selector, fn);
                });
                return $this;
            }
            if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, 
            selector = undefined;
            if (callback === false) callback = returnFalse;
            return $this.each(function() {
                remove(this, event, callback, selector);
            });
        };
        $.fn.trigger = function(event, args) {
            event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event);
            event._args = args;
            return this.each(function() {
                // handle focus(), blur() by calling them directly
                if (event.type in focus && typeof this[event.type] == "function") this[event.type](); else if ("dispatchEvent" in this) this.dispatchEvent(event); else $(this).triggerHandler(event, args);
            });
        };
        // triggers event handlers on current element just as if an event occurred,
        // doesn't trigger an actual event, doesn't bubble
        $.fn.triggerHandler = function(event, args) {
            var e, result;
            this.each(function(i, element) {
                e = createProxy(isString(event) ? $.Event(event) : event);
                e._args = args;
                e.target = element;
                $.each(findHandlers(element, event.type || event), function(i, handler) {
                    result = handler.proxy(e);
                    if (e.isImmediatePropagationStopped()) return false;
                });
            });
            return result;
        };
        ("focusin focusout focus blur load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select keydown keypress keyup error").split(" ").forEach(function(event) {
            $.fn[event] = function(callback) {
                return 0 in arguments ? this.bind(event, callback) : this.trigger(event);
            };
        });
        $.Event = function(type, props) {
            if (!isString(type)) props = type, type = props.type;
            var event = document.createEvent(specialEvents[type] || "Events"), bubbles = true;
            if (props) for (var name in props) name == "bubbles" ? bubbles = !!props[name] : event[name] = props[name];
            event.initEvent(type, bubbles, true);
            return compatible(event);
        };
    })(Zepto);
    (function($) {
        var jsonpID = 0, document = window.document, key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, scriptTypeRE = /^(?:text|application)\/javascript/i, xmlTypeRE = /^(?:text|application)\/xml/i, jsonType = "application/json", htmlType = "text/html", blankRE = /^\s*$/, originAnchor = document.createElement("a");
        originAnchor.href = window.location.href;
        // trigger a custom event and return false if it was cancelled
        function triggerAndReturn(context, eventName, data) {
            var event = $.Event(eventName);
            $(context).trigger(event, data);
            return !event.isDefaultPrevented();
        }
        // trigger an Ajax "global" event
        function triggerGlobal(settings, context, eventName, data) {
            if (settings.global) return triggerAndReturn(context || document, eventName, data);
        }
        // Number of active Ajax requests
        $.active = 0;
        function ajaxStart(settings) {
            if (settings.global && $.active++ === 0) triggerGlobal(settings, null, "ajaxStart");
        }
        function ajaxStop(settings) {
            if (settings.global && !--$.active) triggerGlobal(settings, null, "ajaxStop");
        }
        // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
        function ajaxBeforeSend(xhr, settings) {
            var context = settings.context;
            if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, "ajaxBeforeSend", [ xhr, settings ]) === false) return false;
            triggerGlobal(settings, context, "ajaxSend", [ xhr, settings ]);
        }
        function ajaxSuccess(data, xhr, settings, deferred) {
            var context = settings.context, status = "success";
            settings.success.call(context, data, status, xhr);
            if (deferred) deferred.resolveWith(context, [ data, status, xhr ]);
            triggerGlobal(settings, context, "ajaxSuccess", [ xhr, settings, data ]);
            ajaxComplete(status, xhr, settings);
        }
        // type: "timeout", "error", "abort", "parsererror"
        function ajaxError(error, type, xhr, settings, deferred) {
            var context = settings.context;
            settings.error.call(context, xhr, type, error);
            if (deferred) deferred.rejectWith(context, [ xhr, type, error ]);
            triggerGlobal(settings, context, "ajaxError", [ xhr, settings, error || type ]);
            ajaxComplete(type, xhr, settings);
        }
        // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
        function ajaxComplete(status, xhr, settings) {
            var context = settings.context;
            settings.complete.call(context, xhr, status);
            triggerGlobal(settings, context, "ajaxComplete", [ xhr, settings ]);
            ajaxStop(settings);
        }
        // Empty function, used as default callback
        function empty() {}
        $.ajaxJSONP = function(options, deferred) {
            if (!("type" in options)) return $.ajax(options);
            var _callbackName = options.jsonpCallback, callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || "jsonp" + ++jsonpID, script = document.createElement("script"), originalCallback = window[callbackName], responseData, abort = function(errorType) {
                $(script).triggerHandler("error", errorType || "abort");
            }, xhr = {
                abort: abort
            }, abortTimeout;
            if (deferred) deferred.promise(xhr);
            $(script).on("load error", function(e, errorType) {
                clearTimeout(abortTimeout);
                $(script).off().remove();
                if (e.type == "error" || !responseData) {
                    ajaxError(null, errorType || "error", xhr, options, deferred);
                } else {
                    ajaxSuccess(responseData[0], xhr, options, deferred);
                }
                window[callbackName] = originalCallback;
                if (responseData && $.isFunction(originalCallback)) originalCallback(responseData[0]);
                originalCallback = responseData = undefined;
            });
            if (ajaxBeforeSend(xhr, options) === false) {
                abort("abort");
                return xhr;
            }
            window[callbackName] = function() {
                responseData = arguments;
            };
            script.src = options.url.replace(/\?(.+)=\?/, "?$1=" + callbackName);
            document.head.appendChild(script);
            if (options.timeout > 0) abortTimeout = setTimeout(function() {
                abort("timeout");
            }, options.timeout);
            return xhr;
        };
        $.ajaxSettings = {
            // Default type of request
            type: "GET",
            // Callback that is executed before request
            beforeSend: empty,
            // Callback that is executed if the request succeeds
            success: empty,
            // Callback that is executed the the server drops error
            error: empty,
            // Callback that is executed on request complete (both: error and success)
            complete: empty,
            // The context for the callbacks
            context: null,
            // Whether to trigger "global" Ajax events
            global: true,
            // Transport
            xhr: function() {
                return new window.XMLHttpRequest();
            },
            // MIME types mapping
            // IIS returns Javascript as "application/x-javascript"
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: jsonType,
                xml: "application/xml, text/xml",
                html: htmlType,
                text: "text/plain"
            },
            // Whether the request is to another domain
            crossDomain: false,
            // Default timeout
            timeout: 0,
            // Whether data should be serialized to string
            processData: true,
            // Whether the browser should be allowed to cache GET responses
            cache: true
        };
        function mimeToDataType(mime) {
            if (mime) mime = mime.split(";", 2)[0];
            return mime && (mime == htmlType ? "html" : mime == jsonType ? "json" : scriptTypeRE.test(mime) ? "script" : xmlTypeRE.test(mime) && "xml") || "text";
        }
        function appendQuery(url, query) {
            if (query == "") return url;
            return (url + "&" + query).replace(/[&?]{1,2}/, "?");
        }
        // serialize payload and append it to the URL for GET requests
        function serializeData(options) {
            if (options.processData && options.data && $.type(options.data) != "string") options.data = $.param(options.data, options.traditional);
            if (options.data && (!options.type || options.type.toUpperCase() == "GET")) options.url = appendQuery(options.url, options.data), 
            options.data = undefined;
        }
        $.ajax = function(options) {
            var settings = $.extend({}, options || {}), deferred = $.Deferred && $.Deferred(), urlAnchor;
            for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
            ajaxStart(settings);
            if (!settings.crossDomain) {
                urlAnchor = document.createElement("a");
                urlAnchor.href = settings.url;
                urlAnchor.href = urlAnchor.href;
                settings.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
            }
            if (!settings.url) settings.url = window.location.toString();
            serializeData(settings);
            var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url);
            if (hasPlaceholder) dataType = "jsonp";
            if (settings.cache === false || (!options || options.cache !== true) && ("script" == dataType || "jsonp" == dataType)) settings.url = appendQuery(settings.url, "_=" + Date.now());
            if ("jsonp" == dataType) {
                if (!hasPlaceholder) settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === false ? "" : "callback=?");
                return $.ajaxJSONP(settings, deferred);
            }
            var mime = settings.accepts[dataType], headers = {}, setHeader = function(name, value) {
                headers[name.toLowerCase()] = [ name, value ];
            }, protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol, xhr = settings.xhr(), nativeSetHeader = xhr.setRequestHeader, abortTimeout;
            if (deferred) deferred.promise(xhr);
            if (!settings.crossDomain) setHeader("X-Requested-With", "XMLHttpRequest");
            setHeader("Accept", mime || "*/*");
            if (mime = settings.mimeType || mime) {
                if (mime.indexOf(",") > -1) mime = mime.split(",", 2)[0];
                xhr.overrideMimeType && xhr.overrideMimeType(mime);
            }
            if (settings.contentType || settings.contentType !== false && settings.data && settings.type.toUpperCase() != "GET") setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded");
            if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]);
            xhr.setRequestHeader = setHeader;
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    xhr.onreadystatechange = empty;
                    clearTimeout(abortTimeout);
                    var result, error = false;
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
                        dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type"));
                        result = xhr.responseText;
                        try {
                            // http://perfectionkills.com/global-eval-what-are-the-options/
                            if (dataType == "script") (1, eval)(result); else if (dataType == "xml") result = xhr.responseXML; else if (dataType == "json") result = blankRE.test(result) ? null : $.parseJSON(result);
                        } catch (e) {
                            error = e;
                        }
                        if (error) ajaxError(error, "parsererror", xhr, settings, deferred); else ajaxSuccess(result, xhr, settings, deferred);
                    } else {
                        ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred);
                    }
                }
            };
            if (ajaxBeforeSend(xhr, settings) === false) {
                xhr.abort();
                ajaxError(null, "abort", xhr, settings, deferred);
                return xhr;
            }
            if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name];
            var async = "async" in settings ? settings.async : true;
            xhr.open(settings.type, settings.url, async, settings.username, settings.password);
            for (name in headers) nativeSetHeader.apply(xhr, headers[name]);
            if (settings.timeout > 0) abortTimeout = setTimeout(function() {
                xhr.onreadystatechange = empty;
                xhr.abort();
                ajaxError(null, "timeout", xhr, settings, deferred);
            }, settings.timeout);
            // avoid sending empty string (#319)
            xhr.send(settings.data ? settings.data : null);
            return xhr;
        };
        // handle optional data/success arguments
        function parseArguments(url, data, success, dataType) {
            if ($.isFunction(data)) dataType = success, success = data, data = undefined;
            if (!$.isFunction(success)) dataType = success, success = undefined;
            return {
                url: url,
                data: data,
                success: success,
                dataType: dataType
            };
        }
        $.get = function() {
            return $.ajax(parseArguments.apply(null, arguments));
        };
        $.post = function() {
            var options = parseArguments.apply(null, arguments);
            options.type = "POST";
            return $.ajax(options);
        };
        $.getJSON = function() {
            var options = parseArguments.apply(null, arguments);
            options.dataType = "json";
            return $.ajax(options);
        };
        $.fn.load = function(url, data, success) {
            if (!this.length) return this;
            var self = this, parts = url.split(/\s/), selector, options = parseArguments(url, data, success), callback = options.success;
            if (parts.length > 1) options.url = parts[0], selector = parts[1];
            options.success = function(response) {
                self.html(selector ? $("<div>").html(response.replace(rscript, "")).find(selector) : response);
                callback && callback.apply(self, arguments);
            };
            $.ajax(options);
            return this;
        };
        var escape = encodeURIComponent;
        function serialize(params, obj, traditional, scope) {
            var type, array = $.isArray(obj), hash = $.isPlainObject(obj);
            $.each(obj, function(key, value) {
                type = $.type(value);
                if (scope) key = traditional ? scope : scope + "[" + (hash || type == "object" || type == "array" ? key : "") + "]";
                // handle data in serializeArray() format
                if (!scope && array) params.add(value.name, value.value); else if (type == "array" || !traditional && type == "object") serialize(params, value, traditional, key); else params.add(key, value);
            });
        }
        $.param = function(obj, traditional) {
            var params = [];
            params.add = function(key, value) {
                if ($.isFunction(value)) value = value();
                if (value == null) value = "";
                this.push(escape(key) + "=" + escape(value));
            };
            serialize(params, obj, traditional);
            return params.join("&").replace(/%20/g, "+");
        };
    })(Zepto);
    (function($) {
        $.fn.serializeArray = function() {
            var name, type, result = [], add = function(value) {
                if (value.forEach) return value.forEach(add);
                result.push({
                    name: name,
                    value: value
                });
            };
            if (this[0]) $.each(this[0].elements, function(_, field) {
                type = field.type, name = field.name;
                if (name && field.nodeName.toLowerCase() != "fieldset" && !field.disabled && type != "submit" && type != "reset" && type != "button" && type != "file" && (type != "radio" && type != "checkbox" || field.checked)) add($(field).val());
            });
            return result;
        };
        $.fn.serialize = function() {
            var result = [];
            this.serializeArray().forEach(function(elm) {
                result.push(encodeURIComponent(elm.name) + "=" + encodeURIComponent(elm.value));
            });
            return result.join("&");
        };
        $.fn.submit = function(callback) {
            if (0 in arguments) this.bind("submit", callback); else if (this.length) {
                var event = $.Event("submit");
                this.eq(0).trigger(event);
                if (!event.isDefaultPrevented()) this.get(0).submit();
            }
            return this;
        };
    })(Zepto);
    (function($) {
        // __proto__ doesn't exist on IE<11, so redefine
        // the Z function to use object extension instead
        if (!("__proto__" in {})) {
            $.extend($.zepto, {
                Z: function(dom, selector) {
                    dom = dom || [];
                    $.extend(dom, $.fn);
                    dom.selector = selector || "";
                    dom.__Z = true;
                    return dom;
                },
                // this is a kludge but works
                isZ: function(object) {
                    return $.type(object) === "array" && "__Z" in object;
                }
            });
        }
        // getComputedStyle shouldn't freak out when called
        // without a valid element as argument
        try {
            getComputedStyle(undefined);
        } catch (e) {
            var nativeGetComputedStyle = getComputedStyle;
            window.getComputedStyle = function(element) {
                try {
                    return nativeGetComputedStyle(element);
                } catch (e) {
                    return null;
                }
            };
        }
    })(Zepto);
    //zepto cmd
    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = Zepto;
    }
});

/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
define("js/cmd/core/hammer/hammer.min", [], function(require, exports, module) {
    !function(a, b, c, d) {
        "use strict";
        function e(a, b, c) {
            return setTimeout(k(a, c), b);
        }
        function f(a, b, c) {
            return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
        }
        function g(a, b, c) {
            var e;
            if (a) if (a.forEach) a.forEach(b, c); else if (a.length !== d) for (e = 0; e < a.length; ) b.call(c, a[e], e, a), 
            e++; else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a);
        }
        function h(a, b, c) {
            for (var e = Object.keys(b), f = 0; f < e.length; ) (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), 
            f++;
            return a;
        }
        function i(a, b) {
            return h(a, b, !0);
        }
        function j(a, b, c) {
            var d, e = b.prototype;
            d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && h(d, c);
        }
        function k(a, b) {
            return function() {
                return a.apply(b, arguments);
            };
        }
        function l(a, b) {
            return typeof a == kb ? a.apply(b ? b[0] || d : d, b) : a;
        }
        function m(a, b) {
            return a === d ? b : a;
        }
        function n(a, b, c) {
            g(r(b), function(b) {
                a.addEventListener(b, c, !1);
            });
        }
        function o(a, b, c) {
            g(r(b), function(b) {
                a.removeEventListener(b, c, !1);
            });
        }
        function p(a, b) {
            for (;a; ) {
                if (a == b) return !0;
                a = a.parentNode;
            }
            return !1;
        }
        function q(a, b) {
            return a.indexOf(b) > -1;
        }
        function r(a) {
            return a.trim().split(/\s+/g);
        }
        function s(a, b, c) {
            if (a.indexOf && !c) return a.indexOf(b);
            for (var d = 0; d < a.length; ) {
                if (c && a[d][c] == b || !c && a[d] === b) return d;
                d++;
            }
            return -1;
        }
        function t(a) {
            return Array.prototype.slice.call(a, 0);
        }
        function u(a, b, c) {
            for (var d = [], e = [], f = 0; f < a.length; ) {
                var g = b ? a[f][b] : a[f];
                s(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
            }
            return c && (d = b ? d.sort(function(a, c) {
                return a[b] > c[b];
            }) : d.sort()), d;
        }
        function v(a, b) {
            for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ib.length; ) {
                if (c = ib[g], e = c ? c + f : b, e in a) return e;
                g++;
            }
            return d;
        }
        function w() {
            return ob++;
        }
        function x(a) {
            var b = a.ownerDocument;
            return b.defaultView || b.parentWindow;
        }
        function y(a, b) {
            var c = this;
            this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, 
            this.domHandler = function(b) {
                l(a.options.enable, [ a ]) && c.handler(b);
            }, this.init();
        }
        function z(a) {
            var b, c = a.options.inputClass;
            return new (b = c ? c : rb ? N : sb ? Q : qb ? S : M)(a, A);
        }
        function A(a, b, c) {
            var d = c.pointers.length, e = c.changedPointers.length, f = b & yb && d - e === 0, g = b & (Ab | Bb) && d - e === 0;
            c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, B(a, c), 
            a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
        }
        function B(a, b) {
            var c = a.session, d = b.pointers, e = d.length;
            c.firstInput || (c.firstInput = E(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = E(b) : 1 === e && (c.firstMultiple = !1);
            var f = c.firstInput, g = c.firstMultiple, h = g ? g.center : f.center, i = b.center = F(d);
            b.timeStamp = nb(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = J(h, i), 
            b.distance = I(h, i), C(c, b), b.offsetDirection = H(b.deltaX, b.deltaY), b.scale = g ? L(g.pointers, d) : 1, 
            b.rotation = g ? K(g.pointers, d) : 0, D(c, b);
            var j = a.element;
            p(b.srcEvent.target, j) && (j = b.srcEvent.target), b.target = j;
        }
        function C(a, b) {
            var c = b.center, d = a.offsetDelta || {}, e = a.prevDelta || {}, f = a.prevInput || {};
            (b.eventType === yb || f.eventType === Ab) && (e = a.prevDelta = {
                x: f.deltaX || 0,
                y: f.deltaY || 0
            }, d = a.offsetDelta = {
                x: c.x,
                y: c.y
            }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
        }
        function D(a, b) {
            var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp;
            if (b.eventType != Bb && (i > xb || h.velocity === d)) {
                var j = h.deltaX - b.deltaX, k = h.deltaY - b.deltaY, l = G(i, j, k);
                e = l.x, f = l.y, c = mb(l.x) > mb(l.y) ? l.x : l.y, g = H(j, k), a.lastInterval = b;
            } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
            b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g;
        }
        function E(a) {
            for (var b = [], c = 0; c < a.pointers.length; ) b[c] = {
                clientX: lb(a.pointers[c].clientX),
                clientY: lb(a.pointers[c].clientY)
            }, c++;
            return {
                timeStamp: nb(),
                pointers: b,
                center: F(b),
                deltaX: a.deltaX,
                deltaY: a.deltaY
            };
        }
        function F(a) {
            var b = a.length;
            if (1 === b) return {
                x: lb(a[0].clientX),
                y: lb(a[0].clientY)
            };
            for (var c = 0, d = 0, e = 0; b > e; ) c += a[e].clientX, d += a[e].clientY, e++;
            return {
                x: lb(c / b),
                y: lb(d / b)
            };
        }
        function G(a, b, c) {
            return {
                x: b / a || 0,
                y: c / a || 0
            };
        }
        function H(a, b) {
            return a === b ? Cb : mb(a) >= mb(b) ? a > 0 ? Db : Eb : b > 0 ? Fb : Gb;
        }
        function I(a, b, c) {
            c || (c = Kb);
            var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
            return Math.sqrt(d * d + e * e);
        }
        function J(a, b, c) {
            c || (c = Kb);
            var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
            return 180 * Math.atan2(e, d) / Math.PI;
        }
        function K(a, b) {
            return J(b[1], b[0], Lb) - J(a[1], a[0], Lb);
        }
        function L(a, b) {
            return I(b[0], b[1], Lb) / I(a[0], a[1], Lb);
        }
        function M() {
            this.evEl = Nb, this.evWin = Ob, this.allow = !0, this.pressed = !1, y.apply(this, arguments);
        }
        function N() {
            this.evEl = Rb, this.evWin = Sb, y.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
        }
        function O() {
            this.evTarget = Ub, this.evWin = Vb, this.started = !1, y.apply(this, arguments);
        }
        function P(a, b) {
            var c = t(a.touches), d = t(a.changedTouches);
            return b & (Ab | Bb) && (c = u(c.concat(d), "identifier", !0)), [ c, d ];
        }
        function Q() {
            this.evTarget = Xb, this.targetIds = {}, y.apply(this, arguments);
        }
        function R(a, b) {
            var c = t(a.touches), d = this.targetIds;
            if (b & (yb | zb) && 1 === c.length) return d[c[0].identifier] = !0, [ c, c ];
            var e, f, g = t(a.changedTouches), h = [], i = this.target;
            if (f = c.filter(function(a) {
                return p(a.target, i);
            }), b === yb) for (e = 0; e < f.length; ) d[f[e].identifier] = !0, e++;
            for (e = 0; e < g.length; ) d[g[e].identifier] && h.push(g[e]), b & (Ab | Bb) && delete d[g[e].identifier], 
            e++;
            return h.length ? [ u(f.concat(h), "identifier", !0), h ] : void 0;
        }
        function S() {
            y.apply(this, arguments);
            var a = k(this.handler, this);
            this.touch = new Q(this.manager, a), this.mouse = new M(this.manager, a);
        }
        function T(a, b) {
            this.manager = a, this.set(b);
        }
        function U(a) {
            if (q(a, bc)) return bc;
            var b = q(a, cc), c = q(a, dc);
            return b && c ? cc + " " + dc : b || c ? b ? cc : dc : q(a, ac) ? ac : _b;
        }
        function V(a) {
            this.id = w(), this.manager = null, this.options = i(a || {}, this.defaults), this.options.enable = m(this.options.enable, !0), 
            this.state = ec, this.simultaneous = {}, this.requireFail = [];
        }
        function W(a) {
            return a & jc ? "cancel" : a & hc ? "end" : a & gc ? "move" : a & fc ? "start" : "";
        }
        function X(a) {
            return a == Gb ? "down" : a == Fb ? "up" : a == Db ? "left" : a == Eb ? "right" : "";
        }
        function Y(a, b) {
            var c = b.manager;
            return c ? c.get(a) : a;
        }
        function Z() {
            V.apply(this, arguments);
        }
        function $() {
            Z.apply(this, arguments), this.pX = null, this.pY = null;
        }
        function _() {
            Z.apply(this, arguments);
        }
        function ab() {
            V.apply(this, arguments), this._timer = null, this._input = null;
        }
        function bb() {
            Z.apply(this, arguments);
        }
        function cb() {
            Z.apply(this, arguments);
        }
        function db() {
            V.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, 
            this._input = null, this.count = 0;
        }
        function eb(a, b) {
            return b = b || {}, b.recognizers = m(b.recognizers, eb.defaults.preset), new fb(a, b);
        }
        function fb(a, b) {
            b = b || {}, this.options = i(b, eb.defaults), this.options.inputTarget = this.options.inputTarget || a, 
            this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, 
            this.input = z(this), this.touchAction = new T(this, this.options.touchAction), 
            gb(this, !0), g(b.recognizers, function(a) {
                var b = this.add(new a[0](a[1]));
                a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
            }, this);
        }
        function gb(a, b) {
            var c = a.element;
            g(a.options.cssProps, function(a, d) {
                c.style[v(c.style, d)] = b ? a : "";
            });
        }
        function hb(a, c) {
            var d = b.createEvent("Event");
            d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
        }
        var ib = [ "", "webkit", "moz", "MS", "ms", "o" ], jb = b.createElement("div"), kb = "function", lb = Math.round, mb = Math.abs, nb = Date.now, ob = 1, pb = /mobile|tablet|ip(ad|hone|od)|android/i, qb = "ontouchstart" in a, rb = v(a, "PointerEvent") !== d, sb = qb && pb.test(navigator.userAgent), tb = "touch", ub = "pen", vb = "mouse", wb = "kinect", xb = 25, yb = 1, zb = 2, Ab = 4, Bb = 8, Cb = 1, Db = 2, Eb = 4, Fb = 8, Gb = 16, Hb = Db | Eb, Ib = Fb | Gb, Jb = Hb | Ib, Kb = [ "x", "y" ], Lb = [ "clientX", "clientY" ];
        y.prototype = {
            handler: function() {},
            init: function() {
                this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), 
                this.evWin && n(x(this.element), this.evWin, this.domHandler);
            },
            destroy: function() {
                this.evEl && o(this.element, this.evEl, this.domHandler), this.evTarget && o(this.target, this.evTarget, this.domHandler), 
                this.evWin && o(x(this.element), this.evWin, this.domHandler);
            }
        };
        var Mb = {
            mousedown: yb,
            mousemove: zb,
            mouseup: Ab
        }, Nb = "mousedown", Ob = "mousemove mouseup";
        j(M, y, {
            handler: function(a) {
                var b = Mb[a.type];
                b & yb && 0 === a.button && (this.pressed = !0), b & zb && 1 !== a.which && (b = Ab), 
                this.pressed && this.allow && (b & Ab && (this.pressed = !1), this.callback(this.manager, b, {
                    pointers: [ a ],
                    changedPointers: [ a ],
                    pointerType: vb,
                    srcEvent: a
                }));
            }
        });
        var Pb = {
            pointerdown: yb,
            pointermove: zb,
            pointerup: Ab,
            pointercancel: Bb,
            pointerout: Bb
        }, Qb = {
            2: tb,
            3: ub,
            4: vb,
            5: wb
        }, Rb = "pointerdown", Sb = "pointermove pointerup pointercancel";
        a.MSPointerEvent && (Rb = "MSPointerDown", Sb = "MSPointerMove MSPointerUp MSPointerCancel"), 
        j(N, y, {
            handler: function(a) {
                var b = this.store, c = !1, d = a.type.toLowerCase().replace("ms", ""), e = Pb[d], f = Qb[a.pointerType] || a.pointerType, g = f == tb, h = s(b, a.pointerId, "pointerId");
                e & yb && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ab | Bb) && (c = !0), 
                0 > h || (b[h] = a, this.callback(this.manager, e, {
                    pointers: b,
                    changedPointers: [ a ],
                    pointerType: f,
                    srcEvent: a
                }), c && b.splice(h, 1));
            }
        });
        var Tb = {
            touchstart: yb,
            touchmove: zb,
            touchend: Ab,
            touchcancel: Bb
        }, Ub = "touchstart", Vb = "touchstart touchmove touchend touchcancel";
        j(O, y, {
            handler: function(a) {
                var b = Tb[a.type];
                if (b === yb && (this.started = !0), this.started) {
                    var c = P.call(this, a, b);
                    b & (Ab | Bb) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
                        pointers: c[0],
                        changedPointers: c[1],
                        pointerType: tb,
                        srcEvent: a
                    });
                }
            }
        });
        var Wb = {
            touchstart: yb,
            touchmove: zb,
            touchend: Ab,
            touchcancel: Bb
        }, Xb = "touchstart touchmove touchend touchcancel";
        j(Q, y, {
            handler: function(a) {
                var b = Wb[a.type], c = R.call(this, a, b);
                c && this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: tb,
                    srcEvent: a
                });
            }
        }), j(S, y, {
            handler: function(a, b, c) {
                var d = c.pointerType == tb, e = c.pointerType == vb;
                if (d) this.mouse.allow = !1; else if (e && !this.mouse.allow) return;
                b & (Ab | Bb) && (this.mouse.allow = !0), this.callback(a, b, c);
            },
            destroy: function() {
                this.touch.destroy(), this.mouse.destroy();
            }
        });
        var Yb = v(jb.style, "touchAction"), Zb = Yb !== d, $b = "compute", _b = "auto", ac = "manipulation", bc = "none", cc = "pan-x", dc = "pan-y";
        T.prototype = {
            set: function(a) {
                a == $b && (a = this.compute()), Zb && (this.manager.element.style[Yb] = a), this.actions = a.toLowerCase().trim();
            },
            update: function() {
                this.set(this.manager.options.touchAction);
            },
            compute: function() {
                var a = [];
                return g(this.manager.recognizers, function(b) {
                    l(b.options.enable, [ b ]) && (a = a.concat(b.getTouchAction()));
                }), U(a.join(" "));
            },
            preventDefaults: function(a) {
                if (!Zb) {
                    var b = a.srcEvent, c = a.offsetDirection;
                    if (this.manager.session.prevented) return void b.preventDefault();
                    var d = this.actions, e = q(d, bc), f = q(d, dc), g = q(d, cc);
                    return e || f && c & Hb || g && c & Ib ? this.preventSrc(b) : void 0;
                }
            },
            preventSrc: function(a) {
                this.manager.session.prevented = !0, a.preventDefault();
            }
        };
        var ec = 1, fc = 2, gc = 4, hc = 8, ic = hc, jc = 16, kc = 32;
        V.prototype = {
            defaults: {},
            set: function(a) {
                return h(this.options, a), this.manager && this.manager.touchAction.update(), this;
            },
            recognizeWith: function(a) {
                if (f(a, "recognizeWith", this)) return this;
                var b = this.simultaneous;
                return a = Y(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
            },
            dropRecognizeWith: function(a) {
                return f(a, "dropRecognizeWith", this) ? this : (a = Y(a, this), delete this.simultaneous[a.id], 
                this);
            },
            requireFailure: function(a) {
                if (f(a, "requireFailure", this)) return this;
                var b = this.requireFail;
                return a = Y(a, this), -1 === s(b, a) && (b.push(a), a.requireFailure(this)), this;
            },
            dropRequireFailure: function(a) {
                if (f(a, "dropRequireFailure", this)) return this;
                a = Y(a, this);
                var b = s(this.requireFail, a);
                return b > -1 && this.requireFail.splice(b, 1), this;
            },
            hasRequireFailures: function() {
                return this.requireFail.length > 0;
            },
            canRecognizeWith: function(a) {
                return !!this.simultaneous[a.id];
            },
            emit: function(a) {
                function b(b) {
                    c.manager.emit(c.options.event + (b ? W(d) : ""), a);
                }
                var c = this, d = this.state;
                hc > d && b(!0), b(), d >= hc && b(!0);
            },
            tryEmit: function(a) {
                return this.canEmit() ? this.emit(a) : void (this.state = kc);
            },
            canEmit: function() {
                for (var a = 0; a < this.requireFail.length; ) {
                    if (!(this.requireFail[a].state & (kc | ec))) return !1;
                    a++;
                }
                return !0;
            },
            recognize: function(a) {
                var b = h({}, a);
                return l(this.options.enable, [ this, b ]) ? (this.state & (ic | jc | kc) && (this.state = ec), 
                this.state = this.process(b), void (this.state & (fc | gc | hc | jc) && this.tryEmit(b))) : (this.reset(), 
                void (this.state = kc));
            },
            process: function() {},
            getTouchAction: function() {},
            reset: function() {}
        }, j(Z, V, {
            defaults: {
                pointers: 1
            },
            attrTest: function(a) {
                var b = this.options.pointers;
                return 0 === b || a.pointers.length === b;
            },
            process: function(a) {
                var b = this.state, c = a.eventType, d = b & (fc | gc), e = this.attrTest(a);
                return d && (c & Bb || !e) ? b | jc : d || e ? c & Ab ? b | hc : b & fc ? b | gc : fc : kc;
            }
        }), j($, Z, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: Jb
            },
            getTouchAction: function() {
                var a = this.options.direction, b = [];
                return a & Hb && b.push(dc), a & Ib && b.push(cc), b;
            },
            directionTest: function(a) {
                var b = this.options, c = !0, d = a.distance, e = a.direction, f = a.deltaX, g = a.deltaY;
                return e & b.direction || (b.direction & Hb ? (e = 0 === f ? Cb : 0 > f ? Db : Eb, 
                c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Cb : 0 > g ? Fb : Gb, 
                c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
            },
            attrTest: function(a) {
                return Z.prototype.attrTest.call(this, a) && (this.state & fc || !(this.state & fc) && this.directionTest(a));
            },
            emit: function(a) {
                this.pX = a.deltaX, this.pY = a.deltaY;
                var b = X(a.direction);
                b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a);
            }
        }), j(_, Z, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [ bc ];
            },
            attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & fc);
            },
            emit: function(a) {
                if (this._super.emit.call(this, a), 1 !== a.scale) {
                    var b = a.scale < 1 ? "in" : "out";
                    this.manager.emit(this.options.event + b, a);
                }
            }
        }), j(ab, V, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 500,
                threshold: 5
            },
            getTouchAction: function() {
                return [ _b ];
            },
            process: function(a) {
                var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime > b.time;
                if (this._input = a, !d || !c || a.eventType & (Ab | Bb) && !f) this.reset(); else if (a.eventType & yb) this.reset(), 
                this._timer = e(function() {
                    this.state = ic, this.tryEmit();
                }, b.time, this); else if (a.eventType & Ab) return ic;
                return kc;
            },
            reset: function() {
                clearTimeout(this._timer);
            },
            emit: function(a) {
                this.state === ic && (a && a.eventType & Ab ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = nb(), 
                this.manager.emit(this.options.event, this._input)));
            }
        }), j(bb, Z, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [ bc ];
            },
            attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & fc);
            }
        }), j(cb, Z, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .65,
                direction: Hb | Ib,
                pointers: 1
            },
            getTouchAction: function() {
                return $.prototype.getTouchAction.call(this);
            },
            attrTest: function(a) {
                var b, c = this.options.direction;
                return c & (Hb | Ib) ? b = a.velocity : c & Hb ? b = a.velocityX : c & Ib && (b = a.velocityY), 
                this._super.attrTest.call(this, a) && c & a.direction && a.distance > this.options.threshold && mb(b) > this.options.velocity && a.eventType & Ab;
            },
            emit: function(a) {
                var b = X(a.direction);
                b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
            }
        }), j(db, V, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 2,
                posThreshold: 10
            },
            getTouchAction: function() {
                return [ ac ];
            },
            process: function(a) {
                var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime < b.time;
                if (this.reset(), a.eventType & yb && 0 === this.count) return this.failTimeout();
                if (d && f && c) {
                    if (a.eventType != Ab) return this.failTimeout();
                    var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0, h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold;
                    this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, 
                    this._input = a;
                    var i = this.count % b.taps;
                    if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() {
                        this.state = ic, this.tryEmit();
                    }, b.interval, this), fc) : ic;
                }
                return kc;
            },
            failTimeout: function() {
                return this._timer = e(function() {
                    this.state = kc;
                }, this.options.interval, this), kc;
            },
            reset: function() {
                clearTimeout(this._timer);
            },
            emit: function() {
                this.state == ic && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
            }
        }), eb.VERSION = "2.0.4", eb.defaults = {
            domEvents: !1,
            touchAction: $b,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [ [ bb, {
                enable: !1
            } ], [ _, {
                enable: !1
            }, [ "rotate" ] ], [ cb, {
                direction: Hb
            } ], [ $, {
                direction: Hb
            }, [ "swipe" ] ], [ db ], [ db, {
                event: "doubletap",
                taps: 2
            }, [ "tap" ] ], [ ab ] ],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var lc = 1, mc = 2;
        fb.prototype = {
            set: function(a) {
                return h(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), 
                this.input.target = a.inputTarget, this.input.init()), this;
            },
            stop: function(a) {
                this.session.stopped = a ? mc : lc;
            },
            recognize: function(a) {
                var b = this.session;
                if (!b.stopped) {
                    this.touchAction.preventDefaults(a);
                    var c, d = this.recognizers, e = b.curRecognizer;
                    (!e || e && e.state & ic) && (e = b.curRecognizer = null);
                    for (var f = 0; f < d.length; ) c = d[f], b.stopped === mc || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), 
                    !e && c.state & (fc | gc | hc) && (e = b.curRecognizer = c), f++;
                }
            },
            get: function(a) {
                if (a instanceof V) return a;
                for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];
                return null;
            },
            add: function(a) {
                if (f(a, "add", this)) return this;
                var b = this.get(a.options.event);
                return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), 
                a;
            },
            remove: function(a) {
                if (f(a, "remove", this)) return this;
                var b = this.recognizers;
                return a = this.get(a), b.splice(s(b, a), 1), this.touchAction.update(), this;
            },
            on: function(a, b) {
                var c = this.handlers;
                return g(r(a), function(a) {
                    c[a] = c[a] || [], c[a].push(b);
                }), this;
            },
            off: function(a, b) {
                var c = this.handlers;
                return g(r(a), function(a) {
                    b ? c[a].splice(s(c[a], b), 1) : delete c[a];
                }), this;
            },
            emit: function(a, b) {
                this.options.domEvents && hb(a, b);
                var c = this.handlers[a] && this.handlers[a].slice();
                if (c && c.length) {
                    b.type = a, b.preventDefault = function() {
                        b.srcEvent.preventDefault();
                    };
                    for (var d = 0; d < c.length; ) c[d](b), d++;
                }
            },
            destroy: function() {
                this.element && gb(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), 
                this.element = null;
            }
        }, h(eb, {
            INPUT_START: yb,
            INPUT_MOVE: zb,
            INPUT_END: Ab,
            INPUT_CANCEL: Bb,
            STATE_POSSIBLE: ec,
            STATE_BEGAN: fc,
            STATE_CHANGED: gc,
            STATE_ENDED: hc,
            STATE_RECOGNIZED: ic,
            STATE_CANCELLED: jc,
            STATE_FAILED: kc,
            DIRECTION_NONE: Cb,
            DIRECTION_LEFT: Db,
            DIRECTION_RIGHT: Eb,
            DIRECTION_UP: Fb,
            DIRECTION_DOWN: Gb,
            DIRECTION_HORIZONTAL: Hb,
            DIRECTION_VERTICAL: Ib,
            DIRECTION_ALL: Jb,
            Manager: fb,
            Input: y,
            TouchAction: T,
            TouchInput: Q,
            MouseInput: M,
            PointerEventInput: N,
            TouchMouseInput: S,
            SingleTouchInput: O,
            Recognizer: V,
            AttrRecognizer: Z,
            Tap: db,
            Pan: $,
            Swipe: cb,
            Pinch: _,
            Rotate: bb,
            Press: ab,
            on: n,
            off: o,
            each: g,
            merge: i,
            extend: h,
            inherit: j,
            bindFn: k,
            prefixed: v
        }), typeof define == kb && define.amd ? define(function() {
            return eb;
        }) : "undefined" != typeof module && module.exports ? module.exports = eb : a[c] = eb;
    }(window, document, "Hammer");
});

define("js/cmd/core/hammer/jquery.hammer", [ "hammer" ], function(require, exports, module) {
    return function($) {
        var Hammer = require("hammer");
        function hammerify(el, options) {
            var $el = $(el);
            if (!$el.data("hammer")) {
                $el.data("hammer", new Hammer($el[0], options));
            }
        }
        $.fn.hammer = function(options) {
            return this.each(function() {
                hammerify(this, options);
            });
        };
        // extend the emit method to also trigger jQuery events
        Hammer.Manager.prototype.emit = function(originalEmit) {
            return function(type, data) {
                originalEmit.call(this, type, data);
                $(this.element).trigger({
                    type: type,
                    gesture: data
                });
            };
        }(Hammer.Manager.prototype.emit);
    };
});

/**
 * 动画  相关操作
 */
define("js/cmd/cicada/animation/cicada_animation", [], function(require, exports, module) {
    /**
     * transition 动画结束
     * @returns {*}
     */
    var animationEnd = function(dom, callBack) {
        var el = document.createElement("div");
        var transEndEventNames = {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend"
        };
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                dom.addEventListener(transEndEventNames[name], callBack);
                break;
            }
        }
    };
    /**
     * transition 动画结束
     * @returns {*}
     */
    var transitionEnd = function(dom, callBack) {
        var el = document.createElement("div");
        var transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                dom.addEventListener(transEndEventNames[name], callBack);
                break;
            }
        }
        return false;
    };
    var AN = {
        /**
         * 数字滚动
         * @param $dom
         * @returns {number}
         */
        numberScroll: function($dom) {
            var a_num = $dom.attr("data-num") * 1;
            var a = 1;
            var crear_a = "";
            var change_a = function() {
                if (a < a_num) {
                    a += 4;
                    $dom.text(a);
                } else {
                    $dom.text(a_num);
                    clearInterval(crear_a);
                }
            };
            crear_a = setInterval(change_a, 3e3 / a_num);
            return crear_a;
        },
        /**
         * js动画引擎
         * @returns {Function}
         */
        reAF: function() {
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
                return setTimeout(callback, 1e3 / 60);
            };
            return requestAnimationFrame;
        },
        clAF: function() {
            var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame || function(callback) {
                return clearTimeout(callback, 1e3 / 60);
            };
            return cancelAnimationFrame;
        },
        animateEnd: animationEnd,
        transitionEnd: transitionEnd
    };
    module.exports = AN;
});

/**
 * Created by sherlock on 15/4/26.
 * cicada 常用类库整合
 */
define("js/cmd/cicada/main/cicada_lib", [ "../storage/cicada_sg", "../storage/cicada_ck", "../storage/cicada_websql", "../animation/cicada_animation", "../template/cicada_tmp", "../web/cicada_location", "../web/cicada_page", "../os/cicada_os", "../val/cicada_jstring", "../val/cicada_jvalidate", "../other/cicada_client" ], function(require, exports, module) {
    var Cicada = {};
    //本地存储
    Cicada.lg = $.extend({}, require("../storage/cicada_sg"), require("../storage/cicada_ck"), require("../storage/cicada_websql"));
    //js动画
    Cicada.ani = $.extend({}, require("../animation/cicada_animation"));
    //模版引擎
    Cicada.tmp = $.extend({}, require("../template/cicada_tmp"));
    //web相关
    Cicada.web = $.extend({}, require("../web/cicada_location"), require("../web/cicada_page"));
    //os系统
    Cicada.os = require("../os/cicada_os");
    //字符相关
    Cicada.val = {};
    Cicada.val.jstring = require("../val/cicada_jstring");
    Cicada.val.jvalidate = require("../val/cicada_jvalidate");
    //cicada客户端
    Cicada.other = require("../other/cicada_client");
    module.exports = Cicada;
});

/**
 * OS  相关操作
 * @param key
 */
define("js/cmd/cicada/os/cicada_os", [ "../storage/cicada_sg" ], function(require, exports, module) {
    var lg = require("../storage/cicada_sg");
    var OS = {
        checkMobile: function() {
            var ua = window.navigator.userAgent.toLowerCase();
            //ios
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                return {
                    type: "iOS"
                };
            } else if (ua.indexOf("qq/") > -1) {
                return {
                    message: "qq下载请点击右上角在浏览器中打开",
                    type: "third"
                };
            } else if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return {
                    message: "微信下载请点击右上角在浏览器中打开",
                    type: "third"
                };
            } else if (navigator.userAgent.match(/Android/i)) {
                return {
                    type: "Android"
                };
            } else {
                return {
                    type: "other"
                };
            }
        },
        getOS: function() {
            //定义结果变量
            var name = "Other";
            var version = "";
            //获取userAgent
            var ua = navigator.userAgent;
            //移动平台iOS探测
            var reg = /like Mac OS X|Android|Windows Phone|Symbian/gi;
            var regResult = reg.exec(ua);
            if (!regResult) {
                reg = /Mac OS X|Windows NT|Linux/gi;
                regResult = reg.exec(ua);
            }
            if (!regResult) {
                //返回UNKNOWN
                return name;
            } else {
                //操作系统检测
                switch (regResult[0]) {
                  case "like Mac os X":
                    name = "iOS";
                    reg = /(iPhone|iPod|iPad).*?OS\s*(\d*[\_|\.\d]*)/gi;
                    break;

                  case "Android":
                    name = "Android";
                    reg = /(Android)\s*(\d*[\.\d]*)/gi;
                    break;

                  case "Windows Phone":
                    name = "Windows Phone";
                    reg = /(Windows Phone)\s*[OS]*\s*(\d*[\.\d]*)/gi;
                    break;

                  case "Symbian":
                    name = "Symbian";
                    reg = /(Symbian)\s*[OS]*\/*\s*(\d[\.\d]*)/gi;
                    break;

                  case "Mac os X":
                    name = "os X";
                    reg = /(Mac OS X)\s*(\d*[\_|\.\d]*)/gi;
                    break;

                  case "Windows NT":
                    name = "Windows NT";
                    reg = /(Windows NT)\s*(\d*[\_|\.\d]*)/gi;
                    break;

                  case "Linux":
                    name = "Linux";
                    reg = /(Linux)\s*(i*\d*)/gi;
                    break;
                }
                //获取版本号
                regResult = reg.exec(ua);
                if (regResult && regResult.length >= 3) {
                    version = regResult[2].replace(/\_+/gi, ".");
                    reg = /^\d+\.*\d*/gi;
                    regResult = reg.exec(version);
                    if (regResult) {
                        version = regResult[0];
                    }
                }
            }
            //返回操作系统名称+版本号
            return [ name, version ].join(" ");
        },
        getBrowser: function() {
            //定义结果变量
            var name = "Other";
            var version = "";
            //获取userAgent
            var ua = navigator.userAgent;
            //移动平台iOS探测
            var reg = /MSIE|Chrome|Firefox|Opera|UCBrowser|UCWEB|Safari/gi;
            var regResult = reg.exec(ua);
            if (!regResult) {
                //返回UNKNOWN
                return name;
            } else {
                //浏览器检测
                switch (regResult[0]) {
                  case "MSIE":
                    name = "IE";
                    reg = /MS(IE)[\/|\s]+(\d*[\.\d]*)/gi;
                    break;

                  case "Chrome":
                    name = "Chrome";
                    reg = /(Chrome)[\/|\s]+(\d*[\.\d]*)/gi;
                    break;

                  case "Firefox":
                    name = "Firefox";
                    reg = /(Firefox)[\/|\s]+(\d*[\.\d]*)/gi;
                    break;

                  case "Safari":
                    name = "Safari";
                    reg = /(Safari)[\/|\s]*(\d*[\.\d]*)/gi;
                    break;

                  case "Opera":
                    name = "Opera";
                    reg = /(Opera)[\/|\s]+(\d*[\.\d]*)/gi;
                    break;

                  case "UCBrowser":
                    name = "UC";
                    reg = /(UCBrowser)[\/|\s]+(\d*[\.\d]*)/gi;
                    break;

                  case "UCWEB":
                    name = "UC";
                    reg = /(UCWEB)[\/|\s]*(\d*[\.\d]*)/gi;
                    break;
                }
                //获取版本号
                regResult = reg.exec(ua);
                if (regResult && regResult.length >= 3) {
                    version = regResult[2].replace(/\_+/gi, ".");
                    reg = /^\d+\.*\d*/gi;
                    regResult = reg.exec(version);
                    if (regResult) {
                        version = regResult[0];
                    }
                }
            }
            //返回操作系统名称+版本号
            return [ name, version ].join(" ");
        }
    };
    module.exports = OS;
});

/**
 * cicada client
 * @param key
 */
define("js/cmd/cicada/other/cicada_client", [ "../web/cicada_location" ], function(require, exports, module) {
    var Location = require("../web/cicada_location");
    var Client = {
        openCiacada: function() {
            //            var isrefresh =  Util.location.getParams().refresh;
            //            if(isrefresh == 1) {
            //                return
            //            }
            window.location.href = "http://cicada://public/page/index";
        },
        sharePgaeByUserId: function(type, url, sjson) {
            if (type == "iOS") {
                sjson.url = url;
                var temp = JSON.stringify(sjson);
                var encodeJson = encodeURI(temp);
                console.log("ios", CONSTANT_TASK.cicada_share_url.ios_share_url + "?json=" + encodeJson);
                window.location.href = CONSTANT_TASK.cicada_share_url.ios_share_url + "?json=" + encodeJson;
            } else {
                var temp = JSON.stringify(sjson);
                console.log("android", temp);
                window.cicada.sharePageByUserId(url, temp);
            }
        },
        goPage: function(type, viewName) {
            var params = [ {
                key: "viewName",
                value: viewName
            } ];
            if (type == "iOS") {
                var params = Location.encodeParam(params);
                console.log("ios", "cicada://cicada/page/goPage" + params);
                window.location.href = "cicada://cicada/page/goPage" + params;
            } else {
                window.cicada.goPage(viewName);
            }
        },
        back: function(type) {
            if (type == "iOS") {
                console.log("ios", "cicada://cicadaStore/back");
                window.location.href = "cicada://cicadaStore/back";
            } else {
                window.cicadaStore.back();
            }
        }
    };
    module.exports = Client;
});

/**
 * Cookie 相关操作
 * @param key
 */
define("js/cmd/cicada/storage/cicada_ck", [], function(require, exports, module) {
    var Cookie = {
        getCookie: function(key) {
            var reg = new RegExp("(^|\\s+)" + key + "=([^;]*)(;|$)");
            var regResult = document.cookie.match(reg);
            if (regResult) {
                return unescape(regResult[2]);
            } else {
                return "";
            }
        },
        setCookie: function(key, value, expires) {
            var cookieItem = key + "=" + escape(value);
            if (expires) {
                if (typeof expires == "number") {
                    expires = new Date(expires);
                }
                cookieItem += ";expires=" + expires.toGMTString();
            }
            document.cookie = cookieItem;
        }
    };
    module.exports = Cookie;
});

/**
 * HTML5 storage 相关操作
 * @param key
 */
define("js/cmd/cicada/storage/cicada_sg", [], function(require, exports, module) {
    var SG = {
        /**
             * 获得sessionStorage 对象
             * @param key
             */
        getSgObj: function(key) {
            var obj = window.sessionStorage.getItem(key);
            return JSON.parse(obj);
        },
        /**
             * 设置sessionStorage 对象
             * @param key
             */
        setSgObj: function(key, value) {
            return window.sessionStorage.setItem(key, JSON.stringify(value));
        },
        getSg: function(key) {
            return window.sessionStorage.getItem(key);
        },
        setSg: function(key, value) {
            window.sessionStorage.setItem(key, value);
        },
        remove: function(key) {
            window.sessionStorage.removeItem(key);
        },
        removeSg: function(key) {
            window.sessionStorage.removeItem(key);
        },
        loading: function(toggle) {
            if (toggle) {
                $ionicLoading.show();
            } else {
                $ionicLoading.hide();
            }
        },
        getLgObj: function(key) {
            var obj = window.localStorage.getItem(key);
            return JSON.parse(obj);
        },
        setLgObj: function(key, value) {
            return window.localStorage.setItem(key, JSON.stringify(value));
        },
        getLg: function(key) {
            return window.localStorage.getItem(key);
        },
        setLg: function(key, value) {
            window.localStorage.setItem(key, value);
        },
        removeLg: function(key) {
            window.localStorage.removeItem(key);
        }
    };
    module.exports = SG;
});

/**
 * HTML5 websql 相关操作
 * @param key
 */
define("js/cmd/cicada/storage/cicada_websql", [], function(require, exports, module) {
    var WebSql = {};
    module.exports = WebSql;
});

define("js/cmd/cicada/template/cicada_tmp", [], function(require, exports, module) {
    var TMP = {
        /**
         * 渲染模板
         *
         * @param $dom
         * @param data
         * @param $template
         */
        refreshTemplate: function($dom, data, $template, append) {
            // 原生方法
            var source = $template.html();
            // 预编译模板
            var tm = tp.compile(source);
            // 匹配json内容
            var html = tm(data);
            // // 输入模板
            if (append) $dom.append(html); else $dom.html(html);
        }
    };
    module.exports = TMP;
});

/**
 * Created by sherlock on 15/4/26.
 */
define("js/cmd/cicada/val/cicada_jstring", [], function(require, exports, module) {
    var JString = {
        /**
         * @description 非空判断(判断以下:undefend,null,"")
         * @param str   字符串
         * @returns {boolean} true : 空 , false  : 非空
         */
        isEmpty: function(str) {
            if (undefined == str || null == str || "" == str) {
                return true;
            }
            return false;
        },
        /**
         * @description 将字符串解析成html标签
         * @param str   带解析的字符串
         * @returns {string}  解析完成后字符串
         */
        parseHtml: function(str) {
            String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
                if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
                    return this.replace(new RegExp(reallyDo, ignoreCase ? "gi" : "g"), replaceWith);
                } else {
                    return this.replace(reallyDo, replaceWith);
                }
            };
            //str含有HTML标签的文本
            str = str.replaceAll("<", "&lt;");
            str = str.replaceAll(">", "&gt;");
            str = str.replaceAll(" ", "&nbsp;");
            str = str.replaceAll("\n", "<br>");
            str = str.replaceAll("&", "&amp;");
            return str.toString();
        },
        /**
         * @description 替换后缀名(a.mp3 -->b.mp4)
         * @param   str 原始字符
         * @param   identifier 原始标志
         * @param   target  替换标志
         * @return  {string} 替换后字符串
         */
        replaceLastChar: function(str, identifier, target) {
            var last = str.lastIndexOf(identifier);
            return str.substring(0, last + 1) + target;
        },
        /**
         * @description  去掉字符串中所有空格 is_globa = 'g'
         * @param   str 原始字符
         * @param   identifier 原始标志
         * @param   target  替换标志
         * @result  {{去掉之后的字符串}}
         */
        trimAll: function(str, is_global) {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g, "");
            if (is_global.toLowerCase() == "g") result = result.replace(/\s/g, "");
            return result;
        },
        /**
         * @description  去掉左右两边的空格
         * @param   str 原始字符
         * @param   type  l:左边  r:右边  lr : 左右两边
         * @result  {{去掉之后的字符串}}
         */
        trim: function(str, type) {
            var regs = /\s+/g;
            if (type == "l") {
                regs = /^\s*/;
            } else if (type == "r") {
                regs = /(\s*$)/g;
            } else if (type == "lr") {
                regs = /^\s+|\s+$/g;
            }
            return str.replace(regs, "");
        }
    };
    module.exports = JString;
});

/**
 * Created by sherlock on 15/4/26.
 */
define("js/cmd/cicada/val/cicada_jvalidate", [], function(require, exports, module) {
    var JValidate = {
        /**
         * 检查是否是按键值
         * @param key  按键值
         * @returns {boolean} true : 是 ,false :不是
         */
        vdIsKey: function(key) {
            var zz = /^\d$/;
            return zz.test(key);
        },
        /**
         * 判断是否为数字
         * @param num    字符
         * @returns {boolean}  true : 是 , false :不是
         */
        vdIsNum: function(num) {
            var zz = /^\d+$/;
            return zz.test(num);
        },
        /**
         * 判断是否为qq号码
         * @param str qq号
         * @returns {boolean}    true:是 ,false :不是
         */
        isQQ: function(str) {
            if (/^\d{5,14}$/.test(str)) {
                return true;
            }
            return false;
        },
        /**
         * 判断是否为手机
         * @param str 手机号
         * @returns {boolean}    true:是 ,false :不是
         */
        isPhone: function(str) {
            var reg = /^0?1[7358]\d{9}$/;
            return reg.test(str);
        },
        /**
         * 判断是否为邮箱
         * @param str 邮箱
         * @returns {boolean}    true:是 ,false :不是
         */
        isEmail: function(str) {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            return reg.test(str);
        },
        /**
         * 判断是否正整数
         * @param str 数值
         * @returns {boolean}    true:是 ,false :不是
         */
        isPlusNumber: function(str) {
            var reg = /^[0-9]*[1-9][0-9]*$/;
            return reg.test(str);
        },
        /**
         * 判断是否正数 不包括0
         * @param str 数值
         * @returns {boolean}    true:是 ,false :不是
         */
        isNumric: function(str) {
            var reg = /^(([0-9]+[\.]?[0-9]+)|[1-9])$/;
            return reg.test(str);
        }
    };
    module.exports = JValidate;
});

/**
 * location  相关操作
 * @param key
 */
define("js/cmd/cicada/web/cicada_location", [], function(require, exports, module) {
    var Location = {
        getParams: function() {
            var url = location.search;
            //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        //编码uri
        encodeParam: function(paramList) {
            var baseUrl = "";
            for (var i = 0; i < paramList.length; i++) {
                var value = paramList[i].value;
                if (i == 0) {
                    baseUrl += "?" + paramList[i].key + "=" + encodeURI(value);
                } else {
                    value = paramList[i].value;
                    baseUrl += "&" + paramList[i].key + "=" + encodeURI(value);
                }
            }
            return baseUrl;
        },
        getParamByName: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            {
                return null;
            }
        },
        /**
         * @description 等待几秒后 刷新页面
         * @param time
         *            等待毫秒数
         */
        reloadPage: function(time) {
            var fn = function() {
                window.location = window.location;
            };
            if (!time) {
                time = 0;
            }
            setTimeout(fn, time);
        },
        /**
         * @description 等待几秒 跳转页面
         * @param url
         *            跳转路径
         * @param time
         *            等待毫秒数
         */
        jumpPage: function(url, time) {
            var fn = function() {
                window.location.href = url;
            };
            if (!time) {
                time = 0;
            }
            setTimeout(fn, time);
        }
    };
    module.exports = Location;
});

/**
 * location  相关操作
 * @param key
 */
define("js/cmd/cicada/web/cicada_page", [], function(require, exports, module) {
    var Page = {
        /** 获得当前屏幕宽高 **/
        getOffset: function() {
            return {
                width: document.body.offsetWidth,
                height: document.body.offsetHeight
            };
        },
        getBF: function() {
            var ua = navigator.userAgent.toLowerCase();
            var scene = ua.indexOf("micromessenger") > -1 ? "weixin" : /qq\/([\d\.]+)*/.test(ua) ? "qq" : "web";
            return scene;
        },
        /**
         * 返回上一页
         */
        back: function() {
            window.history.go(-1);
        },
        /**
         * 分解DOM名称，已spe分割
         * @param doms  分解dom集合
         * @param spe   分隔符
         * @returns {string}
         */
        sliceName: function(doms, spe) {
            var array = new Array();
            for (var i = 0; i < doms.length; i++) {
                var $obj = $(doms[i]);
                var name = $obj.attr("name");
                array.push(name);
            }
            if (JString.isEmpty(spe)) spe = ",";
            return array.join(spe);
        }
    };
    module.exports = Page;
});

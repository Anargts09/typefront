/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2015
 * @version 4.2.8
 *
 * File input styled for Bootstrap 3.0 that utilizes HTML5 File Input's advanced
 * features including the FileReader API.
 *
 * The plugin drastically enhances the HTML file input to preview multiple files on the client before
 * upload. In addition it provides the ability to preview content of images, text, videos, audio, html,
 * flash and other objects. It also offers the ability to upload and delete files using AJAX, and add
 * files in batches (i.e. preview, append, or remove before upload).
 *
 * Author: Kartik Visweswaran
 * Copyright: 2015, Kartik Visweswaran, Krajee.com
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(window.jQuery)
}(function(e) {
    "use strict";
    e.fn.fileinputLocales = {};
    var i, t, a, r, n, l, o, s, d, c, p, u, f, v, g, m, h, w, b, C, x, y, T, F, I, E, k, S, $, P, D, U, A, j, L, z, O, R, M, B, N, Z, H, W, q, _, V, K, X, J, Q, Y;
    i = function(e) {
        if ("Microsoft Internet Explorer" !== navigator.appName) return !1;
        if (10 === e) return new RegExp("msie\\s" + e, "i").test(navigator.userAgent);
        var i, t = document.createElement("div");
        return t.innerHTML = "<!--[if IE " + e + "]> <i></i> <![endif]-->", i = t.getElementsByTagName("i").length, document.body.appendChild(t), t.parentNode.removeChild(t), i
    }, t = function() {
        return new RegExp("Edge/[0-9]+", "i").test(navigator.userAgent)
    }, a = function(e, i, t, a) {
        var r = a ? i : i + ".fileinput";
        e.off(r).on(r, t)
    }, r = {
        data: {},
        init: function(e) {
            var i = e.initialPreview,
                t = e.id;
            i.length > 0 && !q(i) && (i = i.split(e.initialPreviewDelimiter)), r.data[t] = {
                content: i,
                config: e.initialPreviewConfig,
                tags: e.initialPreviewThumbTags,
                delimiter: e.initialPreviewDelimiter,
                template: e.previewGenericTemplate,
                msg: function(i) {
                    return e.getMsgSelected(i)
                },
                initId: e.previewInitId,
                footer: e.getLayoutTemplate("footer").replace(/\{progress}/g, e.renderThumbProgress()),
                isDelete: e.initialPreviewShowDelete,
                caption: e.initialCaption,
                actions: function(i, t, a, r, n) {
                    return e.renderFileActions(i, t, a, r, n)
                }
            }
        },
        fetch: function(e) {
            return r.data[e].content.filter(function(e) {
                return null !== e
            })
        },
        count: function(e, i) {
            return r.data[e] && r.data[e].content ? i ? r.data[e].content.length : r.fetch(e).length : 0
        },
        get: function(i, t, a) {
            var n, l, o = "init_" + t,
                s = r.data[i],
                d = s.config[t],
                c = s.initId + "-" + o,
                p = " file-preview-initial";
            return a = void 0 === a ? !0 : a, null === s.content[t] ? "" : (W(d) || W(d.frameClass) || (p += " " + d.frameClass), n = s.template.replace(/\{previewId}/g, c).replace(/\{frameClass}/g, p).replace(/\{fileindex}/g, o).replace(/\{content}/g, s.content[t]).replace(/\{footer}/g, r.footer(i, t, a)), s.tags.length && s.tags[t] && (n = J(n, s.tags[t])), W(d) || W(d.frameAttr) || (l = e(document.createElement("div")).html(n), l.find(".file-preview-initial").attr(d.frameAttr), n = l.html(), l.remove()), n)
        },
        add: function(i, t, a, n, l) {
            var o, s = e.extend(!0, {}, r.data[i]);
            return q(t) || (t = t.split(s.delimiter)), l ? (o = s.content.push(t) - 1, s.config[o] = a, s.tags[o] = n) : (o = t.length, s.content = t, s.config = a, s.tags = n), r.data[i] = s, o
        },
        set: function(i, t, a, n, l) {
            var o, s, d = e.extend(!0, {}, r.data[i]);
            if (t && t.length && (q(t) || (t = t.split(d.delimiter)), s = t.filter(function(e) {
                    return null !== e
                }), s.length)) {
                if (void 0 === d.content && (d.content = []), void 0 === d.config && (d.config = []), void 0 === d.tags && (d.tags = []), l) {
                    for (o = 0; o < t.length; o++) t[o] && d.content.push(t[o]);
                    for (o = 0; o < a.length; o++) a[o] && d.config.push(a[o]);
                    for (o = 0; o < n.length; o++) n[o] && d.tags.push(n[o])
                } else d.content = t, d.config = a, d.tags = n;
                r.data[i] = d
            }
        },
        unset: function(e, i) {
            var t = r.count(e);
            if (t) {
                if (1 === t) return r.data[e].content = [], void(r.data[e].config = []);
                r.data[e].content[i] = null, r.data[e].config[i] = null
            }
        },
        out: function(e) {
            var i, t = "",
                a = r.data[e],
                n = r.count(e, !0);
            if (0 === n) return {
                content: "",
                caption: ""
            };
            for (var l = 0; n > l; l++) t += r.get(e, l);
            return i = a.msg(r.count(e)), {
                content: t,
                caption: i
            }
        },
        footer: function(e, i, t) {
            var a = r.data[e];
            if (t = void 0 === t ? !0 : t, 0 === a.config.length || W(a.config[i])) return "";
            var n = a.config[i],
                l = _("caption", n) ? n.caption : "",
                o = _("width", n) ? n.width : "auto",
                s = _("url", n) ? n.url : !1,
                d = _("key", n) ? n.key : null,
                c = s === !1 && t,
                p = a.isDelete ? a.actions(!1, !0, c, s, d) : "",
                u = a.footer.replace(/\{actions}/g, p);
            return u.replace(/\{caption}/g, l).replace(/\{width}/g, o).replace(/\{indicator}/g, "").replace(/\{indicatorTitle}/g, "")
        }
    }, n = function(e, i) {
        return i = i || 0, "number" == typeof e ? e : ("string" == typeof e && (e = parseFloat(e)), isNaN(e) ? i : e)
    }, l = function() {
        return window.File && window.FileReader
    }, o = function() {
        var e = document.createElement("div");
        return !i(9) && !t() && (void 0 !== e.draggable || void 0 !== e.ondragstart && void 0 !== e.ondrop)
    }, s = function() {
        return l() && window.FormData
    }, d = function(e, i) {
        e.removeClass(i).addClass(i)
    }, c = 'style="width:{width};height:{height};"', p = '      <param name="controller" value="true" />\n      <param name="allowFullScreen" value="true" />\n      <param name="allowScriptAccess" value="always" />\n      <param name="autoPlay" value="false" />\n      <param name="autoStart" value="false" />\n      <param name="quality" value="high" />\n', u = '<div class="file-preview-other">\n   <span class="{previewFileIconClass}">{previewFileIcon}</span>\n</div>', f = {
        removeIcon: '<i class="icon-trash2 text-danger"></i>',
        removeClass: "btn btn-xs btn-color2",
        removeTitle: "Remove file",
        uploadIcon: '<i class="icon-upload text-info"></i>',
        uploadClass: "btn btn-xs btn-color2",
        uploadTitle: "Upload file",
        indicatorNew: '<i class="icon-hand-down text-warning"></i>',
        indicatorSuccess: '<i class="icon-ok-sign text-success"></i>',
        indicatorError: '<i class="icon-exclamation-sign text-danger"></i>',
        indicatorLoading: '<i class="icon-hand-up text-muted"></i>',
        indicatorNewTitle: "Not uploaded yet",
        indicatorSuccessTitle: "Uploaded",
        indicatorErrorTitle: "Upload Error",
        indicatorLoadingTitle: "Uploading ..."
    }, v = '{preview}\n<div class="kv-upload-progress hide"></div>\n<div class="input-group {class}">\n   {caption}\n   <div class="input-group-btn">\n       {remove}\n       {cancel}\n       {upload}\n       {browse}\n   </div>\n</div>', g = '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n', m = '<div class="file-preview {class}">\n    {close}    <div class="{dropClass}">\n    <div class="file-preview-thumbnails">\n    </div>\n    <div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div>\n    <div class="kv-fileinput-error"></div>\n    </div>\n</div>', w = '<div class="close fileinput-remove">&times;</div>\n', h = '<span class="icon-file-alt kv-caption-icon"></span>', b = '<div tabindex="500" class="form-control file-caption {class}">\n   <div class="file-caption-name"></div>\n</div>\n', C = '<button type="{type}" tabindex="500" title="{title}" class="{css}" {status}>{icon}{label}</button>', x = '<a href="{href}" tabindex="500" title="{title}" class="{css}" {status}>{icon}{label}</a>', y = '<div tabindex="500" class="{css}" {status}>{icon}{label}</div>', T = '<div id="{id}" class="file-preview-detail-modal modal fade" tabindex="-1">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <h3 class="modal-title">{heading} <small>{title}</small></h3>\n      </div>\n      <div class="modal-body">\n           <pre>{body}</pre>\n      </div>\n    </div>\n  </div>\n</div>', F = '<div class="progress">\n    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n        {percent}%\n     </div>\n</div>', I = '<div class="file-thumbnail-footer">\n    <div class="file-footer-caption" title="{caption}">{caption}</div>\n    {progress} {actions}\n</div>', E = '<div class="file-actions">\n    <div class="file-footer-buttons">\n        {upload}{delete}{other}    </div>\n    <div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>\n    <div class="clearfix"></div>\n</div>', k = '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}" {dataUrl}{dataKey}>{removeIcon}</button>\n', S = '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">   {uploadIcon}\n</button>\n', $ = '<button type="button" class="btn btn-color2 btn-xs btn-block" title="{zoomTitle}: {caption}" onclick="{dialog}">\n   {zoomInd}\n</button>\n', P = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n   {content}\n   {footer}\n</div>\n', D = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n    <object class="file-object" data="{data}" type="{type}" width="{width}" height="{height}">\n       ' + u + "\n    </object>\n   {footer}\n</div>", U = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n   <img src="{data}" class="file-preview-image" title="{caption}" alt="{caption}" ' + c + ">\n   {footer}\n</div>\n", A = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n   <pre class="file-preview-text" title="{caption}" ' + c + ">{data}</pre>\n   {zoom}\n   {footer}\n</div>", j = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + c + '>\n   <video width="{width}" height="{height}" controls>\n       <source src="{data}" type="{type}">\n       ' + u + "\n   </video>\n   {footer}\n</div>\n", L = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + c + '>\n   <audio controls>\n       <source src="{data}" type="{type}">\n       ' + u + "\n   </audio>\n   {footer}\n</div>", z = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + c + '>\n   <object class="file-object" type="application/x-shockwave-flash" width="{width}" height="{height}" data="{data}">\n' + p + "       " + u + "\n   </object>\n   {footer}\n</div>\n", O = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + c + '>\n   <object class="file-object" data="{data}" type="{type}" width="{width}" height="{height}">\n       <param name="movie" value="{caption}" />\n' + p + "         " + u + "\n   </object>\n   {footer}\n</div>", R = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + c + '>\n   <div class="file-preview-other-frame">\n   ' + u + '\n   </div>\n   <div class="file-preview-other-footer">{footer}</div>\n</div>', M = {
        main1: v,
        main2: g,
        preview: m,
        close: w,
        zoom: $,
        icon: h,
        caption: b,
        modal: T,
        progress: F,
        footer: I,
        actions: E,
        actionDelete: k,
        actionUpload: S,
        btnDefault: C,
        btnLink: x,
        btnBrowse: y
    }, B = {
        generic: P,
        html: D,
        image: U,
        text: A,
        video: j,
        audio: L,
        flash: z,
        object: O,
        other: R
    }, N = ["image", "html", "text", "video", "audio", "flash", "object"], Z = {
        image: {
            width: "auto",
            height: "160px"
        },
        html: {
            width: "213px",
            height: "160px"
        },
        text: {
            width: "160px",
            height: "136px"
        },
        video: {
            width: "213px",
            height: "160px"
        },
        audio: {
            width: "213px",
            height: "80px"
        },
        flash: {
            width: "213px",
            height: "160px"
        },
        object: {
            width: "160px",
            height: "160px"
        },
        other: {
            width: "160px",
            height: "160px"
        }
    }, H = {
        image: function(e, i) {
            return void 0 !== e ? e.match("image.*") : i.match(/\.(gif|png|jpe?g)$/i)
        },
        html: function(e, i) {
            return void 0 !== e ? "text/html" === e : i.match(/\.(htm|html)$/i)
        },
        text: function(e, i) {
            return void 0 !== e && e.match("text.*") || i.match(/\.(txt|md|csv|nfo|ini|json|php|js|css)$/i)
        },
        video: function(e, i) {
            return void 0 !== e && e.match(/\.video\/(ogg|mp4|webm|3gp)$/i) || i.match(/\.(og?|mp4|webm|3gp)$/i)
        },
        audio: function(e, i) {
            return void 0 !== e && e.match(/\.audio\/(ogg|mp3|wav)$/i) || i.match(/\.(ogg|mp3|wav)$/i)
        },
        flash: function(e, i) {
            return void 0 !== e && "application/x-shockwave-flash" === e || i.match(/\.(swf)$/i)
        },
        object: function() {
            return !0
        },
        other: function() {
            return !0
        }
    }, W = function(i, t) {
        return void 0 === i || null === i || 0 === i.length || t && "" === e.trim(i)
    }, q = function(e) {
        return Array.isArray(e) || "[object Array]" === Object.prototype.toString.call(e)
    }, _ = function(e, i) {
        return "object" == typeof i && e in i
    }, V = function(i, t, a) {
        return W(i) || W(i[t]) ? a : e(i[t])
    }, K = function() {
        return Math.round((new Date).getTime() + 100 * Math.random())
    }, X = function(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
    }, J = function(i, t) {
        var a = i;
        return t ? (e.each(t, function(e, i) {
            "function" == typeof i && (i = i()), a = a.split(e).join(i)
        }), a) : a
    }, Q = window.URL || window.webkitURL, Y = function(t, a) {
        var r = this;
        r.$element = e(t), r.validate() && (r.isPreviewable = l(), r.isIE9 = i(9), r.isIE10 = i(10), r.isPreviewable || r.isIE9 ? (r.init(a), r.listen()) : r.$element.removeClass("file-loading"))
    }, Y.prototype = {
        constructor: Y,
        validate: function() {
            var e, i = this;
            return "file" === i.$element.attr("type") ? !0 : (e = '<div class="help-block alert alert-warning"><h4>Invalid Input Type</h4>You must set an input <code>type = file</code> for <b>bootstrap-fileinput</b> plugin to initialize.</div>', i.$element.after(e), !1)
        },
        init: function(i) {
            var t, a = this,
                l = a.$element;
            e.each(i, function(e, i) {
                switch (e) {
                    case "minFileCount":
                    case "maxFileCount":
                    case "maxFileSize":
                        a[e] = n(i);
                        break;
                    default:
                        a[e] = i
                }
            }), a.fileInputCleared = !1, a.fileBatchCompleted = !0, a.isPreviewable || (a.showPreview = !1), a.uploadFileAttr = W(l.attr("name")) ? "file_data" : l.attr("name"), a.reader = null, a.formdata = {}, a.clearStack(), a.uploadCount = 0, a.uploadStatus = {}, a.uploadLog = [], a.uploadAsyncCount = 0, a.loadedImages = [], a.totalImagesCount = 0, a.ajaxRequests = [], a.isError = !1, a.ajaxAborted = !1, a.cancelling = !1, t = a.getLayoutTemplate("progress"), a.progressTemplate = t.replace("{class}", a.progressClass), a.progressCompleteTemplate = t.replace("{class}", a.progressCompleteClass), a.dropZoneEnabled = o() && a.dropZoneEnabled, a.isDisabled = a.$element.attr("disabled") || a.$element.attr("readonly"), a.isUploadable = s() && !W(a.uploadUrl), a.slug = "function" == typeof i.slugCallback ? i.slugCallback : a.slugDefault, a.mainTemplate = a.getLayoutTemplate(a.showCaption ? "main1" : "main2"), a.captionTemplate = a.getLayoutTemplate("caption"), a.previewGenericTemplate = a.getPreviewTemplate("generic"), a.resizeImage && (a.maxImageWidth || a.maxImageHeight) && (a.imageCanvas = document.createElement("canvas"), a.imageCanvasContext = a.imageCanvas.getContext("2d")), W(a.$element.attr("id")) && a.$element.attr("id", K()), void 0 === a.$container ? a.$container = a.createContainer() : a.refreshContainer(), a.$progress = a.$container.find(".kv-upload-progress"), a.$btnUpload = a.$container.find(".fileinput-upload"), a.$captionContainer = V(i, "elCaptionContainer", a.$container.find(".file-caption")), a.$caption = V(i, "elCaptionText", a.$container.find(".file-caption-name")), a.$previewContainer = V(i, "elPreviewContainer", a.$container.find(".file-preview")), a.$preview = V(i, "elPreviewImage", a.$container.find(".file-preview-thumbnails")), a.$previewStatus = V(i, "elPreviewStatus", a.$container.find(".file-preview-status")), a.$errorContainer = V(i, "elErrorContainer", a.$previewContainer.find(".kv-fileinput-error")), W(a.msgErrorClass) || d(a.$errorContainer, a.msgErrorClass), a.$errorContainer.hide(), a.fileActionSettings = e.extend(f, i.fileActionSettings), a.previewInitId = "preview-" + K(), a.id = a.$element.attr("id"), r.init(a), a.initPreview(!0), a.initPreviewDeletes(), a.options = i, a.setFileDropZoneTitle(), a.$element.removeClass("file-loading"), a.$element.attr("disabled") && a.disable()
        },
        parseError: function(i, t, a) {
            var r = this,
                n = e.trim(t + ""),
                l = "." === n.slice(-1) ? "" : ".",
                o = void 0 !== i.responseJSON && void 0 !== i.responseJSON.error ? i.responseJSON.error : i.responseText;
            return r.cancelling && r.msgUploadAborted && (n = r.msgUploadAborted), r.showAjaxErrorDetails && o ? (o = e.trim(o.replace(/\n\s*\n/g, "\n")), o = o.length > 0 ? "<pre>" + o + "</pre>" : "", n += l + o) : n += l, r.cancelling = !1, a ? "<b>" + a + ": </b>" + n : n
        },
        raise: function(i, t) {
            var a = this,
                r = e.Event(i);
            if (void 0 !== t ? a.$element.trigger(r, t) : a.$element.trigger(r), r.isDefaultPrevented()) return !1;
            if (!r.result) return r.result;
            switch (i) {
                case "filebatchuploadcomplete":
                case "filebatchuploadsuccess":
                case "fileuploaded":
                case "fileclear":
                case "filecleared":
                case "filereset":
                case "fileerror":
                case "filefoldererror":
                case "fileuploaderror":
                case "filebatchuploaderror":
                case "filedeleteerror":
                case "filecustomerror":
                case "filesuccessremove":
                    break;
                default:
                    a.ajaxAborted = r.result
            }
            return !0
        },
        getLayoutTemplate: function(e) {
            var i = this,
                t = _(e, i.layoutTemplates) ? i.layoutTemplates[e] : M[e];
            return W(i.customLayoutTags) ? t : J(t, i.customLayoutTags)
        },
        getPreviewTemplate: function(e) {
            var i = this,
                t = _(e, i.previewTemplates) ? i.previewTemplates[e] : B[e];
            return W(i.customPreviewTags) ? t : J(t, i.customPreviewTags)
        },
        parseFilePreviewIcon: function(i, t) {
            var a, r = this,
                n = r.previewFileIcon;
            return t && t.indexOf(".") > -1 && (a = t.split(".").pop(), r.previewFileIconSettings && r.previewFileIconSettings[a] && (n = r.previewFileIconSettings[a]), r.previewFileExtSettings && e.each(r.previewFileExtSettings, function(e, i) {
                r.previewFileIconSettings[e] && i(a) && (n = r.previewFileIconSettings[e])
            })), i.indexOf("{previewFileIcon}") > -1 ? i.replace(/\{previewFileIconClass}/g, r.previewFileIconClass).replace(/\{previewFileIcon}/g, n) : i
        },
        getOutData: function(e, i, t) {
            var a = this;
            return e = e || {}, i = i || {}, t = t || a.filestack.slice(0) || {}, {
                form: a.formdata,
                files: t,
                filenames: a.filenames,
                extra: a.getExtraData(),
                response: i,
                reader: a.reader,
                jqXHR: e
            }
        },
        listen: function() {
            var i = this,
                t = i.$element,
                r = i.$captionContainer,
                n = i.$btnFile,
                l = t.closest("form"),
                o = i.$container;
            a(t, "change", e.proxy(i.change, i)), a(n, "click", function() {
                i.raise("filebrowse"), i.isError && !i.isUploadable && i.clear(), r.focus()
            }), a(l, "reset", e.proxy(i.reset, i)), a(o.find(".fileinput-remove:not([disabled])"), "click", e.proxy(i.clear, i)), a(o.find(".fileinput-cancel"), "click", e.proxy(i.cancel, i)), i.isUploadable && i.dropZoneEnabled && i.showPreview && i.initDragDrop(), i.isUploadable || a(l, "submit", e.proxy(i.submitForm, i)), a(i.$container.find(".fileinput-upload"), "click", function(t) {
                var a, r = e(this),
                    n = !r.hasClass("disabled") && W(r.attr("disabled"));
                return i.isUploadable ? (t.preventDefault(), void(n && i.upload())) : void(n && "submit" !== r.attr("type") && (a = r.closest("form"), a.length && a.trigger("submit"), t.preventDefault()))
            })
        },
        submitForm: function() {
            var e = this,
                i = e.$element,
                t = i.get(0).files;
            return t && e.minFileCount > 0 && e.getFileCount(t.length) < e.minFileCount ? (e.noFilesError({}), !1) : !e.abort({})
        },
        abort: function(i) {
            var t, a = this;
            return a.ajaxAborted && "object" == typeof a.ajaxAborted && void 0 !== a.ajaxAborted.message ? (t = e.extend(a.getOutData(), i), t.abortData = a.ajaxAborted.data || {}, t.abortMessage = a.ajaxAborted.message, a.cancel(), a.setProgress(100), a.showUploadError(a.ajaxAborted.message, t, "filecustomerror"), !0) : !1
        },
        noFilesError: function(e) {
            var i = this,
                t = i.minFileCount > 1 ? i.filePlural : i.fileSingle,
                a = i.msgFilesTooLess.replace("{n}", i.minFileCount).replace("{files}", t),
                r = i.$errorContainer;
            i.addError(a), i.isError = !0, i.updateFileDetails(0), r.fadeIn(800), i.raise("fileerror", [e]), i.clearFileInput(), d(i.$container, "has-error")
        },
        setProgress: function(e, i) {
            var t = this,
                a = Math.min(e, 100),
                r = 100 > a ? t.progressTemplate : t.progressCompleteTemplate;
            i = i || t.$progress, W(r) || i.html(r.replace(/\{percent}/g, a))
        },
        lock: function() {
            var e = this;
            e.resetErrors(), e.disable(), e.showRemove && d(e.$container.find(".fileinput-remove"), "hide"), e.showCancel && e.$container.find(".fileinput-cancel").removeClass("hide"), e.raise("filelock", [e.filestack, e.getExtraData()])
        },
        unlock: function(e) {
            var i = this;
            void 0 === e && (e = !0), i.enable(), i.showCancel && d(i.$container.find(".fileinput-cancel"), "hide"), i.showRemove && i.$container.find(".fileinput-remove").removeClass("hide"), e && i.resetFileStack(), i.raise("fileunlock", [i.filestack, i.getExtraData()])
        },
        resetFileStack: function() {
            var i = this,
                t = 0,
                a = [],
                r = [];
            i.getThumbs().each(function() {
                var n = e(this),
                    l = n.attr("data-fileindex"),
                    o = i.filestack[l]; - 1 !== l && (void 0 !== o ? (a[t] = o, r[t] = i.getFileName(o), n.attr({
                    id: i.previewInitId + "-" + t,
                    "data-fileindex": t
                }), t++) : n.attr({
                    id: "uploaded-" + K(),
                    "data-fileindex": "-1"
                }))
            }), i.filestack = a, i.filenames = r
        },
        destroy: function() {
            var e = this,
                i = e.$container;
            i.find(".file-drop-zone").off(), e.$element.insertBefore(i).off(".fileinput").removeData(), i.off().remove()
        },
        refresh: function(i) {
            var t = this,
                a = t.$element;
            i = i ? e.extend(t.options, i) : t.options, t.destroy(), a.fileinput(i), a.val() && a.trigger("change.fileinput")
        },
        initDragDrop: function() {
            var i = this,
                t = i.$container.find(".file-drop-zone"),
                r = "dragenter.fileinput dragover.fileinput drop.fileinput";
            a(t, "dragenter.fileinput dragover.fileinput", function(t) {
                var a = e.inArray("Files", t.originalEvent.dataTransfer.types) > -1;
                return t.stopPropagation(), t.preventDefault(), i.isDisabled || !a ? (t.originalEvent.dataTransfer.effectAllowed = "none", void(t.originalEvent.dataTransfer.dropEffect = "none")) : void d(e(this), "file-highlighted")
            }, !0), a(t, "dragleave", function(t) {
                t.stopPropagation(), t.preventDefault(), i.isDisabled || e(this).removeClass("file-highlighted")
            }), a(t, "drop", function(t) {
                t.preventDefault(), i.isDisabled || W(t.originalEvent.dataTransfer.files) || (i.change(t, "dragdrop"), e(this).removeClass("file-highlighted"))
            }), a(e(document), r, function(e) {
                e.stopPropagation(), e.preventDefault()
            }, !0)
        },
        setFileDropZoneTitle: function() {
            var e = this,
                i = e.$container.find(".file-drop-zone");
            i.find("." + e.dropZoneTitleClass).remove(), e.isUploadable && e.showPreview && 0 !== i.length && !(e.getFileStack().length > 0) && e.dropZoneEnabled && (0 === i.find(".file-preview-frame").length && W(e.defaultPreviewContent) && i.prepend('<div class="' + e.dropZoneTitleClass + '">' + e.dropZoneTitle + "</div>"), e.$container.removeClass("file-input-new"), d(e.$container, "file-input-ajax-new"))
        },
        errorsExist: function() {
            var i, t = this;
            return t.$errorContainer.find("li").length ? !0 : (i = e(document.createElement("div")).html(t.$errorContainer.html()), i.find("span.kv-error-close").remove(), i.find("ul").remove(), e.trim(i.text()).length ? !0 : !1)
        },
        getMsgSelected: function(e) {
            var i = this,
                t = 1 === e ? i.fileSingle : i.filePlural;
            return i.msgSelected.replace("{n}", e).replace("{files}", t)
        },
        renderThumbProgress: function() {
            return '<div class="file-thumb-progress hide">' + this.progressTemplate.replace(/\{percent}/g, "0") + "</div>"
        },
        renderFileFooter: function(e, i) {
            var t, a, r = this,
                n = r.fileActionSettings,
                l = r.getLayoutTemplate("footer");
            return r.isUploadable ? (t = l.replace(/\{actions}/g, r.renderFileActions(!0, !0, !1, !1, !1)), a = t.replace(/\{caption}/g, e).replace(/\{width}/g, i).replace(/\{progress}/g, r.renderThumbProgress()).replace(/\{indicator}/g, n.indicatorNew).replace(/\{indicatorTitle}/g, n.indicatorNewTitle)) : a = l.replace(/\{actions}/g, "").replace(/\{caption}/g, e).replace(/\{progress}/g, "").replace(/\{width}/g, i).replace(/\{indicator}/g, "").replace(/\{indicatorTitle}/g, ""), a = J(a, r.previewThumbTags)
        },
        renderFileActions: function(e, i, t, a, r) {
            if (!e && !i) return "";
            var n = this,
                l = a === !1 ? "" : ' data-url="' + a + '"',
                o = r === !1 ? "" : ' data-key="' + r + '"',
                s = n.getLayoutTemplate("actionDelete"),
                d = "",
                c = n.getLayoutTemplate("actions"),
                p = n.otherActionButtons.replace(/\{dataKey}/g, o),
                u = n.fileActionSettings,
                f = t ? u.removeClass + " disabled" : u.removeClass;
            return s = s.replace(/\{removeClass}/g, f).replace(/\{removeIcon}/g, u.removeIcon).replace(/\{removeTitle}/g, u.removeTitle).replace(/\{dataUrl}/g, l).replace(/\{dataKey}/g, o), e && (d = n.getLayoutTemplate("actionUpload").replace(/\{uploadClass}/g, u.uploadClass).replace(/\{uploadIcon}/g, u.uploadIcon).replace(/\{uploadTitle}/g, u.uploadTitle)), c.replace(/\{delete}/g, s).replace(/\{upload}/g, d).replace(/\{other}/g, p)
        },
        setThumbStatus: function(e, i) {
            var t = this;
            if (t.showPreview) {
                var a = "indicator" + i,
                    r = a + "Title",
                    n = "file-preview-" + i.toLowerCase(),
                    l = e.find(".file-upload-indicator"),
                    o = t.fileActionSettings;
                e.removeClass("file-preview-success file-preview-error file-preview-loading"), "Error" === i && e.find(".kv-file-upload").attr("disabled", !0), l.html(o[a]), l.attr("title", o[r]), e.addClass(n)
            }
        },
        clearPreview: function() {
            var e = this,
                i = e.$preview.find(e.showUploadedThumbs ? ".file-preview-frame:not(.file-preview-success)" : ".file-preview-frame");
            i.remove(), e.$preview.find(".file-preview-frame").length && e.showPreview || e.resetUpload(), e.validateDefaultPreview()
        },
        initPreview: function(e) {
            var i, t = this,
                a = t.initialCaption || "";
            return r.count(t.id) ? (i = r.out(t.id), a = e && t.initialCaption ? t.initialCaption : i.caption, t.$preview.html(i.content), t.setCaption(a), void(W(i.content) || t.$container.removeClass("file-input-new"))) : (t.clearPreview(), void(e ? t.setCaption(a) : t.initCaption()))
        },
        initPreviewDeletes: function() {
            var i = this,
                t = i.deleteExtraData || {},
                n = function() {
                    var e = i.isUploadable ? r.count(i.id) : i.$element.get(0).files.length;
                    0 !== i.$preview.find(".kv-file-remove").length || e || (i.reset(), i.initialCaption = "")
                };
            i.$preview.find(".kv-file-remove").each(function() {
                var l = e(this),
                    o = l.data("url") || i.deleteUrl,
                    s = l.data("key");
                if (!W(o) && void 0 !== s) {
                    var c, p, u, f, v = l.closest(".file-preview-frame"),
                        g = r.data[i.id],
                        m = v.data("fileindex");
                    m = parseInt(m.replace("init_", "")), u = W(g.config) && W(g.config[m]) ? null : g.config[m], f = W(u) || W(u.extra) ? t : u.extra, "function" == typeof f && (f = f()), p = {
                        id: l.attr("id"),
                        key: s,
                        extra: f
                    }, c = e.extend({
                        url: o,
                        type: "POST",
                        dataType: "json",
                        data: e.extend({
                            key: s
                        }, f),
                        beforeSend: function(e) {
                            i.ajaxAborted = !1, i.raise("filepredelete", [s, e, f]), i.ajaxAborted ? e.abort() : (d(v, "file-uploading"), d(l, "disabled"))
                        },
                        success: function(e, t, a) {
                            var o, d;
                            return W(e) || W(e.error) ? (r.unset(i.id, m), o = r.count(i.id), d = o > 0 ? i.getMsgSelected(o) : "", i.raise("filedeleted", [s, a, f]), i.setCaption(d), v.removeClass("file-uploading").addClass("file-deleted"), void v.fadeOut("slow", function() {
                                i.clearObjects(v), v.remove(), n(), o || 0 !== i.getFileStack().length || (i.setCaption(""), i.reset())
                            })) : (p.jqXHR = a, p.response = e, i.showError(e.error, p, "filedeleteerror"), v.removeClass("file-uploading"), l.removeClass("disabled"), void n())
                        },
                        error: function(e, t, a) {
                            var r = i.parseError(e, a);
                            p.jqXHR = e, p.response = {}, i.showError(r, p, "filedeleteerror"), v.removeClass("file-uploading"), n()
                        }
                    }, i.ajaxDeleteSettings), a(l, "click", function() {
                        return i.validateMinCount() ? void e.ajax(c) : !1
                    })
                }
            })
        },
        clearObjects: function(i) {
            i.find("video audio").each(function() {
                this.pause(), e(this).remove()
            }), i.find("img object div").each(function() {
                e(this).remove()
            })
        },
        clearFileInput: function() {
            var i, t, a, r = this,
                n = r.$element;
            W(n.val()) || (r.isIE9 || r.isIE10 ? (i = n.closest("form"), t = e(document.createElement("form")), a = e(document.createElement("div")), n.before(a), i.length ? i.after(t) : a.after(t), t.append(n).trigger("reset"), a.before(n).remove(), t.remove()) : n.val(""), r.fileInputCleared = !0)
        },
        resetUpload: function() {
            var e = this;
            e.uploadCache = {
                content: [],
                config: [],
                tags: [],
                append: !0
            }, e.uploadCount = 0, e.uploadStatus = {}, e.uploadLog = [], e.uploadAsyncCount = 0, e.loadedImages = [], e.totalImagesCount = 0, e.$btnUpload.removeAttr("disabled"), e.setProgress(0), d(e.$progress, "hide"), e.resetErrors(!1), e.ajaxAborted = !1, e.ajaxRequests = [], e.resetCanvas()
        },
        resetCanvas: function() {
            var e = this;
            e.canvas && e.imageCanvasContext && e.imageCanvasContext.clearRect(0, 0, e.canvas.width, e.canvas.height)
        },
        cancel: function() {
            var i, t = this,
                a = t.ajaxRequests,
                r = a.length;
            if (r > 0)
                for (i = 0; r > i; i += 1) t.cancelling = !0, a[i].abort();
            t.getThumbs().each(function() {
                var i = e(this),
                    a = i.attr("data-fileindex");
                i.removeClass("file-uploading"), void 0 !== t.filestack[a] && (i.find(".kv-file-upload").removeClass("disabled").removeAttr("disabled"), i.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")), t.unlock()
            })
        },
        cleanMemory: function(e) {
            var i = e.is("img") ? e.attr("src") : e.find("source").attr("src");
            Q.revokeObjectURL(i)
        },
        hasInitialPreview: function() {
            var e = this;
            return !e.overwriteInitial && r.count(e.id)
        },
        clear: function() {
            var i, t = this;
            t.$btnUpload.removeAttr("disabled"), t.getThumbs().find("video,audio,img").each(function() {
                t.cleanMemory(e(this))
            }), t.resetUpload(), t.clearStack(), t.clearFileInput(), t.resetErrors(!0), t.raise("fileclear"), t.hasInitialPreview() ? (t.showFileIcon(), t.resetPreview(), t.initPreviewDeletes(), t.$container.removeClass("file-input-new")) : (t.getThumbs().each(function() {
                t.clearObjects(e(this))
            }), t.isUploadable && (r.data[t.id] = {}), t.$preview.html(""), i = !t.overwriteInitial && t.initialCaption.length > 0 ? t.initialCaption : "", t.setCaption(i), t.$caption.attr("title", ""), d(t.$container, "file-input-new"), t.validateDefaultPreview()), 0 === t.$container.find(".file-preview-frame").length && (t.initCaption() || t.$captionContainer.find(".kv-caption-icon").hide()), t.hideFileIcon(), t.raise("filecleared"), t.$captionContainer.focus(), t.setFileDropZoneTitle()
        },
        resetPreview: function() {
            var e, i, t = this;
            r.count(t.id) ? (e = r.out(t.id), t.$preview.html(e.content), i = t.initialCaption ? t.initialCaption : e.caption, t.setCaption(i)) : (t.clearPreview(), t.initCaption())
        },
        clearDefaultPreview: function() {
            var e = this;
            e.$preview.find(".file-default-preview").remove()
        },
        validateDefaultPreview: function() {
            var e = this;
            e.showPreview && !W(e.defaultPreviewContent) && (e.$preview.html('<div class="file-default-preview">' + e.defaultPreviewContent + "</div>"), e.$container.removeClass("file-input-new"))
        },
        resetPreviewThumbs: function(e) {
            var i, t = this;
            return e ? (t.clearPreview(), void t.clearStack()) : void(t.hasInitialPreview() ? (i = r.out(t.id), t.$preview.html(i.content), t.setCaption(i.caption), t.initPreviewDeletes()) : t.clearPreview())
        },
        reset: function() {
            var e = this;
            e.resetPreview(), e.$container.find(".fileinput-filename").text(""), e.raise("filereset"), d(e.$container, "file-input-new"), (e.$preview.find(".file-preview-frame").length || e.isUploadable && e.dropZoneEnabled) && e.$container.removeClass("file-input-new"), e.setFileDropZoneTitle(), e.clearStack(), e.formdata = {}
        },
        disable: function() {
            var e = this;
            e.isDisabled = !0, e.raise("filedisabled"), e.$element.attr("disabled", "disabled"), e.$container.find(".kv-fileinput-caption").addClass("file-caption-disabled"), e.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").attr("disabled", !0), e.initDragDrop()
        },
        enable: function() {
            var e = this;
            e.isDisabled = !1, e.raise("fileenabled"), e.$element.removeAttr("disabled"), e.$container.find(".kv-fileinput-caption").removeClass("file-caption-disabled"), e.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").removeAttr("disabled"), e.initDragDrop()
        },
        getThumbs: function(e) {
            return e = e || "", this.$preview.find(".file-preview-frame:not(.file-preview-initial)" + e)
        },
        getExtraData: function(e, i) {
            var t = this,
                a = t.uploadExtraData;
            return "function" == typeof t.uploadExtraData && (a = t.uploadExtraData(e, i)), a
        },
        uploadExtra: function(i, t) {
            var a = this,
                r = a.getExtraData(i, t);
            0 !== r.length && e.each(r, function(e, i) {
                a.formdata.append(e, i)
            })
        },
        setAsyncUploadStatus: function(i, t, a) {
            var r = this,
                n = 0;
            r.setProgress(t, e("#" + i).find(".file-thumb-progress")), r.uploadStatus[i] = t, e.each(r.uploadStatus, function(e, i) {
                n += i
            }), r.setProgress(Math.ceil(n / a))
        },
        initXhr: function(e, i, t) {
            var a = this;
            return e.upload && e.upload.addEventListener("progress", function(e) {
                var r = 0,
                    n = e.loaded || e.position,
                    l = e.total;
                e.lengthComputable && (r = Math.ceil(n / l * 100)), i ? a.setAsyncUploadStatus(i, r, t) : a.setProgress(Math.ceil(r))
            }, !1), e
        },
        ajaxSubmit: function(i, t, a, r, n, l) {
            var o, s = this;
            s.raise("filepreajax", [n, l]), s.uploadExtra(n, l), o = e.extend({
                xhr: function() {
                    var i = e.ajaxSettings.xhr();
                    return s.initXhr(i, n, s.getFileStack().length)
                },
                url: s.uploadUrl,
                type: "POST",
                dataType: "json",
                data: s.formdata,
                cache: !1,
                processData: !1,
                contentType: !1,
                beforeSend: i,
                success: t,
                complete: a,
                error: r
            }, s.ajaxSettings), s.ajaxRequests.push(e.ajax(o))
        },
        initUploadSuccess: function(i, t, a) {
            var n, l, o, s, d, c, p, u, f = this;
            f.showPreview && "object" == typeof i && !e.isEmptyObject(i) && void 0 !== i.initialPreview && i.initialPreview.length > 0 && (f.hasInitData = !0, d = i.initialPreview || [], c = i.initialPreviewConfig || [], p = i.initialPreviewThumbTags || [], n = void 0 === i.append || i.append ? !0 : !1, f.overwriteInitial = !1, void 0 !== t ? a ? (u = t.attr("data-fileindex"), f.uploadCache.content[u] = d[0], f.uploadCache.config[u] = c[0], f.uploadCache.tags[u] = p[0], f.uploadCache.append = n) : (o = r.add(f.id, d, c[0], p[0], n), l = r.get(f.id, o, !1), s = e(l).hide(), t.after(s).fadeOut("slow", function() {
                s.fadeIn("slow").css("display:inline-block"), f.initPreviewDeletes(), f.clearFileInput(), t.remove()
            })) : (r.set(f.id, d, c, p, n), f.initPreview(), f.initPreviewDeletes()))
        },
        initSuccessThumbs: function() {
            var i = this;
            i.showPreview && i.getThumbs(".file-preview-success").each(function() {
                var t = e(this),
                    r = t.find(".kv-file-remove");
                r.removeAttr("disabled"), a(r, "click", function() {
                    var e = i.raise("filesuccessremove", [t.attr("id"), t.data("fileindex")]);
                    i.cleanMemory(t), e !== !1 && t.fadeOut("slow", function() {
                        t.remove(), i.$preview.find(".file-preview-frame").length || i.reset()
                    })
                })
            })
        },
        checkAsyncComplete: function() {
            var i, t, a = this;
            for (t = 0; t < a.filestack.length; t++)
                if (a.filestack[t] && (i = a.previewInitId + "-" + t, -1 === e.inArray(i, a.uploadLog))) return !1;
            return a.uploadAsyncCount === a.uploadLog.length
        },
        uploadSingle: function(i, t, a) {
            var n, l, o, s, c, p, u, f, v, g, m = this,
                h = m.getFileStack().length,
                w = new FormData,
                b = m.previewInitId + "-" + i,
                C = m.filestack.length > 0 || !e.isEmptyObject(m.uploadExtraData),
                x = {
                    id: b,
                    index: i
                };
            m.formdata = w, m.showPreview && (l = e("#" + b + ":not(.file-preview-initial)"), s = l.find(".kv-file-upload"), c = l.find(".kv-file-remove"), e("#" + b).find(".file-thumb-progress").removeClass("hide")), 0 === h || !C || s && s.hasClass("disabled") || m.abort(x) || (g = function(e, i) {
                m.updateStack(e, void 0), m.uploadLog.push(i), m.checkAsyncComplete() && (m.fileBatchCompleted = !0)
            }, o = function() {
                m.fileBatchCompleted && setTimeout(function() {
                    m.showPreview && (r.set(m.id, m.uploadCache.content, m.uploadCache.config, m.uploadCache.tags, m.uploadCache.append), m.hasInitData && (m.initPreview(), m.initPreviewDeletes())), m.unlock(), m.clearFileInput(), m.raise("filebatchuploadcomplete", [m.filestack, m.getExtraData()]), m.uploadCount = 0, m.uploadStatus = {}, m.uploadLog = [], m.setProgress(100)
                }, 100)
            }, p = function(t) {
                n = m.getOutData(t), m.fileBatchCompleted = !1, m.showPreview && (l.hasClass("file-preview-success") || (m.setThumbStatus(l, "Loading"), d(l, "file-uploading")), s.attr("disabled", !0), c.attr("disabled", !0)), a || m.lock(), m.raise("filepreupload", [n, b, i]), x = e.extend(x, n), m.abort(x) && (t.abort(), m.setProgress(100))
            }, u = function(t, r, o) {
                n = m.getOutData(o, t), x = e.extend(x, n), setTimeout(function() {
                    W(t) || W(t.error) ? (m.showPreview && (m.setThumbStatus(l, "Success"), s.hide(), m.initUploadSuccess(t, l, a)), m.raise("fileuploaded", [n, b, i]), a ? g(i, b) : m.updateStack(i, void 0)) : (m.setThumbStatus(l, "Error"), m.showUploadError(t.error, x), a && g(i, b))
                }, 100)
            }, f = function() {
                setTimeout(function() {
                    m.showPreview && (s.removeAttr("disabled"), c.removeAttr("disabled"), l.removeClass("file-uploading")), a ? o() : (m.unlock(!1), m.clearFileInput()), m.initSuccessThumbs()
                }, 100)
            }, v = function(r, n, o) {
                var s = m.parseError(r, o, a ? t[i].name : null);
                setTimeout(function() {
                    a && g(i, b), m.uploadStatus[b] = 100, m.setThumbStatus(l, "Error"), x = e.extend(x, m.getOutData(r)), m.showUploadError(s, x)
                }, 100)
            }, w.append(m.uploadFileAttr, t[i], m.filenames[i]), w.append("file_id", i), m.ajaxSubmit(p, u, f, v, b, i))
        },
        uploadBatch: function() {
            var i, t, a, r, n, l = this,
                o = l.filestack,
                s = o.length,
                c = {},
                p = l.filestack.length > 0 || !e.isEmptyObject(l.uploadExtraData);
            l.formdata = new FormData, 0 !== s && p && !l.abort(c) && (i = function() {
                e.each(o, function(e) {
                    l.updateStack(e, void 0)
                }), l.clearFileInput()
            }, t = function(i) {
                l.lock();
                var t = l.getOutData(i);
                l.showPreview && l.getThumbs().each(function() {
                    var i = e(this),
                        t = i.find(".kv-file-upload"),
                        a = i.find(".kv-file-remove");
                    i.hasClass("file-preview-success") || (l.setThumbStatus(i, "Loading"), d(i, "file-uploading")), t.attr("disabled", !0), a.attr("disabled", !0)
                }), l.raise("filebatchpreupload", [t]), l.abort(t) && (i.abort(), l.setProgress(100))
            }, a = function(t, a, r) {
                var n = l.getOutData(r, t),
                    o = l.getThumbs(),
                    s = 0,
                    d = W(t) || W(t.errorkeys) ? [] : t.errorkeys;
                W(t) || W(t.error) ? (l.raise("filebatchuploadsuccess", [n]), i(), l.showPreview ? (o.each(function() {
                    var i = e(this),
                        t = i.find(".kv-file-upload");
                    i.find(".kv-file-upload").hide(), l.setThumbStatus(i, "Success"), i.removeClass("file-uploading"), t.removeAttr("disabled")
                }), l.initUploadSuccess(t)) : l.reset()) : (l.showPreview && (o.each(function() {
                    var i = e(this),
                        t = i.find(".kv-file-remove"),
                        a = i.find(".kv-file-upload");
                    return i.removeClass("file-uploading"), a.removeAttr("disabled"), t.removeAttr("disabled"), 0 === d.length ? void l.setThumbStatus(i, "Error") : (-1 !== e.inArray(s, d) ? l.setThumbStatus(i, "Error") : (i.find(".kv-file-upload").hide(), l.setThumbStatus(i, "Success"), l.updateStack(s, void 0)), void s++)
                }), l.initUploadSuccess(t)), l.showUploadError(t.error, n, "filebatchuploaderror"))
            }, r = function() {
                l.setProgress(100), l.unlock(), l.initSuccessThumbs(), l.clearFileInput(), l.raise("filebatchuploadcomplete", [l.filestack, l.getExtraData()])
            }, n = function(i, t, a) {
                var r = l.getOutData(i),
                    n = l.parseError(i, a);
                l.showUploadError(n, r, "filebatchuploaderror"), l.uploadFileCount = s - 1, l.showPreview && (l.getThumbs().each(function() {
                    var i = e(this),
                        t = i.attr("data-fileindex");
                    i.removeClass("file-uploading"), void 0 !== l.filestack[t] && l.setThumbStatus(i, "Error")
                }), l.getThumbs().removeClass("file-uploading"), l.getThumbs(" .kv-file-upload").removeAttr("disabled"), l.getThumbs(" .kv-file-delete").removeAttr("disabled"))
            }, e.each(o, function(e, i) {
                W(o[e]) || l.formdata.append(l.uploadFileAttr, i, l.filenames[e])
            }), l.ajaxSubmit(t, a, r, n))
        },
        uploadExtraOnly: function() {
            var e, i, t, a, r = this,
                n = {};
            r.formdata = new FormData, r.abort(n) || (e = function(e) {
                r.lock();
                var i = r.getOutData(e);
                r.raise("filebatchpreupload", [i]), r.setProgress(50), n.data = i, n.xhr = e, r.abort(n) && (e.abort(), r.setProgress(100))
            }, i = function(e, i, t) {
                var a = r.getOutData(t, e);
                W(e) || W(e.error) ? (r.raise("filebatchuploadsuccess", [a]), r.clearFileInput(), r.initUploadSuccess(e)) : r.showUploadError(e.error, a, "filebatchuploaderror")
            }, t = function() {
                r.setProgress(100), r.unlock(), r.clearFileInput(), r.raise("filebatchuploadcomplete", [r.filestack, r.getExtraData()])
            }, a = function(e, i, t) {
                var a = r.getOutData(e),
                    l = r.parseError(e, t);
                n.data = a, r.showUploadError(l, a, "filebatchuploaderror")
            }, r.ajaxSubmit(e, i, t, a))
        },
        upload: function() {
            var i, t, a, r = this,
                n = r.getFileStack().length,
                l = {},
                o = !e.isEmptyObject(r.getExtraData());
            if (r.minFileCount > 0 && r.getFileCount(n) < r.minFileCount) return void r.noFilesError(l);
            if (r.isUploadable && !r.isDisabled && (0 !== n || o)) {
                if (r.resetUpload(), r.$progress.removeClass("hide"), r.uploadCount = 0, r.uploadStatus = {}, r.uploadLog = [], r.lock(), r.setProgress(2), 0 === n && o) return void r.uploadExtraOnly();
                if (a = r.filestack.length, r.hasInitData = !1, r.uploadAsync) {
                    for (t = r.getOutData(), r.raise("filebatchpreupload", [t]), r.fileBatchCompleted = !1, r.uploadCache = {
                            content: [],
                            config: [],
                            tags: [],
                            append: !0
                        }, r.uploadAsyncCount = r.getFileStack().length, i = 0; a > i; i++) r.uploadCache.content[i] = null, r.uploadCache.config[i] = null, r.uploadCache.tags[i] = null;
                    for (i = 0; a > i; i++) void 0 !== r.filestack[i] && r.uploadSingle(i, r.filestack, !0)
                } else r.uploadBatch()
            }
        },
        initFileActions: function() {
            var i = this;
            i.showPreview && (i.$preview.find(".kv-file-remove").each(function() {
                var t, n, l, o, s = e(this),
                    d = s.closest(".file-preview-frame"),
                    c = d.attr("id"),
                    p = d.attr("data-fileindex");
                a(s, "click", function() {
                    return o = i.raise("filepreremove", [c, p]), o !== !1 && i.validateMinCount() ? (t = d.hasClass("file-preview-error"), i.cleanMemory(d), void d.fadeOut("slow", function() {
                        i.updateStack(p, void 0), i.clearObjects(d), d.remove(), c && t && i.$errorContainer.find('li[data-file-id="' + c + '"]').fadeOut("fast", function() {
                            e(this).remove(), i.errorsExist() || i.resetErrors()
                        });
                        var a = i.getFileStack(!0),
                            o = a.length,
                            s = r.count(i.id),
                            u = i.showPreview && i.$preview.find(".file-preview-frame").length;
                        i.clearFileInput(), 0 !== o || 0 !== s || u ? (n = s + o, l = n > 1 ? i.getMsgSelected(n) : a[0] ? i.getFileNames()[0] : "", i.setCaption(l)) : i.reset(), i.raise("fileremoved", [c, p])
                    })) : !1
                })
            }), i.$preview.find(".kv-file-upload").each(function() {
                var t = e(this);
                a(t, "click", function() {
                    var e = t.closest(".file-preview-frame"),
                        a = e.attr("data-fileindex");
                    e.hasClass("file-preview-error") || i.uploadSingle(a, i.filestack, !1)
                })
            }))
        },
        hideFileIcon: function() {
            this.overwriteInitial && this.$captionContainer.find(".kv-caption-icon").hide()
        },
        showFileIcon: function() {
            this.$captionContainer.find(".kv-caption-icon").show()
        },
        addError: function(e) {
            var i = this,
                t = i.$errorContainer;
            e && t.length && (t.html(i.errorCloseButton + e), t.find(".kv-error-close").off("click").on("click", function() {
                t.fadeOut("slow")
            }))
        },
        resetErrors: function(e) {
            var i = this,
                t = i.$errorContainer;
            i.isError = !1, i.$container.removeClass("has-error"), t.html(""), e ? t.fadeOut("slow") : t.hide()
        },
        showFolderError: function(e) {
            var i = this,
                t = i.$errorContainer;
            e && (i.addError(i.msgFoldersNotAllowed.replace(/\{n}/g, e)), t.fadeIn(800), d(i.$container, "has-error"), i.raise("filefoldererror", [e]))
        },
        showUploadError: function(e, i, t) {
            var a = this,
                r = a.$errorContainer,
                n = t || "fileuploaderror",
                l = i && i.id ? '<li data-file-id="' + i.id + '">' + e + "</li>" : "<li>" + e + "</li>";
            return 0 === r.find("ul").length ? a.addError("<ul>" + l + "</ul>") : r.find("ul").append(l), r.fadeIn(800), a.raise(n, [i]), a.$container.removeClass("file-input-new"), d(a.$container, "has-error"), !0
        },
        showError: function(e, i, t) {
            var a = this,
                r = a.$errorContainer,
                n = t || "fileerror";
            return i = i || {}, i.reader = a.reader, a.addError(e), r.fadeIn(800), a.raise(n, [i]), a.isUploadable || a.clearFileInput(), a.$container.removeClass("file-input-new"), d(a.$container, "has-error"), a.$btnUpload.attr("disabled", !0), !0
        },
        errorHandler: function(e, i) {
            var t = this,
                a = e.target.error;
            t.showError(a.code === a.NOT_FOUND_ERR ? t.msgFileNotFound.replace("{name}", i) : a.code === a.SECURITY_ERR ? t.msgFileSecured.replace("{name}", i) : a.code === a.NOT_READABLE_ERR ? t.msgFileNotReadable.replace("{name}", i) : a.code === a.ABORT_ERR ? t.msgFilePreviewAborted.replace("{name}", i) : t.msgFilePreviewError.replace("{name}", i))
        },
        parseFileType: function(e) {
            var i, t, a, r, n = this;
            for (r = 0; r < N.length; r += 1)
                if (a = N[r], i = _(a, n.fileTypeSettings) ? n.fileTypeSettings[a] : H[a], t = i(e.type, e.name) ? a : "", !W(t)) return t;
            return "other"
        },
        previewDefault: function(i, t, a) {
            if (this.showPreview) {
                var r = this,
                    n = "",
                    l = i ? i.name : "",
                    o = Q.createObjectURL(i),
                    s = t.slice(t.lastIndexOf("-") + 1),
                    d = r.previewSettings.other || Z.other,
                    c = r.renderFileFooter(i.name, d.width),
                    p = r.parseFilePreviewIcon(r.getPreviewTemplate("other"), l);
                a === !0 && (r.isUploadable || (c += '<div class="file-other-error" title="' + r.fileActionSettings.indicatorErrorTitle + '">' + r.fileActionSettings.indicatorError + "</div>")), r.clearDefaultPreview(), r.$preview.append("\n" + p.replace(/\{previewId}/g, t).replace(/\{frameClass}/g, n).replace(/\{fileindex}/g, s).replace(/\{caption}/g, r.slug(i.name)).replace(/\{width}/g, d.width).replace(/\{height}/g, d.height).replace(/\{type}/g, i.type).replace(/\{data}/g, o).replace(/\{footer}/g, c)), a === !0 && r.isUploadable && r.setThumbStatus(e("#" + t), "Error")
            }
        },
        previewFile: function(e, i, t, a, r) {
            if (this.showPreview) {
                var n, l, o, s = this,
                    d = s.parseFileType(i),
                    c = i ? i.name : "",
                    p = s.slug(c),
                    u = s.allowedPreviewTypes,
                    f = s.allowedPreviewMimeTypes,
                    v = s.getPreviewTemplate(d),
                    g = u && u.indexOf(d) >= 0,
                    m = _(d, s.previewSettings) ? s.previewSettings[d] : Z[d],
                    h = f && -1 !== f.indexOf(i.type),
                    w = s.renderFileFooter(p, m.width),
                    b = "",
                    C = a.slice(a.lastIndexOf("-") + 1);
                g || h ? (v = s.parseFilePreviewIcon(v, c.split(".").pop()), "text" === d ? (l = X(t.target.result), o = "text-" + K(), n = v.replace(/\{zoom}/g, s.getLayoutTemplate("zoom")), b = s.getLayoutTemplate("modal").replace("{id}", o).replace(/\{title}/g, p).replace(/\{body}/g, l).replace(/\{heading}/g, s.msgZoomModalHeading), n = n.replace(/\{previewId}/g, a).replace(/\{caption}/g, p).replace(/\{width}/g, m.width).replace(/\{height}/g, m.height).replace(/\{frameClass}/g, "").replace(/\{zoomInd}/g, s.zoomIndicator).replace(/\{footer}/g, w).replace(/\{fileindex}/g, C).replace(/\{type}/g, i.type).replace(/\{zoomTitle}/g, s.msgZoomTitle).replace(/\{dialog}/g, "$('#" + o + "').modal('show')").replace(/\{data}/g, l) + b) : n = v.replace(/\{previewId}/g, a).replace(/\{caption}/g, p).replace(/\{frameClass}/g, "").replace(/\{type}/g, i.type).replace(/\{fileindex}/g, C).replace(/\{width}/g, m.width).replace(/\{height}/g, m.height).replace(/\{footer}/g, w).replace(/\{data}/g, r), s.clearDefaultPreview(), s.$preview.append("\n" + n), s.validateImage(e, a, p, i.type)) : s.previewDefault(i, a)
            }
        },
        slugDefault: function(e) {
            return W(e) ? "" : e.split(/(\\|\/)/g).pop().replace(/[^\w\u00C0-\u017F\-.\\\/ ]+/g, "")
        },
        readFiles: function(i) {
            this.reader = new FileReader;
            var t, a = this,
                r = a.$element,
                n = a.$preview,
                l = a.reader,
                o = a.$previewContainer,
                s = a.$previewStatus,
                d = a.msgLoading,
                c = a.msgProgress,
                p = a.previewInitId,
                u = i.length,
                f = a.fileTypeSettings,
                v = a.filestack.length,
                g = function(r, n, l, o) {
                    var s = e.extend(a.getOutData({}, {}, i), {
                            id: l,
                            index: o
                        }),
                        d = {
                            id: l,
                            index: o,
                            file: n,
                            files: i
                        };
                    return a.previewDefault(n, l, !0), a.isUploadable && a.pushStack(void 0), setTimeout(t(o + 1), 100), a.initFileActions(), a.isUploadable ? a.showUploadError(r, s) : a.showError(r, d)
                };
            a.loadedImages = [], a.totalImagesCount = 0, e.each(i, function(e, i) {
                var t = "image",
                    r = _(t, a.fileTypeSettings) ? a.fileTypeSettings[t] : H[t];
                r && r(i.type) && a.totalImagesCount++
            }), t = function(e) {
                if (W(r.attr("multiple")) && (u = 1), e >= u) return a.isUploadable && a.filestack.length > 0 ? a.raise("filebatchselected", [a.getFileStack()]) : a.raise("filebatchselected", [i]), o.removeClass("file-thumb-loading"), void s.html("");
                var m, h, w, b, C, x, y = v + e,
                    T = p + "-" + y,
                    F = i[e],
                    I = a.slug(F.name),
                    E = (F.size || 0) / 1e3,
                    k = "",
                    S = Q.createObjectURL(F),
                    $ = 0,
                    P = a.allowedFileTypes,
                    D = W(P) ? "" : P.join(", "),
                    U = a.allowedFileExtensions,
                    A = W(U) ? "" : U.join(", ");
                if (W(U) || (k = new RegExp("\\.(" + U.join("|") + ")$", "i")), E = E.toFixed(2), a.maxFileSize > 0 && E > a.maxFileSize) return b = a.msgSizeTooLarge.replace("{name}", I).replace("{size}", E).replace("{maxSize}", a.maxFileSize), void(a.isError = g(b, F, T, e));
                if (!W(P) && q(P)) {
                    for (w = 0; w < P.length; w += 1) C = P[w], h = f[C], x = void 0 !== h && h(F.type, I), $ += W(x) ? 0 : x.length;
                    if (0 === $) return b = a.msgInvalidFileType.replace("{name}", I).replace("{types}", D), void(a.isError = g(b, F, T, e))
                }
                return 0 !== $ || W(U) || !q(U) || W(k) || (x = I.match(k), $ += W(x) ? 0 : x.length, 0 !== $) ? a.showPreview ? (n.length > 0 && void 0 !== FileReader ? (s.html(d.replace("{index}", e + 1).replace("{files}", u)), o.addClass("file-thumb-loading"), l.onerror = function(e) {
                    a.errorHandler(e, I)
                }, l.onload = function(i) {
                    a.previewFile(e, F, i, T, S), a.initFileActions()
                }, l.onloadend = function() {
                    b = c.replace("{index}", e + 1).replace("{files}", u).replace("{percent}", 50).replace("{name}", I), setTimeout(function() {
                        s.html(b), a.updateFileDetails(u), t(e + 1)
                    }, 100), a.raise("fileloaded", [F, T, e, l])
                }, l.onprogress = function(i) {
                    if (i.lengthComputable) {
                        var t = i.loaded / i.total * 100,
                            a = Math.ceil(t);
                        b = c.replace("{index}", e + 1).replace("{files}", u).replace("{percent}", a).replace("{name}", I), setTimeout(function() {
                            s.html(b)
                        }, 100)
                    }
                }, m = _("text", f) ? f.text : H.text, m(F.type, I) ? l.readAsText(F, a.textEncoding) : l.readAsArrayBuffer(F)) : (a.previewDefault(F, T), setTimeout(function() {
                    t(e + 1), a.updateFileDetails(u)
                }, 100), a.raise("fileloaded", [F, T, e, l])), void a.pushStack(F)) : (a.pushStack(F), setTimeout(t(e + 1), 100), void a.raise("fileloaded", [F, T, e, l])) : (b = a.msgInvalidFileExtension.replace("{name}", I).replace("{extensions}", A), void(a.isError = g(b, F, T, e)))
            }, t(0), a.updateFileDetails(u, !1)
        },
        updateFileDetails: function(e) {
            var i = this,
                t = i.$element,
                a = i.getFileStack(),
                n = t.val() || a.length && a[0].name || "",
                l = i.slug(n),
                o = i.isUploadable ? a.length : e,
                s = r.count(i.id) + o,
                d = o > 1 ? i.getMsgSelected(s) : l;
            i.isError ? (i.$previewContainer.removeClass("file-thumb-loading"), i.$previewStatus.html(""), i.$captionContainer.find(".kv-caption-icon").hide()) : i.showFileIcon(), i.setCaption(d, i.isError), i.$container.removeClass("file-input-new file-input-ajax-new"), 1 === arguments.length && i.raise("fileselect", [e, l]), r.count(i.id) && i.initPreviewDeletes()
        },
        validateMinCount: function() {
            var e = this,
                i = e.isUploadable ? e.getFileStack().length : e.$element.get(0).files.length;
            return e.validateInitialCount && e.minFileCount > 0 && e.getFileCount(i - 1) < e.minFileCount ? (e.noFilesError({}), !1) : !0
        },
        getFileCount: function(e) {
            var i = this,
                t = 0;
            return i.validateInitialCount && !i.overwriteInitial && (t = r.count(i.id), e += t), e
        },
        change: function(i) {
            var t = this,
                a = t.$element;
            if (!t.isUploadable && W(a.val()) && t.fileInputCleared) return void(t.fileInputCleared = !1);
            t.fileInputCleared = !1;
            var n, l, o, s, d, c, p = arguments.length > 1,
                u = p ? i.originalEvent.dataTransfer.files : a.get(0).files,
                f = W(a.attr("multiple")),
                v = 0,
                g = 0,
                m = t.filestack.length,
                h = t.isUploadable,
                w = f && m > 0,
                b = function(i, a, r, n) {
                    var l = e.extend(t.getOutData({}, {}, u), {
                            id: r,
                            index: n
                        }),
                        o = {
                            id: r,
                            index: n,
                            file: a,
                            files: u
                        };
                    return t.isUploadable ? t.showUploadError(i, l) : t.showError(i, o)
                };
            if (t.reader = null, t.resetUpload(), t.hideFileIcon(), t.isUploadable && t.$container.find(".file-drop-zone ." + t.dropZoneTitleClass).remove(), p)
                for (n = []; u[v];) s = u[v], s.type || s.size % 4096 !== 0 ? n.push(s) : g++, v++;
            else n = void 0 === i.target.files ? i.target && i.target.value ? [{
                name: i.target.value.replace(/^.+\\/, "")
            }] : [] : i.target.files;
            if (W(n) || 0 === n.length) return h || t.clear(), t.showFolderError(g), void t.raise("fileselectnone");
            if (t.resetErrors(), c = n.length, o = t.isUploadable ? t.getFileStack().length + c : c, o = t.getFileCount(o), t.maxFileCount > 0 && o > t.maxFileCount) {
                if (!t.autoReplace || c > t.maxFileCount) return d = t.autoReplace && c > t.maxFileCount ? c : o, l = t.msgFilesTooMany.replace("{m}", t.maxFileCount).replace("{n}", d), t.isError = b(l, null, null, null), t.$captionContainer.find(".kv-caption-icon").hide(), t.setCaption("", !0), void t.$container.removeClass("file-input-new file-input-ajax-new");
                o > t.maxFileCount && t.resetPreviewThumbs(h)
            } else !h || w ? (t.resetPreviewThumbs(!1), w && t.clearStack()) : !h || 0 !== m || r.count(t.id) && !t.overwriteInitial || t.resetPreviewThumbs(!0);
            t.isPreviewable ? t.readFiles(n) : t.updateFileDetails(1), t.showFolderError(g)
        },
        getFileName: function(e) {
            return e && e.name ? this.slug(e.name) : void 0
        },
        getFileNames: function(e) {
            var i = this;
            return i.filenames.filter(function(i) {
                return e ? void 0 !== i : void 0 !== i && null !== i
            })
        },
        getFileStack: function(e) {
            var i = this;
            return i.filestack.filter(function(i) {
                return e ? void 0 !== i : void 0 !== i && null !== i
            })
        },
        clearStack: function() {
            var e = this;
            e.filestack = [], e.filenames = []
        },
        updateStack: function(e, i) {
            var t = this;
            t.filestack[e] = i, t.filenames[e] = t.getFileName(i)
        },
        pushStack: function(e) {
            var i = this;
            i.filestack.push(e), i.filenames.push(i.getFileName(e))
        },
        checkDimensions: function(e, i, t, a, r, n, l) {
            var o, s, d, c, p = this,
                u = "Small" === i ? "min" : "max",
                f = p[u + "Image" + n];
            !W(f) && t.length && (d = t[0], s = "Width" === n ? d.naturalWidth || d.width : d.naturalHeight || d.height, c = "Small" === i ? s >= f : f >= s, c || (o = p["msgImage" + n + i].replace("{name}", r).replace("{size}", f), p.showUploadError(o, l), p.setThumbStatus(a, "Error"), p.updateStack(e, null)))
        },
        validateImage: function(e, i, t, r) {
            var n, l, o, s = this,
                d = s.$preview,
                c = d.find("#" + i),
                p = c.find("img");
            t = t || "Untitled", p.length && a(p, "load", function() {
                l = c.width(), o = d.width(), l > o && (p.css("width", "100%"), c.css("width", "97%")), n = {
                    ind: e,
                    id: i
                }, s.checkDimensions(e, "Small", p, c, t, "Width", n), s.checkDimensions(e, "Small", p, c, t, "Height", n), s.resizeImage || (s.checkDimensions(e, "Large", p, c, t, "Width", n), s.checkDimensions(e, "Large", p, c, t, "Height", n)), s.raise("fileimageloaded", [i]), s.loadedImages.push({
                    ind: e,
                    img: p,
                    thumb: c,
                    pid: i,
                    typ: r
                }), s.validateAllImages(), Q.revokeObjectURL(p.attr("src"))
            })
        },
        validateAllImages: function() {
            var e, i, t, a, r, n, l, o = this,
                s = {};
            if (o.loadedImages.length === o.totalImagesCount && (o.raise("fileimagesloaded"), o.resizeImage)) {
                for (l = o.isUploadable ? o.showUploadError : o.showError, e = 0; e < o.loadedImages.length; e++) i = o.loadedImages[e], t = i.img, a = i.thumb, r = i.pid, n = i.ind, s = {
                    id: r,
                    index: n
                }, o.getResizedImage(t[0], i.typ, r, n) || (l(o.msgImageResizeError, s, "fileimageresizeerror"), o.setThumbStatus(a, "Error"), o.updateStack(n, void 0));
                o.raise("fileimagesresized")
            }
        },
        getResizedImage: function(e, i, t, a) {
            var r, n, l = this,
                o = e.naturalWidth,
                s = e.naturalHeight,
                d = 1,
                c = l.maxImageWidth || o,
                p = l.maxImageHeight || s,
                u = o && s,
                f = l.imageCanvas,
                v = l.imageCanvasContext;
            if (!u) return !1;
            if (o === c && s === p) return !0;
            i = i || l.resizeDefaultImageType, r = o > c, n = s > p, d = "width" === l.resizePreference ? r ? c / o : n ? p / s : 1 : n ? p / s : r ? c / o : 1, l.resetCanvas(), o *= d, s *= d, f.width = o, f.height = s;
            try {
                return v.drawImage(e, 0, 0, o, s), f.toBlob(function(e) {
                    l.raise("fileimageresized", [t, a]), l.filestack[a] = e
                }, i, l.resizeQuality), !0
            } catch (g) {
                return !1
            }
        },
        initCaption: function() {
            var e = this,
                i = e.initialCaption || "";
            return e.overwriteInitial || W(i) ? (e.$caption.html(""), !1) : (e.setCaption(i), !0)
        },
        setCaption: function(i, t) {
            var a, r, n = this;
            if (t) a = e("<div>" + n.msgValidationError + "</div>").text(), r = '<span class="' + n.msgValidationErrorClass + '">' + n.msgValidationErrorIcon + a + "</span>";
            else {
                if (W(i) || 0 === n.$caption.length) return;
                a = e("<div>" + i + "</div>").text(), r = n.getLayoutTemplate("icon") + a
            }
            n.$caption.html(r), n.$caption.attr("title", a), n.$captionContainer.find(".file-caption-ellipsis").attr("title", a)
        },
        initBrowse: function(e) {
            var i = this;
            i.$btnFile = e.find(".btn-file"), i.$btnFile.append(i.$element)
        },
        createContainer: function() {
            var i = this,
                t = e(document.createElement("div")).attr({
                    "class": "file-input file-input-new"
                }).html(i.renderMain());
            return i.$element.before(t), i.initBrowse(t), t
        },
        refreshContainer: function() {
            var e = this,
                i = e.$container;
            i.before(e.$element), i.html(e.renderMain()), e.initBrowse(i)
        },
        renderMain: function() {
            var e = this,
                i = e.isUploadable && e.dropZoneEnabled ? " file-drop-zone" : "file-drop-disabled",
                t = e.showClose ? e.getLayoutTemplate("close") : "",
                a = e.showPreview ? e.getLayoutTemplate("preview").replace(/\{class}/g, e.previewClass).replace(/\{dropClass}/g, i) : "",
                r = e.isDisabled ? e.captionClass + " file-caption-disabled" : e.captionClass,
                n = e.captionTemplate.replace(/\{class}/g, r + " kv-fileinput-caption");
            return e.mainTemplate.replace(/\{class}/g, e.mainClass).replace(/\{preview}/g, a).replace(/\{close}/g, t).replace(/\{caption}/g, n).replace(/\{upload}/g, e.renderButton("upload")).replace(/\{remove}/g, e.renderButton("remove")).replace(/\{cancel}/g, e.renderButton("cancel")).replace(/\{browse}/g, e.renderButton("browse"))
        },
        renderButton: function(e) {
            var i = this,
                t = i.getLayoutTemplate("btnDefault"),
                a = i[e + "Class"],
                r = i[e + "Title"],
                n = i[e + "Icon"],
                l = i[e + "Label"],
                o = i.isDisabled ? " disabled" : "",
                s = "button";
            switch (e) {
                case "remove":
                    if (!i.showRemove) return "";
                    break;
                case "cancel":
                    if (!i.showCancel) return "";
                    a += " hide";
                    break;
                case "upload":
                    if (!i.showUpload) return "";
                    i.isUploadable && !i.isDisabled ? t = i.getLayoutTemplate("btnLink").replace("{href}", i.uploadUrl) : s = "submit";
                    break;
                case "browse":
                    t = i.getLayoutTemplate("btnBrowse");
                    break;
                default:
                    return ""
            }
            return a += "browse" === e ? " btn-file" : " fileinput-" + e + " fileinput-" + e + "-button", W(l) || (l = ' <span class="' + i.buttonLabelClass + '">' + l + "</span>"), t.replace("{type}", s).replace("{css}", a).replace("{title}", r).replace("{status}", o).replace("{icon}", n).replace("{label}", l)
        }
    }, e.fn.fileinput = function(t) {
        if (l() || i(9)) {
            var a = Array.apply(null, arguments),
                r = [];
            switch (a.shift(), this.each(function() {
                var i = e(this),
                    n = i.data("fileinput"),
                    l = "object" == typeof t && t,
                    o = l.language || i.data("language") || "en",
                    s = e.fn.fileinput.defaults;
                n || ("en" === o || W(e.fn.fileinputLocales[o]) || e.extend(s, e.fn.fileinputLocales[o]), n = new Y(this, e.extend(s, l, i.data())), i.data("fileinput", n)), "string" == typeof t && r.push(n[t].apply(n, a))
            }), r.length) {
                case 0:
                    return this;
                case 1:
                    return r[0];
                default:
                    return r
            }
        }
    }, e.fn.fileinput.defaults = {
        language: "en",
        showCaption: !0,
        showPreview: !0,
        showRemove: !0,
        showUpload: !0,
        showCancel: !0,
        showClose: !0,
        showUploadedThumbs: !0,
        autoReplace: !1,
        mainClass: "",
        previewClass: "",
        captionClass: "",
        mainTemplate: null,
        initialCaption: "",
        initialPreview: [],
        initialPreviewDelimiter: "*$$*",
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: !0,
        deleteUrl: "",
        deleteExtraData: {},
        overwriteInitial: !0,
        layoutTemplates: M,
        previewTemplates: B,
        allowedPreviewTypes: N,
        allowedPreviewMimeTypes: null,
        allowedFileTypes: null,
        allowedFileExtensions: null,
        defaultPreviewContent: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewSettings: Z,
        fileTypeSettings: H,
        previewFileIcon: '<i class="icon-file-alt"></i>',
        previewFileIconClass: "file-icon-4x",
        previewFileIconSettings: {},
        previewFileExtSettings: {},
        buttonLabelClass: "hidden-xs",
        browseIcon: '<i class="fa fa-folder-open-o"></i>',
        browseClass: "btn btn-color2",
        removeIcon: '<i class="fa fa-trash"></i>',
        removeClass: "btn btn-color2",
        cancelIcon: '<i class="icon-ban-circle"></i>',
        cancelClass: "btn btn-color2",
        uploadIcon: '<i class="fa fa-upload"></i>',
        uploadClass: "btn btn-color2",
        uploadUrl: null,
        uploadAsync: !0,
        uploadExtraData: {},
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        resizeImage: !1,
        resizePreference: "width",
        resizeQuality: .92,
        resizeDefaultImageType: "image/jpeg",
        maxFileSize: 0,
        minFileCount: 0,
        maxFileCount: 0,
        validateInitialCount: !1,
        msgValidationErrorClass: "text-danger",
        msgValidationErrorIcon: '<i class="icon-exclamation-sign"></i> ',
        msgErrorClass: "file-error-message",
        progressThumbClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressCompleteClass: "progress-bar progress-bar-success",
        previewFileType: "image",
        zoomIndicator: '<i class="icon-zoom-in"></i>',
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: '<span class="close kv-error-close">&times;</span>',
        slugCallback: null,
        dropZoneEnabled: !0,
        dropZoneTitleClass: "file-drop-zone-title",
        fileActionSettings: {},
        otherActionButtons: "",
        textEncoding: "UTF-8",
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: !0
    }, e.fn.fileinputLocales.en = {
        fileSingle: "file",
        filePlural: "files",
        browseLabel: "Browse &hellip;",
        removeLabel: "Remove",
        removeTitle: "Clear selected files",
        cancelLabel: "Cancel",
        cancelTitle: "Abort ongoing upload",
        uploadLabel: "Upload",
        uploadTitle: "Upload selected files",
        msgZoomTitle: "View details",
        msgZoomModalHeading: "Detailed Preview",
        msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>.',
        msgFilesTooLess: "You must select at least <b>{n}</b> {files} to upload.",
        msgFilesTooMany: "Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.",
        msgFileNotFound: 'File "{name}" not found!',
        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
        msgUploadAborted: "The file upload was aborted",
        msgValidationError: "File Upload Error",
        msgLoading: "Loading file {index} of {files} &hellip;",
        msgProgress: "Loading file {index} of {files} - {name} - {percent}% completed.",
        msgSelected: "{n} {files} selected",
        msgFoldersNotAllowed: "Drag & drop files only! {n} folder(s) dropped were skipped.",
        msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.',
        msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.',
        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.',
        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.',
        msgImageResizeError: "Could not get the image dimensions to resize.",
        msgImageResizeException: "Error while resizing the image.<pre>{errors}</pre>",
        dropZoneTitle: "Drag & drop files here &hellip;"
    }, e.extend(e.fn.fileinput.defaults, e.fn.fileinputLocales.en), e.fn.fileinput.Constructor = Y, e(document).ready(function() {
        var i = e("input.file[type=file]");
        i.length && i.fileinput()
    })
});


! function(a) {
    "use strict";
    var b = a.HTMLCanvasElement && a.HTMLCanvasElement.prototype,
        c = a.Blob && function() {
            try {
                return Boolean(new Blob)
            } catch (a) {
                return !1
            }
        }(),
        d = c && a.Uint8Array && function() {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (a) {
                return !1
            }
        }(),
        e = a.BlobBuilder || a.WebKitBlobBuilder || a.MozBlobBuilder || a.MSBlobBuilder,
        f = (c || e) && a.atob && a.ArrayBuffer && a.Uint8Array && function(a) {
            var b, f, g, h, i, j;
            for (b = a.split(",")[0].indexOf("base64") >= 0 ? atob(a.split(",")[1]) : decodeURIComponent(a.split(",")[1]), f = new ArrayBuffer(b.length), g = new Uint8Array(f), h = 0; h < b.length; h += 1) g[h] = b.charCodeAt(h);
            return i = a.split(",")[0].split(":")[1].split(";")[0], c ? new Blob([d ? g : f], {
                type: i
            }) : (j = new e, j.append(f), j.getBlob(i))
        };
    a.HTMLCanvasElement && !b.toBlob && (b.mozGetAsFile ? b.toBlob = function(a, c, d) {
        a(d && b.toDataURL && f ? f(this.toDataURL(c, d)) : this.mozGetAsFile("blob", c))
    } : b.toDataURL && f && (b.toBlob = function(a, b, c) {
        a(f(this.toDataURL(b, c)))
    })), "function" == typeof define && define.amd ? define(function() {
        return f
    }) : a.dataURLtoBlob = f
}(window);
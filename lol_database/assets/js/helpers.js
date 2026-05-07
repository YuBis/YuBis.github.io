(() => {
  window.LolDb = window.LolDb || {};

  const normalize = (value) => {
    return String(value ?? "").toLowerCase().trim();
  };

  const matchQuery = (fields, query) => {
    return fields.some((field) => normalize(field).includes(query));
  };

  const readErrorMessage = (error) => {
    if (error?.response?.status) {
      return "HTTP " + error.response.status;
    }
    return error?.message || "알 수 없는 오류";
  };

  const sanitizeDescription = (rawHtml) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString("<div>" + rawHtml + "</div>", "text/html");
    const root = doc.body.firstElementChild;
    if (!root) {
      return "";
    }

    const whitelist = new Set(["BR", "B", "I", "U", "SPAN"]);
    const nodes = Array.from(root.querySelectorAll("*"));

    nodes.forEach((node) => {
      const tag = node.tagName.toUpperCase();
      if (whitelist.has(tag)) {
        Array.from(node.attributes).forEach((attr) => {
          node.removeAttribute(attr.name);
        });
        return;
      }

      const replacement = doc.createElement("span");
      replacement.className = "dd-" + tag.toLowerCase();
      replacement.innerHTML = node.innerHTML;
      node.replaceWith(replacement);
    });

    return root.innerHTML;
  };

  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const copyTextToClipboard = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      return true;
    } catch (error) {
      try {
        fallbackCopy(text);
        return true;
      } catch (fallbackError) {
        return false;
      }
    }
  };

  const formatLoadedAt = () => {
    return new Date().toLocaleString("ko-KR", {
      hour12: false
    });
  };

  window.LolDb.helpers = {
    normalize,
    matchQuery,
    readErrorMessage,
    sanitizeDescription,
    copyTextToClipboard,
    formatLoadedAt
  };
})();

const parseAttributes = (attributes, indentLevel) => {
  const indent = "    ".repeat(indentLevel);
  return attributes
    .split(/\s+/)
    .filter(Boolean)
    .map((attr) => `${indent}${attr}`)
    .join("\n");
};

const formatTag = (tag, indentLevel) => {
  const parts = tag.match(/^\[(\/?)(\w+)([^\]]*)\]$/);
  if (!parts) return tag;

  const [, closingSlash, tagName, attributes] = parts;
  const indent = "    ".repeat(indentLevel);

  if (closingSlash) return `${indent}[/${tagName}]`;

  const formattedAttributes = parseAttributes(
    attributes.trim(),
    indentLevel + 1,
  );
  return `${indent}[${tagName}\n${formattedAttributes}\n${indent}]`;
};

const parseShortcode = (text, indentLevel = 0) => {
  const rows = text.split(/(\[\/?vc_row[^\]]*\])/).filter(Boolean);

  const formattedRows = rows.map((row) => {
    if (/^\[\/?vc_row/.test(row)) {
      return formatTag(row, indentLevel);
    }

    const columns = row.split(/(\[\/?vc_column[^\]]*\])/).filter(Boolean);
    const formattedColumns = columns.map((column) => {
      if (/^\[\/?vc_column/.test(column)) {
        return formatTag(column, indentLevel + 1);
      }

      const elements = column
        .split(/(\[\/?image_with_animation[^\]]*\])/)
        .filter(Boolean);
      const formattedElements = elements.map((element) => {
        if (/^\[\/?image_with_animation/.test(element)) {
          return formatTag(element, indentLevel + 2);
        }

        return element
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .join("\n")
          .replace(/^/gm, "    ".repeat(indentLevel + 2)); // Indent the content inside elements
      });

      return formattedElements.join("\n");
    });

    return formattedColumns.join("\n");
  });

  return formattedRows.join("\n");
};

const parsers = {
  shortcode: {
    parse: (text) => ({ text: parseShortcode(text) }),
    astFormat: "shortcode",
  },
};

const printers = {
  shortcode: {
    print: (path, options, print) => path.getValue().text,
  },
};

module.exports = {
  parsers,
  printers,
};

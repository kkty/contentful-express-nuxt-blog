const contentful = require('./contentful');

class Post {
  constructor({
    id,
    title,
    date,
    content,
  }) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.content = content;
  }

  get contentHtml() {
    return Post.getHtml(this.content);
  }

  static getHtml(content) {
    if (content.nodeType === 'text') {
      const bold = content.marks.filter(i => i.type === 'bold').length > 0;
      const italic = content.marks.filter(i => i.type === 'italic').length > 0;
      const underline = content.marks.filter(i => i.type === 'underline').length > 0;

      const styles = {};

      if (bold) {
        styles['font-weight'] = 'bold';
      }

      if (italic) {
        styles['font-style'] = 'italic';
      }

      if (underline) {
        styles['text-decoration'] = 'underline';
      }

      if (Object.keys(styles).length) {
        return `<span style="${Object.entries(styles).map(i => `${i[0]}:${i[1]};`).join('')}">${content.value}</span>`;
      } else {
        return content.value;
      }
    }

    if (content.nodeType === 'hr') {
      return '<hr/>';
    }

    let tag = '';
    const attributes = {};

    if (content.nodeType === 'heading-1') {
      tag = 'h1';
    } else if (content.nodeType === 'heading-2') {
      tag = 'h2';
    } else if (content.nodeType === 'heading-3') {
      tag = 'h3';
    } else if (content.nodeType === 'heading-4') {
      tag = 'h4';
    } else if (content.nodeType === 'heading-5') {
      tag = 'h5';
    } else if (content.nodeType === 'heading-6') {
      tag = 'h6';
    } else if (content.nodeType === 'paragraph') {
      tag = 'p';
    } else if (content.nodeType === 'document') {
      tag = 'div';
    } else if (content.nodeType === 'unordered-list') {
      tag = 'ul';
    } else if (content.nodeType === 'ordered-list') {
      tag = 'ol';
    } else if (content.nodeType === 'list-item') {
      tag = 'li';
    } else if (content.nodeType === 'blockquote') {
      tag = 'blockquote';
    } else if (content.nodeType === 'hyperlink') {
      tag = 'a';
      attributes.href = content.data.uri;
    } else if (content.nodeType === 'embedded-asset-block') {
      tag = 'img';
      attributes.src = content.data.target.fields.file.url;
      attributes.alt = content.data.target.fields.title;
    }

    return `<${tag}${Object.entries(attributes).map(i => ` ${i[0]}="${i[1]}"`).join('')}>${content.content.map(Post.getHtml).join('')}</${tag}>`;
  }

  static async findById(id) {
    return contentful.getEntries({
      'fields.id': id,
      'content_type': 'post',
    })
      .then(i => i.items)
      .then((entries) => {
        if (!entries.length) {
          return null;
        }

        return new Post(entries[0].fields);
      });
  }

  static async list(params) {
    return contentful.getEntries(params)
      .then(i => i.items)
      .then(entries => entries.map(entry => new Post(entry.fields)));
  }
};

module.exports = {
  Post,
};

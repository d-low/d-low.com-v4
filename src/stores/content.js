import { computed } from 'vue'
import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', () => {
  const host = 'https://www.d-low.com';

  const content = computed(() => window.Dlow.content);
  const mostRecentPostPath = computed(() => window.Dlow.mostRecentPostPath);

  /**
   * @description Iterate through the content object nodes from the top until we
   * find the node corresponding to the specified path.
   */
  const getNode = (path) => {
    let node = content.value;
    const parts = path.split('/');

    parts.forEach((part) => {
      if (part) {
        node = node[part];
      }
    });

    return node;
  };

  /**
   * Remove initial digits, split on the title/date separator and keeping the
   * date, and then replace underscores with white space, and insert a comma
   * after the day of the month.
   * @example
   * 05-Colorado -> ''
   * 01-A_Few_Snowy_Adventures-Apr_11_2017 -> Apr 11, 2017
   */
  const prettifyDateOnly = function prettifyDate(keyName) {
    const datePart = keyName.replace(/^\d\d-/, '').split(/-/);

    if (datePart.length > 1) {
      try {
        return datePart[1].replace(/_/g, ' ').replace(/ (\d\d\d\d)$/, ', $1');
      } catch (exp) {
        return '';
      }
    } else {
      return '';
    }
  };

  /**
   * Remove initial digits, split on the title/date separator and keeping both the title and the
   * date, and then replace underscores with white space.
   * @example
   * 05-Colorado -> Colorado
   * Colorado-2016 -> Colorado 2016
   * 01-A_Few_Snowy_Adventures-Apr_11_2017 -> A Few Snowy Adventures Apr 11 2017
   */
  const prettifyTitle = (keyName) => {
    return keyName.replace(/^\d\d-/, '').replace(/[-_]/g, ' ');
  };

  /**
   * Remove initial digits, split on the title/date separator and keeping the title, and then
   * replace underscores with white space.
   * @example
   * 05-Colorado -> Colorado
   * 01-A_Few_Snowy_Adventures-Apr_11_2017 -> A Few Snowy Adventures
   */
  const prettifyTitleOnly = (keyName) => {
    return keyName.replace(/^\d\d-/, '').split(/-/)[0].replace(/_/g, ' ');
  };

  /**
   * @description Construct an array of links, one for each child node of the current node that is
   * not a post. Extracting the pretty name from each node and select a random image from one of
   * the nodes post nodes.
   * @param payload.path The path to the node we're working with. e.g. /, /05-Colorado,
   * /05-Colorado/11-Colorado-2016/04-Fall
   * @param payload.includeMostRecent If true, the most recent post will be prepended to the
   * returned array of links.
   * @param payload.descending If true, the links will be sorted in reverse order. This is used on
   * the listing and post listing pages to show the most recent items first.
   * @param payload.makeTitlePretty
   */
  const getLinks = (payload) => {
    const {
      path,
      includeMostRecent = false,
      descending = false,
      makeTitlePretty = true,
    } = payload;

    const links = [];

    const generateRandomNumber = (max, min) =>
      Math.floor((Math.random() * ((max - min) + 1)) + min);

    const findRandomImage = (currentNode) => {
      if (Array.isArray(currentNode.imgs)) {
        const index = generateRandomNumber(currentNode.imgs.length - 1, 0);
        return `/data/${currentNode.path}/${currentNode.imgs[index]}`;
      }

      const keys = Object.keys(currentNode);
      const index = generateRandomNumber(keys.length - 1, 0);
      const key = keys[index];

      return findRandomImage(currentNode[key]);
    };

    const node = getNode(path);

    Object.keys(node).forEach((key) => {
      links.push({
        name: makeTitlePretty ? prettifyTitle(key) : key,
        href: `${path === '/' ? '' : path}/${key}`,
        image: findRandomImage(node[key]),
      });
    });

    // First sort links in ascending order by href
    links.sort((a, b) => {
      const aHref = a.href.toLowerCase();
      const bHref = b.href.toLowerCase();

      if (aHref < bHref) {
        return -1;
      } else if (aHref > bHref) {
        return 1;
      }

      return 0;
    });

    // Then reverse if requested
    if (descending === true) {
      links.reverse();
    }

    // Add the most recent post to the beginning of the links
    if (includeMostRecent && mostRecentPostPath) {
      let mostRecentNode = content.value;

      // TEMP: Use different most recent path to test internal anchors
      // 05-Colorado/11-Colorado-2016/03-Summer/03-Pawnee_Buchanan_Loop-Jul_30_2016';

      mostRecentPostPath.value.split('/').forEach((part) => {
        mostRecentNode = mostRecentNode[part];
      });

      // TEMP: Replace last "/" with an "#" so we can link to an internal hash.
      // TODO: When generate_content.rb adds a "#" then this can be removed.
      // SEE: http://stackoverflow.com/questions/5497318/replace-last-occurrence-of-character-in-string
      if (mostRecentNode) {
        links.splice(0, 0, {
          name: 'What\'s new?',
          href: `/${mostRecentPostPath.value.replace(/\/([^/]*)$/, '#$1')}`,
          image: findRandomImage(mostRecentNode),
        });
      }
    }

    // Use content from d-low.com
    const mappedLinks = links.map(link => ({
      name: link.name,
      href: link.href,
      image: `${host}${link.image}`,
    }));

    return mappedLinks;
  };

  /**
   * @description Given a path to a post return an array of paths to images
   * contained in that post.
   * @param path Path to node
   */
  const getPostImages = function getPostImages(path) {
    const node = getNode(path);
    const images = [];

    if (!Array.isArray(node.imgs)) {
      return images;
    }

    node.imgs.forEach((img) => {
      images.push(`${host}/data${path}/${img}`);
    });

    // Sort images in ascending order so they're displayed in chronological order
    images.sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();

      if (aLower < bLower) {
        return -1;
      } else if (aLower > bLower) {
        return 1;
      }

      return 0;
    });

    return images;
  };

  /**
   * @description Given link to a post or a path to a post populate and return a
   * post object.
   */
  const getPost = (link) => {
    return {
      name: prettifyTitleOnly(link.name),
      date: prettifyDateOnly(link.name),
      href: link.href,
      images: getPostImages(link.href),
      async getText() {
        const response = await fetch(`${host}/data${link.href}/index.html`);
        return response.text();
      },
    };
  };

  const getPostListingLinks = (path) => {
    const links = getLinks({
      path,
      includeMostRecent: false,
      descending: true,
      makeTitlePretty: false,
    });

    const postListingLinks = [];

    links.forEach((link) => {
      postListingLinks.push(getPost(link));
    });

    return postListingLinks;
  };

  return {
    // Getters
    content,
    mostRecentPostPath,

    // Actions
    getLinks,
    getPostListingLinks,
    prettifyTitle,
   };
})
const API_BASE = 'https://blog.kata.academy/api'

const ARTICLES_DEFAULT = [
  {
    slug: 'test123-vohw8w',
    title: 'test123',
    description: 'test312',
    body: '123456789test',
    createdAt: '2023-12-14T09:28:37.577Z',
    updatedAt: '2023-12-14T09:28:37.577Z',
    tagList: ['test', 'test'],
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'radzhabov',
      image: 'https://i.pinimg.com/originals/3d/c9/dc/3dc9dc07fbbcf1eed6e48d7e236f3709.webp',
      following: false,
    },
  },
  {
    slug: 'some-article-title-trobt6',
    title: 'Some article title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    createdAt: '2023-12-14T09:28:21.873Z',
    updatedAt: '2023-12-14T09:28:21.873Z',
    tagList: ['Tag1'],
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'oneuser13',
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: false,
    },
  },
  {
    slug: 'some-article-title-o6wrto',
    title: 'Some article title',
    description:
      'onPressEnter={(e) => {\n    e.preventDefault();  // Предотвращаем всплытие события\n    handleTagAdd();\n  }}',
    body: 'onPressEnter={(e) => {\n    e.preventDefault();  // Предотвращаем всплытие события\n    handleTagAdd();\n  }}',
    createdAt: '2023-12-14T09:27:50.496Z',
    updatedAt: '2023-12-30T20:34:22.751Z',
    tagList: ['Tag1'],
    favorited: false,
    favoritesCount: 1,
    author: {
      username: 'oneuser13',
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: false,
    },
  },
  {
    slug: 'some-article-title-bdforq',
    title: 'Some article title',
    description: 'onFinish={(values) => {\n    handleSubmit(values);\n  }}',
    body: 'onFinish={(values) => {\n    handleSubmit(values);\n  }}',
    createdAt: '2023-12-14T09:20:59.881Z',
    updatedAt: '2023-12-14T09:20:59.881Z',
    tagList: ['Tag1'],
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'oneuser13',
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: false,
    },
  },
  {
    slug: 'some-article-title-ykwgxr',
    title: 'Some article title',
    description: '(values) => {\n    handleSubmit(values);\n  }',
    body: '(values) => {\n    handleSubmit(values);\n  }',
    createdAt: '2023-12-14T09:20:31.987Z',
    updatedAt: '2023-12-14T09:20:31.987Z',
    tagList: ['Tag1'],
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'oneuser13',
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: false,
    },
  },
]

const THEME_TOKENS = {
  token: {
    fontFamily:
      '-apple-system, "DM Sans", "Inter", BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  components: {
    Pagination: {
      itemActiveBg: '#1890ff',
      colorPrimary: '#fff',
      colorPrimaryHover: '#fff',
      itemSize: 22,
    },
  },
}

export { ARTICLES_DEFAULT, API_BASE, THEME_TOKENS }

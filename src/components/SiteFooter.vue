<script setup>
const links = [{
  href: 'mailto:info@d-low.com',
  icon: 'fa-regular fa-envelope',
  name: 'email',
  title: 'Send me an email',
}, {
  href: 'https://www.facebook.com/mike.dilorenzo.3',
  icon: 'fa-brands fa-facebook',
  name: 'facebook',
  title: 'Friend me on Facebook',
}, {
  href: 'https://github.com/d-low',
  icon: 'fa-brands fa-github',
  name: 'github',
  title: 'Check out my codes on Github',
}, {
  href: 'http://www.linkedin.com/pub/mike-dilorenzo/7/b76/14b',
  icon: 'fa-brands fa-linkedin',
  name: 'Linkedin',
  title: 'Connect with me on LinkedIn',
}, {
  href: 'http://x.com/dlow',
  icon: 'fa-brands fa-x-twitter',
  name: 'X',
  title: 'Follow my infrequent Tweets',
}];

const containerClass = [
  'tw-w-4/5 tw-mx-auto tw-mt-7 tw-py-7',
  'tw-border-t border-color-light-gray',
];
</script>

<template>
  <footer :class="containerClass">
    <nav>
      <ul class="tw-flex tw-justify-center">
        <li
          v-for="link in links"
          :key="link.name"
          class="tw-px-2"
        >
          <a
            class="link-color"
            :href="link.href"
            rel="noopener noreferrer"
            target="_blank"
            :title="link.title"
          >
            <font-awesome-icon
              class="tw-w-8 tw-h-8"
              :icon="link.icon"
            />
            <span></span>
          </a>
        </li>
      </ul>
    </nav>
  </footer>
</template>
# Changelog

Before changes were made, Lighthouse gave a score of 99/95/93/100 for Performance/Accessibility/Best Practices/SEO on Desktop. After the changes below, the score is 99/100/100/100. Note that the best practices score lowers significantly if an adblocker is used, since errors from blocking Google Analytics appear in the console.

- Added ``<title>`` tag to site logo svg as alternative text
- Removed ``<p>`` tags around Contact links to give them a discernible name
- Added ``rel="noopener"`` to offsite links with ``target="_blank"`` for security purposes
- Separated header svg background into ``bkgd.css``
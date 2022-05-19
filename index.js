const sitemap = require("@njzjz/sitemap");
const { htmlTag } = require("hexo-util");
const path = require('path');
const { name, version } = require("./package.json");
const { npm_url } = require('unpkg_url');
const css = hexo.extend.helper.get('css').bind(hexo);

hexo.extend.filter.register('theme_inject', function (injects) {
    injects.footer.file("sitemap", path.join(__dirname, "src/sitemap.njk"), { sitemap }, { cache: true })
});

hexo.extend.injector.register('head_end', css(npm_url(name, version, "src/sitemap.min.css")));

hexo.extend.tag.register('njzjz_sitemap', function (args) {
    return sitemap.site.map((site) => {
        return htmlTag('h3', {}, site.name) + htmlTag('ul', {}, site.site.map((subsite) => {
            return htmlTag("li", {}, htmlTag("a", { href: subsite.url },
                htmlTag("i", { class: subsite.icon }, "") + " " + subsite.name,
                false), false)
        }).join(""), false)
    }).join("");
});

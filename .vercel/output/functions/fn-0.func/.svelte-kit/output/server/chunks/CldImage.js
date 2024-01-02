import { c as create_ssr_component, s as spread, f as escape_attribute_value, e as escape_object, v as validate_component } from "./ssr.js";
import { getTransformations } from "@cloudinary-util/util";
import { constructCloudinaryUrl, transformationPlugins } from "@cloudinary-util/url-loader";
import { transformProps } from "@unpic/core";
import styleToCss from "style-object-to-css-string";
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let parentStyle;
  let props;
  let alt;
  let styleObj;
  let transformedProps;
  let style;
  ({ style: parentStyle, ...props } = $$props);
  ({ alt, style: styleObj, ...transformedProps } = transformProps({ ...props, style: {} }));
  style = [styleToCss(styleObj), parentStyle].filter(Boolean).join(";");
  return `<img${spread(
    [
      { alt: escape_attribute_value(alt) },
      { style: escape_attribute_value(style) },
      escape_object(transformedProps)
    ],
    {}
  )}>`;
});
function checkCloudinaryCloudName(cloudName) {
  if (!cloudName) {
    throw new Error("[Svelte-cloudinary] A Cloudinary Cloud name is required, please make sure VITE_PUBLIC_CLOUDINARY_CLOUD_NAME is set and configured in your environment");
  }
}
const name = "svelte";
const version$1 = "4.2.7";
const description = "Cybernetically enhanced web apps";
const type = "module";
const module = "src/runtime/index.js";
const main = "src/runtime/index.js";
const files = [
  "src",
  "!src/**/tsconfig.json",
  "types",
  "compiler.*",
  "register.js",
  "index.d.ts",
  "store.d.ts",
  "animate.d.ts",
  "transition.d.ts",
  "easing.d.ts",
  "motion.d.ts",
  "action.d.ts",
  "elements.d.ts",
  "svelte-html.d.ts",
  "README.md"
];
const exports = {
  "./package.json": "./package.json",
  ".": {
    types: "./types/index.d.ts",
    browser: {
      "default": "./src/runtime/index.js"
    },
    "default": "./src/runtime/ssr.js"
  },
  "./compiler": {
    types: "./types/index.d.ts",
    require: "./compiler.cjs",
    "default": "./src/compiler/index.js"
  },
  "./action": {
    types: "./types/index.d.ts"
  },
  "./animate": {
    types: "./types/index.d.ts",
    "default": "./src/runtime/animate/index.js"
  },
  "./easing": {
    types: "./types/index.d.ts",
    "default": "./src/runtime/easing/index.js"
  },
  "./internal": {
    "default": "./src/runtime/internal/index.js"
  },
  "./motion": {
    types: "./types/index.d.ts",
    "default": "./src/runtime/motion/index.js"
  },
  "./store": {
    types: "./types/index.d.ts",
    "default": "./src/runtime/store/index.js"
  },
  "./internal/disclose-version": {
    "default": "./src/runtime/internal/disclose-version/index.js"
  },
  "./transition": {
    types: "./types/index.d.ts",
    "default": "./src/runtime/transition/index.js"
  },
  "./elements": {
    types: "./elements.d.ts"
  }
};
const engines = {
  node: ">=16"
};
const types = "types/index.d.ts";
const repository = {
  type: "git",
  url: "https://github.com/sveltejs/svelte.git",
  directory: "packages/svelte"
};
const keywords = [
  "UI",
  "framework",
  "templates",
  "templating"
];
const author = "Rich Harris";
const license = "MIT";
const bugs = {
  url: "https://github.com/sveltejs/svelte/issues"
};
const homepage = "https://svelte.dev";
const dependencies = {
  "@ampproject/remapping": "^2.2.1",
  "@jridgewell/sourcemap-codec": "^1.4.15",
  "@jridgewell/trace-mapping": "^0.3.18",
  acorn: "^8.9.0",
  "aria-query": "^5.3.0",
  "axobject-query": "^3.2.1",
  "code-red": "^1.0.3",
  "css-tree": "^2.3.1",
  "estree-walker": "^3.0.3",
  "is-reference": "^3.0.1",
  "locate-character": "^3.0.0",
  "magic-string": "^0.30.4",
  periscopic: "^3.1.0"
};
const devDependencies = {
  "@playwright/test": "^1.35.1",
  "@rollup/plugin-commonjs": "^24.1.0",
  "@rollup/plugin-json": "^6.0.0",
  "@rollup/plugin-node-resolve": "^15.1.0",
  "@sveltejs/eslint-config": "^6.0.4",
  "@types/aria-query": "^5.0.1",
  "@types/estree": "^1.0.1",
  "@types/node": "^14.18.51",
  agadoo: "^3.0.0",
  "dts-buddy": "^0.1.7",
  esbuild: "^0.18.11",
  "eslint-plugin-lube": "^0.1.7",
  "happy-dom": "^9.20.3",
  jsdom: "22.0.0",
  kleur: "^4.1.5",
  rollup: "^3.26.2",
  "source-map": "^0.7.4",
  "tiny-glob": "^0.2.9",
  typescript: "^5.1.3",
  vitest: "^0.33.0"
};
const scripts = {
  format: "prettier . --cache --plugin-search-dir=. --write",
  check: "tsc --noEmit",
  test: 'vitest run && echo "manually check that there are no type errors in test/types by opening the files in there"',
  build: "rollup -c && pnpm types",
  "generate:version": "node ./scripts/generate-version.js",
  dev: "rollup -cw",
  posttest: "agadoo src/internal/index.js",
  types: "node ./scripts/generate-dts.js",
  lint: 'prettier . --cache --plugin-search-dir=. --check && eslint "{scripts,src,test}/**/*.js" --cache --fix'
};
const sveltePkg = {
  name,
  version: version$1,
  description,
  type,
  module,
  main,
  files,
  exports,
  engines,
  types,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  dependencies,
  devDependencies,
  scripts
};
const version = "1.1.1";
const metadata = {
  version
};
const SVELTE_CLOUDINARY_ANALYTICS_ID = "E";
const SVELTE_CLOUDINARY_VERSION = metadata.version.split("-")[0];
const SVELTE_VERSION = `${sveltePkg.version.split(".")[0]}.0.0`;
function getCldImageUrl(options, config, analytics) {
  checkCloudinaryCloudName("dyh20dqch");
  return constructCloudinaryUrl({
    options,
    config: Object.assign({
      cloud: {
        cloudName: "dyh20dqch"
      }
    }, config),
    analytics: Object.assign({
      sdkCode: SVELTE_CLOUDINARY_ANALYTICS_ID,
      sdkSemver: SVELTE_CLOUDINARY_VERSION,
      techVersion: SVELTE_VERSION,
      product: "B"
    }, analytics)
  });
}
const { Object: Object_1 } = globals;
const CldImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let alt;
  let src;
  let width;
  let height;
  let config;
  let imageProps;
  const CLD_OPTIONS = ["config", "deliveryType", "preserveTransformations"];
  transformationPlugins.forEach(({ props = [] }) => {
    props.forEach((prop) => {
      if (CLD_OPTIONS.includes(prop)) {
        throw new Error(`Option ${prop} already exists!`);
      }
      CLD_OPTIONS.push(prop);
    });
  });
  const cldOptions = {};
  CLD_OPTIONS.forEach((key) => {
    if ($$props[key]) {
      cldOptions[key] = $$props[key] || void 0;
    }
  });
  if ($$props.preserveTransformations) {
    try {
      const transformations = getTransformations(imageProps.src).map((t) => t.join(","));
      cldOptions.rawTransformations = [...transformations.flat(), ...$$props.rawTransformations || []];
    } catch (e) {
      console.warn(`Failed to preserve transformations: ${e.message}`);
    }
  }
  ({ alt, src, width, height, config } = $$props);
  imageProps = {
    alt,
    src,
    width: typeof width === "string" ? parseInt(width) : width,
    height: typeof height === "string" ? parseInt(height) : height
  };
  {
    if (imageProps) {
      Object.keys($$props).filter((key) => !CLD_OPTIONS.includes(key)).forEach((key) => {
        imageProps[key] = $$props[key];
      });
    }
  }
  return `${imageProps.src ? `${validate_component(Image, "Image").$$render(
    $$result,
    Object_1.assign({}, imageProps, { cdn: "cloudinary" }, {
      transformer: ({ width: width2 }) => {
        const options = {
          ...imageProps,
          ...cldOptions,
          // Without, get a "never" type error on options.width
          width: imageProps.width
        };
        options.width = typeof options.width === "string" ? parseInt(options.width) : options.width;
        options.height = typeof options.height === "string" ? parseInt(options.height) : options.height;
        if (typeof width2 === "number" && typeof options.width === "number" && width2 !== options.width) {
          options.widthResize = width2;
        }
        return getCldImageUrl(options, config);
      }
    }),
    {},
    {}
  )}` : ``}`;
});
export {
  CldImage as C
};

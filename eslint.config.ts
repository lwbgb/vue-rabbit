import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginOxlint from 'eslint-plugin-oxlint';
import skipFormatting from 'eslint-config-prettier/flat';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{vue,ts,mts,tsx}'],
    },

    globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

    ...pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

    skipFormatting,

    {
        name: 'app/overrides-final',
        files: ['**/*.{vue,ts,mts,tsx,js,cjs,mjs,jsx}'],
        rules: {
            // 分号
            semi: 'warn',

            // 如果想把某些 Vue 规则降级为 warn
            'vue/no-mutating-props': 'off',

            '@typescript-eslint/no-unused-vars': [
                'off',
                {
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    ignoreRestSiblings: false,
                    reportUsedIgnorePattern: false,
                },
            ],
            

            // 组件命名需要多个单词
            'vue/multi-word-component-names': [
                'warn',
                {
                    ignores: ['index'],
                },
            ],

            // 如果引入了 Oxlint 的规则前缀（视插件导出名而定，通常是 oxc/ 或 oxlint/）
            // 你也可以在这里显式改级别：
            // 'oxlint/no-useless-rename': 'warn',
        },
    },
);

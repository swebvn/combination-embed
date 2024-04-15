import { createApp } from 'vue'
import './style.css'
import App, {AppProps} from './App.vue'

// @ts-ignore
const config = window.combinationEmbed as AppProps;

createApp(App, config).mount('#app')

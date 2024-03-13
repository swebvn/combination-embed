import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const config = window.combinationEmbed;

createApp(App, {
    ...config
}).mount(config.injectors.target || '#app')
